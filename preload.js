const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('planner', {
  load: () => ipcRenderer.invoke('data:load'),
  save: (data) => ipcRenderer.invoke('data:save', data),
  exportData: (data) => ipcRenderer.invoke('data:export', data),
  importData: () => ipcRenderer.invoke('data:import'),
  openDataFolder: () => ipcRenderer.invoke('data:open-folder'),
  notify: (payload) => ipcRenderer.send('notify', payload),
  applySettings: (s) => ipcRenderer.send('settings:apply', s),
  setTitlebarColors: (c) => ipcRenderer.send('titlebar:colors', c),
  onOpenItem: (fn) => ipcRenderer.on('app:open-item', (_e, id) => fn(id)),
  onNewItem: (fn) => ipcRenderer.on('app:new-item', () => fn()),
});
