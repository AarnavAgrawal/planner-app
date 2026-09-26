const {
  app, BrowserWindow, ipcMain, dialog, Notification, Tray, Menu, nativeImage, shell, nativeTheme,
} = require('electron');
const path = require('path');
const fs = require('fs');

const APP_ID = 'com.aarnav.planner';
const ICON_PATH = path.join(__dirname, 'build', 'icon.png');

let win = null;
let tray = null;
let isQuitting = false;
let prefs = { closeToTray: true };

const dataFile = () => path.join(app.getPath('userData'), 'planner-data.json');
const stateFile = () => path.join(app.getPath('userData'), 'window-state.json');

// ---------- persistence ----------

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

// Write to a temp file then rename, so a crash mid-write never corrupts the data file.
function writeJsonAtomic(file, data) {
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  if (fs.existsSync(file)) fs.copyFileSync(file, file + '.bak');
  fs.renameSync(tmp, file);
}

function loadWindowState() {
  const s = readJson(stateFile());
  return s && s.width ? s : { width: 1280, height: 820 };
}

function saveWindowState() {
  if (!win || win.isDestroyed()) return;
  try {
    const b = win.getNormalBounds();
    writeJsonAtomic(stateFile(), { ...b, maximized: win.isMaximized() });
  } catch { /* non-critical */ }
}

// ---------- window ----------

function showWindow() {
  if (!win) return createWindow();
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
}

function createWindow() {
  const state = loadWindowState();
  const dark = nativeTheme.shouldUseDarkColors;

  win = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 940,
    minHeight: 620,
    show: false,
    title: 'Planner',
    icon: ICON_PATH,
    backgroundColor: dark ? '#17181c' : '#f6f5f1',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: dark ? '#17181c' : '#f6f5f1',
      symbolColor: dark ? '#a8a8b3' : '#5d5d66',
      height: 52,
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true,
    },
  });

  if (state.maximized) win.maximize();
  win.loadFile(path.join(__dirname, 'src', 'index.html'));
  win.once('ready-to-show', () => {
    // Launched at login: stay in the tray (reminders still fire) instead of popping up.
    if (!process.argv.includes('--hidden')) win.show();
  });

  // Links open in the real browser, never inside the app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e) => e.preventDefault());

  win.on('close', (e) => {
    saveWindowState();
    if (!isQuitting && prefs.closeToTray) {
      e.preventDefault();
      win.hide();
    }
  });
  win.on('closed', () => { win = null; });
}

function createTray() {
  const img = nativeImage.createFromPath(ICON_PATH).resize({ width: 16, height: 16 });
  tray = new Tray(img);
  tray.setToolTip('Planner');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open Planner', click: showWindow },
    { label: 'New item…', click: () => { showWindow(); win.webContents.send('app:new-item'); } },
    { type: 'separator' },
    { label: 'Quit', click: () => { isQuitting = true; app.quit(); } },
  ]));
  tray.on('click', showWindow);
}

// ---------- IPC ----------

function registerIpc() {
  ipcMain.handle('data:load', () => readJson(dataFile()) || readJson(dataFile() + '.bak'));

  ipcMain.handle('data:save', (_e, data) => {
    writeJsonAtomic(dataFile(), data);
    return true;
  });

  ipcMain.handle('data:export', async (_e, data) => {
    const stamp = new Date().toISOString().slice(0, 10);
    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      title: 'Export planner backup',
      defaultPath: path.join(app.getPath('documents'), `planner-backup-${stamp}.json`),
      filters: [{ name: 'Planner backup', extensions: ['json'] }],
    });
    if (canceled || !filePath) return false;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  });

  ipcMain.handle('data:import', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      title: 'Import planner backup',
      properties: ['openFile'],
      filters: [{ name: 'Planner backup', extensions: ['json'] }],
    });
    if (canceled || !filePaths[0]) return null;
    return readJson(filePaths[0]);
  });

  ipcMain.handle('data:open-folder', () => shell.openPath(app.getPath('userData')));

  ipcMain.on('notify', (_e, { title, body, itemId }) => {
    if (!Notification.isSupported()) return;
    const n = new Notification({ title, body, icon: ICON_PATH });
    n.on('click', () => {
      showWindow();
      if (itemId && win) win.webContents.send('app:open-item', itemId);
    });
    n.show();
  });

  ipcMain.on('settings:apply', (_e, s) => {
    prefs.closeToTray = !!s.closeToTray;
    if (app.isPackaged) app.setLoginItemSettings({ openAtLogin: !!s.openAtLogin, args: ['--hidden'] });
  });

  ipcMain.on('titlebar:colors', (_e, { color, symbolColor }) => {
    if (win && !win.isDestroyed() && win.setTitleBarOverlay) {
      win.setTitleBarOverlay({ color, symbolColor, height: 52 });
    }
  });
}

// ---------- lifecycle ----------

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.setAppUserModelId(APP_ID);
  app.on('second-instance', showWindow);

  app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    registerIpc();
    createWindow();
    createTray();
  });

  app.on('before-quit', () => { isQuitting = true; });
  app.on('window-all-closed', () => {
    if (!prefs.closeToTray) app.quit();
  });
}
