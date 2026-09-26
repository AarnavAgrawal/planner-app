'use strict';

const api = window.planner;
const $ = (sel, el = document) => el.querySelector(sel);

// ================= Icons (Lucide-style, 24x24 stroke) =================
const ICONS = {
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  list: '<rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8M13 12h8M13 18h8"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  done: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
  assignment: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  project: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z"/>',
  quiz: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
  test: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  exam: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  task: '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  notes: '<path d="M21 6H3M15 12H3M17 18H3"/>',
  checklist: '<path d="m3 17 2 2 4-4M3 7l2 2 4-4M13 6h8M13 12h8M13 18h8"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  edit: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  folder: '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
};

function icon(name, size = 16, stroke = 2) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

// ================= Constants =================
const TYPES = {
  assignment: { label: 'Assignment', icon: 'assignment', placeholder: 'e.g. Chapter 4 problem set', notes: 'Instructions, page numbers, links…' },
  project: { label: 'Project', icon: 'project', placeholder: 'e.g. History research paper', notes: 'Requirements, milestones, group members…' },
  quiz: { label: 'Quiz', icon: 'quiz', placeholder: 'e.g. Vocab quiz 3', notes: 'What to study…' },
  test: { label: 'Test', icon: 'test', placeholder: 'e.g. Unit 2 test', notes: 'Topics covered, what to study…' },
  exam: { label: 'Exam', icon: 'exam', placeholder: 'e.g. Biology midterm', notes: 'Topics covered, room, what to bring…' },
  task: { label: 'Task', icon: 'task', placeholder: 'e.g. Return library books', notes: 'Details…' },
};
const TYPE_KEYS = Object.keys(TYPES);
const ASSESSMENTS = ['quiz', 'test', 'exam'];
const TYPE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'assignment', label: 'Assignments & projects', types: ['assignment', 'project'] },
  { key: 'assessment', label: 'Quizzes, tests & exams', types: ASSESSMENTS },
  { key: 'task', label: 'Tasks', types: ['task'] },
];
const COURSE_COLORS = ['#e5484d', '#f76b15', '#f5b100', '#46a758', '#12a594', '#0090ff', '#3e63dd', '#8e4ec6', '#d6409f', '#8d8d86'];
const REMINDERS = [
  ['', 'No reminder'], ['0', 'At due time'], ['15', '15 minutes before'], ['60', '1 hour before'],
  ['180', '3 hours before'], ['1440', '1 day before'], ['2880', '2 days before'], ['10080', '1 week before'],
];
const PRIORITIES = ['Low', 'Normal', 'High'];
const DEFAULT_SETTINGS = {
  theme: 'system', weekStart: 0, notifications: true, defaultReminder: 1440, closeToTray: true, openAtLogin: false,
};
const VIEWS = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { key: 'upcoming', label: 'Upcoming', icon: 'list' },
  { key: 'calendar', label: 'Calendar', icon: 'calendar' },
  { key: 'completed', label: 'Completed', icon: 'done' },
];

// ================= State =================
let db = normalize(null);
const ui = { view: 'dashboard', course: null, filter: 'all', search: '', calMonth: null, lastPage: '' };
let modal = null; // { el, onSubmit, refresh }
let dragging = false;

// ================= Utils =================
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const plural = (n, word, pl = word + 's') => `${n} ${n === 1 ? word : pl}`;

const pad = (n) => String(n).padStart(2, '0');
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const todayKey = () => toKey(new Date());
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const keyPlus = (n) => toKey(addDays(new Date(), n));
const daysFromToday = (k) => Math.round((fromKey(k) - fromKey(todayKey())) / 864e5);
const firstOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const fmtDate = (k, opts) => fromKey(k).toLocaleDateString(undefined, opts);

function fmtTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return new Date(2000, 0, 1, h, m).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

// Items without a time are due at the end of their day.
function dueMoment(it, fallback = '23:59') {
  const [h, m] = (it.time || fallback).split(':').map(Number);
  const d = fromKey(it.due);
  d.setHours(h, m, 0, 0);
  return d.getTime();
}
const isOverdue = (it) => !it.done && !!it.due && dueMoment(it) < Date.now();

function dueInfo(it) {
  if (!it.due) return { text: 'No due date', cls: '' };
  const d = daysFromToday(it.due);
  const t = it.time ? ` · ${fmtTime(it.time)}` : '';
  if (isOverdue(it)) {
    if (d === 0) return { text: `Today${t}`, cls: 'overdue' };
    if (d === -1) return { text: 'Yesterday', cls: 'overdue' };
    return { text: `${-d} days overdue`, cls: 'overdue' };
  }
  if (d === 0) return { text: `Today${t}`, cls: it.done ? '' : 'soon' };
  if (d === 1) return { text: `Tomorrow${t}`, cls: it.done ? '' : 'soon' };
  if (d > 1 && d < 7) return { text: fmtDate(it.due, { weekday: 'long' }) + t, cls: '' };
  const sameYear = fromKey(it.due).getFullYear() === new Date().getFullYear();
  const opts = { weekday: 'short', month: 'short', day: 'numeric' };
  if (!sameYear) opts.year = 'numeric';
  return { text: fmtDate(it.due, opts) + t, cls: '' };
}

function whenPhrase(it) {
  const d = daysFromToday(it.due);
  const day = d === 0 ? 'today' : d === 1 ? 'tomorrow' : d > 1 && d < 7 ? `on ${fmtDate(it.due, { weekday: 'long' })}` : `on ${fmtDate(it.due, { month: 'short', day: 'numeric' })}`;
  return it.time ? `${day} at ${fmtTime(it.time)}` : day;
}

function cmpItems(a, b) {
  if (!!a.due !== !!b.due) return a.due ? -1 : 1;
  if (a.due && b.due) {
    const x = dueMoment(a) - dueMoment(b);
    if (x) return x;
  }
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.createdAt < b.createdAt ? -1 : 1;
}

const getItem = (id) => db.items.find((i) => i.id === id);
const courseById = (id) => (id ? db.courses.find((c) => c.id === id) : null);
const openItems = () => db.items.filter((i) => !i.done);

// ================= Persistence =================
function normalize(raw) {
  const out = { version: 1, items: [], courses: [], settings: { ...DEFAULT_SETTINGS } };
  if (!raw || typeof raw !== 'object') return out;

  if (Array.isArray(raw.courses)) {
    out.courses = raw.courses
      .filter((c) => c && c.id && c.name)
      .map((c) => ({ id: String(c.id), name: String(c.name), color: /^#[0-9a-f]{6}$/i.test(c.color) ? c.color : COURSE_COLORS[5] }));
  }
  const courseIds = new Set(out.courses.map((c) => c.id));

  if (Array.isArray(raw.items)) {
    out.items = raw.items
      .filter((i) => i && i.id && i.title)
      .map((i) => ({
        id: String(i.id),
        title: String(i.title),
        type: TYPES[i.type] ? i.type : 'task',
        courseId: courseIds.has(i.courseId) ? i.courseId : null,
        due: /^\d{4}-\d{2}-\d{2}$/.test(i.due) ? i.due : '',
        time: /^\d{2}:\d{2}$/.test(i.time) ? i.time : '',
        priority: [0, 1, 2].includes(i.priority) ? i.priority : 1,
        reminder: Number.isFinite(i.reminder) ? i.reminder : null,
        notes: String(i.notes || ''),
        subtasks: Array.isArray(i.subtasks)
          ? i.subtasks.filter((s) => s && s.text).map((s) => ({ id: String(s.id || uid()), text: String(s.text), done: !!s.done }))
          : [],
        done: !!i.done,
        completedAt: i.completedAt || null,
        createdAt: i.createdAt || new Date().toISOString(),
        remindedKey: i.remindedKey || null,
      }));
  }

  if (raw.settings && typeof raw.settings === 'object') {
    for (const k of Object.keys(DEFAULT_SETTINGS)) {
      if (k in raw.settings) out.settings[k] = raw.settings[k];
    }
  }
  return out;
}

let saveTimer = null;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveTimer = null;
    api.save(db).catch((err) => toast(`Couldn't save: ${err.message}`));
  }, 150);
}
window.addEventListener('beforeunload', () => {
  if (saveTimer) { clearTimeout(saveTimer); api.save(db); }
});

function commit() {
  save();
  render();
  if (modal && modal.refresh) modal.refresh();
}

// ================= Theme / settings =================
const darkMq = matchMedia('(prefers-color-scheme: dark)');
function applyTheme() {
  const t = db.settings.theme === 'system' ? (darkMq.matches ? 'dark' : 'light') : db.settings.theme;
  document.documentElement.dataset.theme = t;
  const cs = getComputedStyle(document.documentElement);
  api.setTitlebarColors({ color: cs.getPropertyValue('--bg').trim(), symbolColor: cs.getPropertyValue('--text-2').trim() });
}
darkMq.addEventListener('change', applyTheme);

function applySettings() {
  api.applySettings({ closeToTray: db.settings.closeToTray, openAtLogin: db.settings.openAtLogin });
}

// ================= Rendering: sidebar =================
function renderSidebar() {
  const open = openItems();
  const overdue = open.filter(isOverdue).length;

  $('#nav').innerHTML = VIEWS.map((v) => {
    const active = ui.view === v.key && !(v.key === 'upcoming' && ui.course) && !ui.search;
    let count = '';
    if (v.key === 'dashboard' && overdue) count = `<span class="count alert" title="Overdue">${overdue}</span>`;
    if (v.key === 'upcoming' && open.length) count = `<span class="count">${open.length}</span>`;
    return `<button class="nav-item ${active ? 'active' : ''}" data-action="view" data-view="${v.key}">${icon(v.icon, 18)}<span class="label">${v.label}</span>${count}</button>`;
  }).join('');

  $('#course-list').innerHTML = db.courses.length
    ? db.courses.map((c) => {
      const n = open.filter((i) => i.courseId === c.id).length;
      return `<div class="course-item">
          <button class="nav-item ${ui.course === c.id && !ui.search ? 'active' : ''}" data-action="course" data-id="${c.id}">
            <span class="dot" style="background:${c.color}"></span><span class="label">${esc(c.name)}</span><span class="count">${n || ''}</span>
          </button>
          <button class="icon-btn sm edit" data-action="edit-course" data-id="${c.id}" title="Edit course" aria-label="Edit ${esc(c.name)}">${icon('edit', 13)}</button>
        </div>`;
    }).join('')
    : '<div class="course-empty">No courses yet. <button data-action="new-course">Add one</button></div>';
}

// ================= Rendering: shared pieces =================
function itemRow(it) {
  const c = courseById(it.courseId);
  const t = TYPES[it.type];
  const due = dueInfo(it);
  const subDone = it.subtasks.filter((s) => s.done).length;
  return `<div class="item ${it.done ? 'done' : ''}" data-action="edit" data-id="${it.id}" ${c ? `style="--cc:${c.color}"` : ''}>
    <button class="check" data-action="toggle" data-id="${it.id}" title="${it.done ? 'Mark as not done' : 'Mark as done'}" aria-label="${it.done ? 'Mark as not done' : 'Mark as done'}">${icon('check', 13, 3)}</button>
    <div class="item-body">
      <div class="item-title">${esc(it.title)}</div>
      <div class="item-meta">
        <span class="type-badge t-${it.type}">${icon(t.icon, 13)}${t.label}</span>
        ${c ? `<span class="course-tag" style="--cc:${c.color}"><i></i>${esc(c.name)}</span>` : ''}
        <span class="meta ${due.cls}">${icon(due.cls === 'overdue' ? 'alert' : 'clock', 13)}${esc(due.text)}</span>
        ${it.subtasks.length ? `<span class="meta" title="Checklist">${icon('checklist', 13)}${subDone}/${it.subtasks.length}</span>` : ''}
        ${it.notes.trim() ? `<span class="meta" title="Has notes">${icon('notes', 13)}</span>` : ''}
        ${it.reminder != null && it.due && !it.done ? `<span class="meta" title="Reminder set">${icon('bell', 13)}</span>` : ''}
      </div>
    </div>
    ${it.priority === 2 ? `<span class="pri-flag" title="High priority">${icon('flag', 15)}</span>` : ''}
    <div class="item-actions">
      <button class="icon-btn danger" data-action="delete" data-id="${it.id}" title="Delete" aria-label="Delete">${icon('trash', 16)}</button>
    </div>
  </div>`;
}

function groupHtml(title, items, cls = '') {
  if (!items.length) return '';
  return `<div class="group">
    <div class="group-head ${cls}">${title}<span class="n">${items.length}</span></div>
    <div class="group-list">${items.map(itemRow).join('')}</div>
  </div>`;
}

function emptyHtml(iconName, title, text, buttons = '') {
  return `<div class="empty">
    <div class="empty-icon">${icon(iconName, 26)}</div>
    <h3>${title}</h3><p>${text}</p>
    ${buttons ? `<div class="btn-row">${buttons}</div>` : ''}
  </div>`;
}
const newItemBtn = (label = 'New item') => `<button class="btn primary" data-action="new-item">${icon('plus', 16, 2.4)}${label}</button>`;

function buckets(items) {
  const b = { overdue: [], today: [], tomorrow: [], week: [], later: [], none: [] };
  for (const it of [...items].sort(cmpItems)) {
    if (!it.due) b.none.push(it);
    else if (isOverdue(it)) b.overdue.push(it);
    else {
      const d = daysFromToday(it.due);
      if (d <= 0) b.today.push(it);
      else if (d === 1) b.tomorrow.push(it);
      else if (d <= 7) b.week.push(it);
      else b.later.push(it);
    }
  }
  return b;
}

// ================= Views =================
function viewDashboard() {
  const now = new Date();
  const h = now.getHours();
  const greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  const open = openItems();
  const overdue = open.filter(isOverdue).sort(cmpItems);
  const inDays = (it, lo, hi) => it.due && !isOverdue(it) && daysFromToday(it.due) >= lo && daysFromToday(it.due) <= hi;
  const today = open.filter((i) => inDays(i, 0, 0)).sort(cmpItems);
  const tomorrow = open.filter((i) => inDays(i, 1, 1)).sort(cmpItems);
  const week = open.filter((i) => inDays(i, 0, 6));
  const weekAgo = Date.now() - 7 * 864e5;
  const doneWeek = db.items.filter((i) => i.done && i.completedAt && Date.parse(i.completedAt) >= weekAgo).length;
  const total = doneWeek + week.length + overdue.length;
  const pct = total ? Math.round((doneWeek / total) * 100) : 0;
  const testsWeek = week.filter((i) => ASSESSMENTS.includes(i.type)).length;

  const summary = [
    today.length ? `${plural(today.length, 'thing')} due today` : 'Nothing due today',
    testsWeek ? `${plural(testsWeek, 'quiz/test', 'quizzes/tests')} this week` : '',
    overdue.length ? `${overdue.length} overdue` : '',
  ].filter(Boolean).join(' · ');

  const stat = (cls, iconName, label, value, view, extra = '') =>
    `<button class="stat ${cls}" data-action="view" data-view="${view}"><div class="stat-label">${icon(iconName, 15)}${label}</div><div class="stat-value">${value}</div>${extra}</button>`;

  const stats = `<div class="stats">
    ${stat(`overdue ${overdue.length ? '' : 'zero'}`, 'alert', 'Overdue', overdue.length, 'upcoming')}
    ${stat('', 'clock', 'Due today', today.length, 'upcoming')}
    ${stat('', 'calendar', 'Next 7 days', week.length, 'calendar')}
    ${stat('', 'done', 'Done this week', doneWeek, 'completed', `<div class="progress" title="${pct}% of this week's work"><i style="width:${pct}%"></i></div>`)}
  </div>`;

  // Seven-day strip
  const days = [];
  for (let n = 0; n < 7; n++) {
    const key = keyPlus(n);
    const its = open.filter((i) => i.due === key).sort(cmpItems);
    const bars = its.slice(0, 4).map((i) => `<div class="bar" style="--c:var(--t-${i.type})" title="${esc(i.title)}"></div>`).join('');
    days.push(`<button class="week-day ${n === 0 ? 'today' : ''}" data-action="goto-date" data-date="${key}" title="${fmtDate(key, { weekday: 'long', month: 'long', day: 'numeric' })}">
      <span class="wd">${n === 0 ? 'Today' : fmtDate(key, { weekday: 'short' })}</span>
      <span class="dn">${fromKey(key).getDate()}</span>
      ${its.length ? `<div class="bars">${bars}${its.length > 4 ? `<span class="more">+${its.length - 4} more</span>` : ''}</div>` : '<span class="none">Free</span>'}
    </button>`);
  }

  // Focus panel
  let focus;
  if (!db.items.length) {
    focus = emptyHtml('sun', 'Welcome to Planner', 'Start by adding your classes, then your assignments and tests.',
      `<button class="btn" data-action="new-course">${icon('plus', 15)}Add a course</button>${newItemBtn('Add first item')}`);
  } else if (!overdue.length && !today.length && !tomorrow.length) {
    focus = emptyHtml('done', "You're all caught up", 'Nothing due today or tomorrow.');
  } else {
    const sub = (title, items, cls = '') => items.length
      ? `<div class="sub-head ${cls}">${title}</div><div class="group-list">${items.map(itemRow).join('')}</div>` : '';
    focus = `<div class="panel-body">${sub('Overdue', overdue, 'overdue')}${sub('Today', today)}${sub('Tomorrow', tomorrow)}</div>`;
  }

  // Upcoming assessments (next 30 days)
  const tests = open.filter((i) => ASSESSMENTS.includes(i.type) && inDays(i, 0, 30)).sort(cmpItems).slice(0, 6);
  const testsHtml = tests.length
    ? `<div class="panel-body">${tests.map((it) => {
      const d = daysFromToday(it.due);
      const c = courseById(it.courseId);
      const cd = d === 0 ? '<b style="font-size:13px">TODAY</b>' : `<b>${d}</b><small>${d === 1 ? 'day' : 'days'}</small>`;
      return `<button class="exam-card" data-action="edit" data-id="${it.id}">
          <div class="countdown t-${it.type}">${cd}</div>
          <div class="ec-body">
            <div class="ec-title">${esc(it.title)}</div>
            <div class="ec-meta">
              <span class="type-badge t-${it.type}">${TYPES[it.type].label}</span>
              ${c ? `<span class="course-tag" style="--cc:${c.color}"><i></i>${esc(c.name)}</span>` : ''}
              <span>${esc(fmtDate(it.due, { weekday: 'short', month: 'short', day: 'numeric' }))}${it.time ? ` · ${fmtTime(it.time)}` : ''}</span>
            </div>
          </div>
        </button>`;
    }).join('')}</div>`
    : `<div class="empty"><p>No quizzes, tests, or exams in the next 30 days.</p><button class="btn sm" data-action="new-item" data-type="test">${icon('plus', 14)}Add a test</button></div>`;

  return `
    <div class="page-head">
      <div>
        <h1 class="page-title">${greet}</h1>
        <div class="page-sub">${esc(now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }))} — ${esc(summary)}</div>
      </div>
    </div>
    ${stats}
    <div class="week">${days.join('')}</div>
    <div class="dash-grid">
      <div class="panel">
        <div class="panel-head"><div class="panel-title">${icon('list', 17)}Focus</div>
          <button class="btn ghost sm" data-action="view" data-view="upcoming">View all${icon('right', 14)}</button></div>
        ${focus}
      </div>
      <div class="panel">
        <div class="panel-head"><div class="panel-title">${icon('exam', 17)}Upcoming tests</div></div>
        ${testsHtml}
      </div>
    </div>`;
}

function viewUpcoming() {
  const course = courseById(ui.course);
  const base = openItems().filter((i) => !course || i.courseId === course.id);
  const filter = TYPE_FILTERS.find((f) => f.key === ui.filter) || TYPE_FILTERS[0];
  const items = base.filter((i) => !filter.types || filter.types.includes(i.type));
  const b = buckets(items);

  const chips = TYPE_FILTERS.map((f) => {
    const n = base.filter((i) => !f.types || f.types.includes(i.type)).length;
    return `<button class="chip ${ui.filter === f.key ? 'active' : ''}" data-action="filter" data-filter="${f.key}">${f.label}<span class="n">${n}</span></button>`;
  }).join('');

  let body;
  if (!db.items.length) {
    body = emptyHtml('list', 'Nothing planned yet', 'Add an assignment, test, or task to get started.', newItemBtn());
  } else if (!items.length) {
    body = emptyHtml('done', "You're all caught up", course ? `Nothing left to do for ${esc(course.name)}.` : 'Nothing left to do here.', newItemBtn());
  } else {
    body = groupHtml('Overdue', b.overdue, 'overdue')
      + groupHtml(`Today <span class="n">${esc(fmtDate(todayKey(), { weekday: 'short', month: 'short', day: 'numeric' }))}</span>`, b.today)
      + groupHtml('Tomorrow', b.tomorrow)
      + groupHtml('Next 7 days', b.week)
      + groupHtml('Later', b.later)
      + groupHtml('No due date', b.none);
  }

  const doneCount = course ? db.items.filter((i) => i.done && i.courseId === course.id).length : 0;
  const title = course
    ? `<h1 class="page-title"><span class="dot" style="background:${course.color};width:14px;height:14px"></span>${esc(course.name)}</h1>
       <div class="page-sub">${plural(base.length, 'item')} to do · ${doneCount} completed</div>`
    : `<h1 class="page-title">Upcoming</h1><div class="page-sub">${plural(base.length, 'item')} to do</div>`;

  return `
    <div class="page-head">
      <div>${title}</div>
      ${course ? `<button class="btn" data-action="edit-course" data-id="${course.id}">${icon('edit', 14)}Edit course</button>` : ''}
    </div>
    <div class="toolbar"><div class="chip-row">${chips}</div></div>
    ${body}`;
}

function viewCalendar() {
  const m = ui.calMonth;
  const ws = Number(db.settings.weekStart) || 0;
  const offset = (m.getDay() - ws + 7) % 7;
  const daysInMonth = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  const weeks = Math.ceil((offset + daysInMonth) / 7);
  const start = addDays(m, -offset);
  const tKey = todayKey();

  const byDay = {};
  for (const it of db.items) if (it.due) (byDay[it.due] ||= []).push(it);

  const wdNames = [];
  for (let i = 0; i < 7; i++) wdNames.push(`<div>${addDays(start, i).toLocaleDateString(undefined, { weekday: 'short' })}</div>`);

  const cells = [];
  for (let i = 0; i < weeks * 7; i++) {
    const d = addDays(start, i);
    const key = toKey(d);
    const its = (byDay[key] || []).sort((a, b) => (a.done - b.done) || cmpItems(a, b));
    const chips = its.slice(0, 3).map((it) => `<button class="cal-chip t-${it.type} ${it.done ? 'done' : ''}" draggable="true" data-action="edit" data-id="${it.id}" title="${esc(`${TYPES[it.type].label}: ${it.title}`)}">
        <span>${esc(it.title)}</span>${it.time ? `<small>${fmtTime(it.time)}</small>` : ''}</button>`).join('');
    cells.push(`<div class="cal-day ${d.getMonth() !== m.getMonth() ? 'other' : ''} ${key === tKey ? 'today' : ''}" data-date="${key}">
      <div class="cal-day-top"><span class="cal-num">${d.getDate()}</span>
        <button class="icon-btn sm cal-add" data-action="new-on" data-date="${key}" title="Add on this day" aria-label="Add item">${icon('plus', 14)}</button></div>
      ${chips}
      ${its.length > 3 ? `<button class="cal-more" data-action="day" data-date="${key}">+${its.length - 3} more</button>` : ''}
    </div>`);
  }

  return `
    <div class="page-head">
      <div><h1 class="page-title">${m.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h1></div>
      <div class="cal-nav">
        <button class="btn sm" data-action="cal-today">Today</button>
        <button class="icon-btn" data-action="cal-prev" title="Previous month (←)" aria-label="Previous month">${icon('left', 18)}</button>
        <button class="icon-btn" data-action="cal-next" title="Next month (→)" aria-label="Next month">${icon('right', 18)}</button>
      </div>
    </div>
    <div class="cal">
      <div class="cal-weekdays">${wdNames.join('')}</div>
      <div class="cal-grid">${cells.join('')}</div>
    </div>
    <div class="cal-hint">Drag items between days to reschedule · Double-click a day to add something</div>`;
}

function viewCompleted() {
  const done = db.items.filter((i) => i.done).sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''));
  if (!done.length) {
    return `<div class="page-head"><div><h1 class="page-title">Completed</h1></div></div>
      ${emptyHtml('done', 'Nothing completed yet', 'Check things off and they’ll show up here.')}`;
  }
  const groups = new Map();
  for (const it of done) {
    const key = it.completedAt ? toKey(new Date(it.completedAt)) : '';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(it);
  }
  const label = (k) => {
    if (!k) return 'Earlier';
    const d = daysFromToday(k);
    if (d === 0) return 'Today';
    if (d === -1) return 'Yesterday';
    return esc(fmtDate(k, { weekday: 'long', month: 'short', day: 'numeric' }));
  };
  return `
    <div class="page-head">
      <div><h1 class="page-title">Completed</h1><div class="page-sub">${plural(done.length, 'item')} done</div></div>
      <button class="btn danger" data-action="clear-completed">${icon('trash', 15)}Clear all</button>
    </div>
    ${[...groups].map(([k, its]) => groupHtml(label(k), its)).join('')}`;
}

function viewSearch() {
  const q = ui.search.trim().toLowerCase();
  const hits = db.items.filter((i) => i.title.toLowerCase().includes(q)
    || i.notes.toLowerCase().includes(q)
    || TYPES[i.type].label.toLowerCase().includes(q)
    || (courseById(i.courseId)?.name.toLowerCase().includes(q))
    || i.subtasks.some((s) => s.text.toLowerCase().includes(q)));
  const open = hits.filter((i) => !i.done).sort(cmpItems);
  const done = hits.filter((i) => i.done).sort(cmpItems);
  return `
    <div class="page-head"><div><h1 class="page-title">Search</h1>
      <div class="page-sub">${plural(hits.length, 'result')} for “${esc(ui.search.trim())}”</div></div></div>
    ${hits.length ? groupHtml('To do', open) + groupHtml('Completed', done) : emptyHtml('search', 'No matches', 'Try a different word.')}`;
}

function render() {
  renderSidebar();
  const content = $('#content');
  const pageKey = ui.search.trim() ? 'search' : `${ui.view}:${ui.course || ''}`;
  const html = ui.search.trim() ? viewSearch()
    : ui.view === 'upcoming' ? viewUpcoming()
      : ui.view === 'calendar' ? viewCalendar()
        : ui.view === 'completed' ? viewCompleted()
          : viewDashboard();
  const scroll = content.scrollTop;
  const entering = pageKey !== ui.lastPage;
  content.innerHTML = `<div class="page ${entering ? 'enter' : ''}">${html}</div>`;
  content.scrollTop = entering ? 0 : scroll;
  ui.lastPage = pageKey;
}

function setView(view) {
  ui.view = view;
  ui.course = null;
  clearSearch();
  render();
}

function clearSearch() {
  ui.search = '';
  $('#search').value = '';
}

// ================= Actions =================
function toggleDone(id, el) {
  const it = getItem(id);
  if (!it) return;
  if (it.done) {
    it.done = false;
    it.completedAt = null;
    commit();
    return;
  }
  const finish = () => {
    it.done = true;
    it.completedAt = new Date().toISOString();
    commit();
    toast(`Completed “${it.title}”`, 'Undo', () => { it.done = false; it.completedAt = null; commit(); });
  };
  const row = el && el.closest('.item');
  if (row) {
    if (row.classList.contains('completing')) return;
    row.classList.add('completing');
    setTimeout(finish, 380);
  } else finish();
}

function deleteItem(id) {
  const idx = db.items.findIndex((i) => i.id === id);
  if (idx < 0) return;
  const [it] = db.items.splice(idx, 1);
  commit();
  toast(`Deleted “${it.title}”`, 'Undo', () => { db.items.splice(idx, 0, it); commit(); });
}

function moveItem(id, date) {
  const it = getItem(id);
  if (!it || it.due === date) return;
  const prev = it.due;
  it.due = date;
  commit();
  toast(`Moved to ${fmtDate(date, { weekday: 'short', month: 'short', day: 'numeric' })}`, 'Undo', () => { it.due = prev; commit(); });
}

function nextColor() {
  const used = new Set(db.courses.map((c) => c.color));
  return COURSE_COLORS.find((c) => !used.has(c)) || COURSE_COLORS[db.courses.length % COURSE_COLORS.length];
}

// ================= Toast =================
function toast(msg, actionLabel, onAction) {
  const root = $('#toast-root');
  root.innerHTML = '';
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span>${esc(msg)}</span>${actionLabel ? `<button>${esc(actionLabel)}</button>` : ''}`;
  root.append(el);
  const close = () => { el.classList.add('out'); setTimeout(() => el.remove(), 200); };
  const timer = setTimeout(close, 5000);
  if (actionLabel) {
    el.querySelector('button').onclick = () => { clearTimeout(timer); close(); onAction(); };
  }
}

// ================= Modal infrastructure =================
function openModal(html, { cls = '', onSubmit = null } = {}) {
  const root = $('#modal-root');
  root.innerHTML = `<div class="scrim"><div class="modal ${cls}" role="dialog" aria-modal="true">${html}</div></div>`;
  const scrim = root.firstElementChild;
  scrim.addEventListener('mousedown', (e) => { if (e.target === scrim) closeModal(); });
  modal = { el: scrim.firstElementChild, onSubmit, refresh: null };
  return modal.el;
}

function closeModal() {
  modal = null;
  $('#modal-root').innerHTML = '';
}

$('#modal-root').addEventListener('click', (e) => {
  if (e.target.closest('[data-m="close"]')) closeModal();
});

function confirmDialog({ title, message, confirmLabel = 'Delete', onConfirm }) {
  const ok = () => { closeModal(); onConfirm(); };
  const el = openModal(`
    <div class="modal-head"><h2>${esc(title)}</h2></div>
    <div class="modal-body"><p style="margin:0;color:var(--text-2)">${esc(message)}</p></div>
    <div class="modal-foot"><span class="spacer"></span>
      <button class="btn ghost" data-m="close">Cancel</button>
      <button class="btn primary" id="c-ok" style="background:var(--danger);border-color:var(--danger)">${esc(confirmLabel)}</button>
    </div>`, { cls: 'sm', onSubmit: ok });
  $('#c-ok', el).onclick = ok;
  $('#c-ok', el).focus();
}

// ================= Item editor =================
function courseOptions(selected) {
  return '<option value="">No course</option>'
    + db.courses.map((c) => `<option value="${c.id}" ${c.id === selected ? 'selected' : ''}>${esc(c.name)}</option>`).join('')
    + '<option value="__new">+ New course…</option>';
}

function nextWeekday(target) { // 1 = Monday
  const now = new Date();
  let n = (target - now.getDay() + 7) % 7;
  if (n === 0) n = 7;
  return toKey(addDays(now, n));
}

function openItemModal(item, preset = {}) {
  const isNew = !item;
  const typeFromFilter = ui.filter === 'assessment' ? 'test' : ui.filter === 'task' ? 'task' : 'assignment';
  const d = item ? structuredClone(item) : {
    id: uid(),
    title: '',
    type: preset.type || typeFromFilter,
    courseId: preset.courseId !== undefined ? preset.courseId : ui.course,
    due: preset.due !== undefined ? preset.due : keyPlus(1),
    time: '',
    priority: 1,
    reminder: db.settings.defaultReminder,
    notes: '',
    subtasks: [],
    done: false,
    completedAt: null,
    createdAt: new Date().toISOString(),
    remindedKey: null,
  };
  const remValue = d.reminder == null ? '' : String(d.reminder);
  const remOpts = [...REMINDERS];
  if (!remOpts.some(([v]) => v === remValue)) remOpts.push([remValue, `${d.reminder} minutes before`]);

  const quick = [
    ['Today', todayKey()], ['Tomorrow', keyPlus(1)],
    [`Next ${fmtDate(nextWeekday(1), { weekday: 'short' })}`, nextWeekday(1)],
    ['In a week', keyPlus(7)], ['No date', ''],
  ];

  const el = openModal(`
    <div class="modal-head">
      <h2>${isNew ? 'New item' : 'Edit item'}</h2>
      <button class="icon-btn" data-m="close" aria-label="Close">${icon('x', 18)}</button>
    </div>
    <div class="modal-body">
      <div class="seg types" id="m-type">${TYPE_KEYS.map((k) => `<button type="button" class="t-${k} ${d.type === k ? 'active' : ''}" data-type="${k}">${icon(TYPES[k].icon, 15)}${TYPES[k].label}</button>`).join('')}</div>
      <input class="input title" id="m-title" placeholder="${esc(TYPES[d.type].placeholder)}" value="${esc(d.title)}" maxlength="200" spellcheck="true">
      <div class="row-3">
        <div class="field"><label for="m-course">Course</label><select class="select" id="m-course">${courseOptions(d.courseId)}</select></div>
        <div class="field"><label for="m-due">Due date</label><input class="input" type="date" id="m-due" value="${d.due}"></div>
        <div class="field"><label for="m-time">Time <span class="muted">(optional)</span></label><input class="input" type="time" id="m-time" value="${d.time}"></div>
      </div>
      <div class="row" id="m-newcourse" hidden>
        <input class="input" id="m-newcourse-name" placeholder="New course name, e.g. AP Chemistry" maxlength="60">
        <div class="btn-row"><button class="btn primary" id="m-newcourse-add" type="button">Add course</button><button class="btn ghost" id="m-newcourse-cancel" type="button">Cancel</button></div>
      </div>
      <div class="quick-dates" id="m-quick">${quick.map(([l, k]) => `<button type="button" class="chip ${d.due === k ? 'active' : ''}" data-date="${k}">${l}</button>`).join('')}</div>
      <div class="row">
        <div class="field"><span class="field-label">Priority</span>
          <div class="seg" id="m-pri">${PRIORITIES.map((p, i) => `<button type="button" class="pri-${i} ${d.priority === i ? 'active' : ''}" data-pri="${i}">${i === 2 ? icon('flag', 14) : ''}${p}</button>`).join('')}</div>
        </div>
        <div class="field"><label for="m-rem">Reminder</label>
          <select class="select" id="m-rem">${remOpts.map(([v, l]) => `<option value="${v}" ${v === remValue ? 'selected' : ''}>${l}</option>`).join('')}</select>
        </div>
      </div>
      <div class="field"><label for="m-notes">Notes</label>
        <textarea class="textarea" id="m-notes" placeholder="${esc(TYPES[d.type].notes)}">${esc(d.notes)}</textarea></div>
      <div class="field"><span class="field-label">Checklist</span>
        <div class="subtasks" id="m-subs"></div>
        <div class="subtask-new">${icon('plus', 16)}<input id="m-sub-new" placeholder="Add a step, then press Enter" maxlength="200"></div>
      </div>
    </div>
    <div class="modal-foot">
      ${isNew ? '' : `<button class="btn danger" id="m-delete">${icon('trash', 15)}Delete</button>
        <button class="btn" id="m-done">${icon('check', 15, 2.5)}${d.done ? 'Mark not done' : 'Mark done'}</button>`}
      <span class="spacer"></span><span class="hint">Ctrl+Enter to save</span>
      <button class="btn ghost" data-m="close">Cancel</button>
      <button class="btn primary" id="m-save">${isNew ? 'Add' : 'Save'}</button>
    </div>`, { onSubmit: () => submit() });

  const f = (id) => $(`#${id}`, el);
  const title = f('m-title');
  const course = f('m-course');
  const due = f('m-due');
  const time = f('m-time');

  // Type
  f('m-type').addEventListener('click', (e) => {
    const b = e.target.closest('[data-type]');
    if (!b) return;
    d.type = b.dataset.type;
    for (const x of f('m-type').children) x.classList.toggle('active', x === b);
    title.placeholder = TYPES[d.type].placeholder;
    f('m-notes').placeholder = TYPES[d.type].notes;
  });

  // Dates
  const syncQuick = () => { for (const c of f('m-quick').children) c.classList.toggle('active', c.dataset.date === due.value); };
  due.addEventListener('input', syncQuick);
  f('m-quick').addEventListener('click', (e) => {
    const b = e.target.closest('[data-date]');
    if (!b) return;
    due.value = b.dataset.date;
    if (!due.value) time.value = '';
    syncQuick();
  });

  // Priority
  f('m-pri').addEventListener('click', (e) => {
    const b = e.target.closest('[data-pri]');
    if (!b) return;
    d.priority = Number(b.dataset.pri);
    for (const x of f('m-pri').children) x.classList.toggle('active', x === b);
  });

  // Inline new course
  let prevCourse = course.value;
  course.addEventListener('change', () => {
    if (course.value === '__new') {
      f('m-newcourse').hidden = false;
      f('m-newcourse-name').focus();
    } else {
      prevCourse = course.value;
      f('m-newcourse').hidden = true;
    }
  });
  const addCourse = () => {
    const name = f('m-newcourse-name').value.trim();
    if (!name) { f('m-newcourse-name').focus(); return; }
    const c = { id: uid(), name, color: nextColor() };
    db.courses.push(c);
    save();
    renderSidebar();
    course.innerHTML = courseOptions(c.id);
    prevCourse = c.id;
    f('m-newcourse-name').value = '';
    f('m-newcourse').hidden = true;
  };
  f('m-newcourse-add').onclick = addCourse;
  f('m-newcourse-cancel').onclick = () => { f('m-newcourse').hidden = true; course.value = prevCourse; };
  f('m-newcourse-name').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addCourse(); }
  });

  // Checklist
  const subs = f('m-subs');
  const renderSubs = () => {
    subs.innerHTML = d.subtasks.map((s, i) => `<div class="subtask ${s.done ? 'done' : ''}" data-i="${i}">
        <button type="button" class="check ${s.done ? 'on' : ''}" data-sub="toggle" aria-label="Toggle step">${icon('check', 11, 3)}</button>
        <input value="${esc(s.text)}" maxlength="200" aria-label="Step">
        <button type="button" class="icon-btn sm danger" data-sub="del" aria-label="Remove step">${icon('x', 14)}</button>
      </div>`).join('');
  };
  renderSubs();
  subs.addEventListener('click', (e) => {
    const b = e.target.closest('[data-sub]');
    if (!b) return;
    const i = Number(b.closest('.subtask').dataset.i);
    if (b.dataset.sub === 'toggle') d.subtasks[i].done = !d.subtasks[i].done;
    else d.subtasks.splice(i, 1);
    renderSubs();
  });
  subs.addEventListener('input', (e) => {
    const row = e.target.closest('.subtask');
    if (row) d.subtasks[Number(row.dataset.i)].text = e.target.value;
  });
  subs.addEventListener('keydown', (e) => {
    const row = e.target.closest('.subtask');
    if (!row || e.target.tagName !== 'INPUT') return;
    const i = Number(row.dataset.i);
    if (e.key === 'Enter' && !e.ctrlKey) { e.preventDefault(); f('m-sub-new').focus(); }
    if (e.key === 'Backspace' && !e.target.value) {
      e.preventDefault();
      d.subtasks.splice(i, 1);
      renderSubs();
      const prev = subs.querySelectorAll('input')[i - 1];
      (prev || f('m-sub-new')).focus();
    }
  });
  f('m-sub-new').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.ctrlKey) {
      e.preventDefault();
      const text = e.target.value.trim();
      if (!text) return;
      d.subtasks.push({ id: uid(), text, done: false });
      e.target.value = '';
      renderSubs();
    }
  });

  title.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.ctrlKey) { e.preventDefault(); submit(); } });
  title.addEventListener('input', () => title.classList.remove('invalid'));

  function collect() {
    d.title = title.value.trim();
    d.courseId = course.value && course.value !== '__new' ? course.value : null;
    d.due = due.value;
    d.time = due.value ? time.value : '';
    d.reminder = f('m-rem').value === '' ? null : Number(f('m-rem').value);
    d.notes = f('m-notes').value;
    const pending = f('m-sub-new').value.trim();
    if (pending) {
      d.subtasks.push({ id: uid(), text: pending, done: false });
      f('m-sub-new').value = '';
    }
    d.subtasks = d.subtasks.filter((s) => s.text.trim());
  }

  function store() {
    const idx = db.items.findIndex((i) => i.id === d.id);
    if (idx >= 0) db.items[idx] = d; else db.items.push(d);
  }

  function submit() {
    collect();
    if (!d.title) {
      title.classList.add('invalid');
      title.focus();
      return;
    }
    store();
    closeModal();
    commit();
    if (isNew) toast(`Added “${d.title}”${d.due ? ` — due ${whenPhrase(d)}` : ''}`);
  }

  f('m-save').onclick = submit;
  if (!isNew) {
    f('m-delete').onclick = () => { closeModal(); deleteItem(d.id); };
    f('m-done').onclick = () => {
      collect();
      if (!d.title) d.title = item.title;
      d.done = !d.done;
      d.completedAt = d.done ? new Date().toISOString() : null;
      store();
      closeModal();
      commit();
      if (d.done) toast(`Completed “${d.title}”`);
    };
  }

  title.focus();
  if (!isNew) title.setSelectionRange(title.value.length, title.value.length);
}

// ================= Course editor =================
function openCourseModal(course) {
  const isNew = !course;
  const d = course ? { ...course } : { id: uid(), name: '', color: nextColor() };

  const el = openModal(`
    <div class="modal-head"><h2>${isNew ? 'New course' : 'Edit course'}</h2>
      <button class="icon-btn" data-m="close" aria-label="Close">${icon('x', 18)}</button></div>
    <div class="modal-body">
      <div class="field"><label for="c-name">Name</label>
        <input class="input" id="c-name" value="${esc(d.name)}" placeholder="e.g. AP Calculus" maxlength="60"></div>
      <div class="field"><span class="field-label">Color</span>
        <div class="swatches" id="c-colors">${COURSE_COLORS.map((c) => `<button type="button" class="swatch ${c === d.color ? 'active' : ''}" style="--c:${c}" data-color="${c}" aria-label="Color ${c}"></button>`).join('')}</div>
      </div>
    </div>
    <div class="modal-foot">
      ${isNew ? '' : `<button class="btn danger" id="c-delete">${icon('trash', 15)}Delete course</button>`}
      <span class="spacer"></span>
      <button class="btn ghost" data-m="close">Cancel</button>
      <button class="btn primary" id="c-save">${isNew ? 'Add course' : 'Save'}</button>
    </div>`, { cls: 'sm', onSubmit: () => submit() });

  const name = $('#c-name', el);
  $('#c-colors', el).addEventListener('click', (e) => {
    const b = e.target.closest('[data-color]');
    if (!b) return;
    d.color = b.dataset.color;
    for (const x of $('#c-colors', el).children) x.classList.toggle('active', x === b);
  });
  name.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.ctrlKey) { e.preventDefault(); submit(); } });
  name.addEventListener('input', () => name.classList.remove('invalid'));

  function submit() {
    d.name = name.value.trim();
    if (!d.name) { name.classList.add('invalid'); name.focus(); return; }
    const idx = db.courses.findIndex((c) => c.id === d.id);
    if (idx >= 0) db.courses[idx] = d; else db.courses.push(d);
    closeModal();
    commit();
  }
  $('#c-save', el).onclick = submit;

  if (!isNew) {
    $('#c-delete', el).onclick = () => {
      const n = db.items.filter((i) => i.courseId === d.id).length;
      confirmDialog({
        title: `Delete ${d.name}?`,
        message: n ? `Its ${plural(n, 'item')} will be kept, just without a course.` : 'This course has no items.',
        confirmLabel: 'Delete course',
        onConfirm: () => {
          db.courses = db.courses.filter((c) => c.id !== d.id);
          for (const it of db.items) if (it.courseId === d.id) it.courseId = null;
          if (ui.course === d.id) { ui.course = null; ui.view = 'upcoming'; }
          commit();
        },
      });
    };
  }
  name.focus();
}

// ================= Day detail =================
function openDayModal(key) {
  const build = () => {
    const its = db.items.filter((i) => i.due === key).sort((a, b) => (a.done - b.done) || cmpItems(a, b));
    return `
      <div class="modal-head"><h2>${esc(fmtDate(key, { weekday: 'long', month: 'long', day: 'numeric' }))}</h2>
        <button class="icon-btn" data-m="close" aria-label="Close">${icon('x', 18)}</button></div>
      <div class="modal-body">${its.length ? `<div class="group-list">${its.map(itemRow).join('')}</div>` : '<p class="muted">Nothing on this day.</p>'}</div>
      <div class="modal-foot"><span class="spacer"></span>
        <button class="btn primary" data-action="new-on" data-date="${key}">${icon('plus', 15, 2.4)}Add on this day</button></div>`;
  };
  const el = openModal(build());
  modal.refresh = () => { el.innerHTML = build(); };
}

// ================= Settings =================
function openSettings() {
  const s = db.settings;
  const sw = (key) => `<button class="switch ${s[key] ? 'on' : ''}" data-key="${key}" role="switch" aria-checked="${!!s[key]}"></button>`;
  const remValue = s.defaultReminder == null ? '' : String(s.defaultReminder);

  const el = openModal(`
    <div class="modal-head"><h2>Settings</h2>
      <button class="icon-btn" data-m="close" aria-label="Close">${icon('x', 18)}</button></div>
    <div class="modal-body">
      <div class="setting"><div><div class="s-label">Theme</div><div class="s-desc">Match Windows, or pick one.</div></div>
        <select class="select" id="s-theme">
          ${[['system', 'Match Windows'], ['light', 'Light'], ['dark', 'Dark']].map(([v, l]) => `<option value="${v}" ${s.theme === v ? 'selected' : ''}>${l}</option>`).join('')}
        </select></div>
      <div class="setting"><div><div class="s-label">Week starts on</div></div>
        <select class="select" id="s-week">
          <option value="0" ${Number(s.weekStart) === 0 ? 'selected' : ''}>Sunday</option>
          <option value="1" ${Number(s.weekStart) === 1 ? 'selected' : ''}>Monday</option>
        </select></div>
      <div class="divider"></div>
      <div class="setting"><div><div class="s-label">Reminder notifications</div><div class="s-desc">Windows notifications before things are due.</div></div>${sw('notifications')}</div>
      <div class="setting"><div><div class="s-label">Default reminder</div><div class="s-desc">Used for new items.</div></div>
        <select class="select" id="s-rem">${REMINDERS.map(([v, l]) => `<option value="${v}" ${v === remValue ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      <div class="setting"><div><div class="s-label">Keep running in the tray when closed</div><div class="s-desc">Needed for reminders to fire while the window is closed.</div></div>${sw('closeToTray')}</div>
      <div class="setting"><div><div class="s-label">Start with Windows</div><div class="s-desc">Opens quietly in the tray when you sign in.</div></div>${sw('openAtLogin')}</div>
      <div><button class="btn sm" id="s-test">${icon('bell', 14)}Send a test notification</button></div>
      <div class="divider"></div>
      <div class="field"><span class="field-label">Your data</span>
        <div class="muted">Everything is stored only on this computer. Export a backup now and then to be safe.</div>
        <div class="btn-row" style="margin-top:6px">
          <button class="btn sm" id="s-export">${icon('download', 14)}Export backup</button>
          <button class="btn sm" id="s-import">${icon('upload', 14)}Import backup</button>
          <button class="btn sm ghost" id="s-folder">${icon('folder', 14)}Open data folder</button>
        </div>
      </div>
      <div class="divider"></div>
      <div class="field"><span class="field-label">Keyboard shortcuts</span>
        <div class="kbd-list">
          <kbd>N</kbd><span>New item</span>
          <kbd>/</kbd><span>Search</span>
          <kbd>1 – 4</kbd><span>Dashboard, Upcoming, Calendar, Completed</span>
          <kbd>← →</kbd><span>Previous / next month (Calendar)</span>
          <kbd>Ctrl+Enter</kbd><span>Save the open form</span>
          <kbd>Esc</kbd><span>Close a dialog or clear search</span>
        </div>
      </div>
    </div>
    <div class="modal-foot"><span class="spacer"></span><button class="btn primary" data-m="close">Done</button></div>`, { onSubmit: closeModal });

  const persist = () => { save(); applySettings(); render(); };
  $('#s-theme', el).onchange = (e) => { s.theme = e.target.value; applyTheme(); save(); };
  $('#s-week', el).onchange = (e) => { s.weekStart = Number(e.target.value); persist(); };
  $('#s-rem', el).onchange = (e) => { s.defaultReminder = e.target.value === '' ? null : Number(e.target.value); save(); };
  el.querySelectorAll('.switch').forEach((b) => {
    b.onclick = () => {
      s[b.dataset.key] = !s[b.dataset.key];
      b.classList.toggle('on', s[b.dataset.key]);
      b.setAttribute('aria-checked', String(s[b.dataset.key]));
      persist();
    };
  });
  $('#s-test', el).onclick = () => api.notify({ title: 'Planner', body: 'Notifications are working.' });
  $('#s-export', el).onclick = async () => {
    if (await api.exportData(db)) toast('Backup exported');
  };
  $('#s-import', el).onclick = async () => {
    const raw = await api.importData();
    if (!raw) return;
    if (!Array.isArray(raw.items)) { toast("That file isn't a Planner backup"); return; }
    confirmDialog({
      title: 'Replace all data?',
      message: `This replaces everything currently in Planner with the backup (${plural(raw.items.length, 'item')}).`,
      confirmLabel: 'Replace',
      onConfirm: () => {
        db = normalize(raw);
        applyTheme();
        applySettings();
        commit();
        toast('Backup imported');
      },
    });
  };
  $('#s-folder', el).onclick = () => api.openDataFolder();
}

// ================= Reminders =================
function checkReminders() {
  if (!db.settings.notifications) return;
  const now = Date.now();
  let changed = false;
  for (const it of db.items) {
    if (it.done || it.reminder == null || !it.due) continue;
    // Changing the due date/time or reminder re-arms the notification.
    const key = `${it.due}|${it.time}|${it.reminder}`;
    if (it.remindedKey === key) continue;
    // Untimed items anchor reminders to 8 AM on the due day.
    const anchor = dueMoment(it, '08:00');
    if (now < anchor - it.reminder * 60000) continue;
    // Skip stale reminders (e.g. the computer was off for days).
    const deadline = it.time ? anchor + 3600000 : dueMoment(it);
    if (now <= deadline) {
      const c = courseById(it.courseId);
      const label = TYPES[it.type].label;
      const phrase = ASSESSMENTS.includes(it.type) ? `${label} ${whenPhrase(it)}` : `${label} due ${whenPhrase(it)}`;
      api.notify({ title: it.title, body: `${c ? `${c.name} · ` : ''}${phrase}`, itemId: it.id });
    }
    it.remindedKey = key;
    changed = true;
  }
  if (changed) save();
}

// ================= Events =================
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const { action, id } = el.dataset;
  switch (action) {
    case 'view': setView(el.dataset.view); break;
    case 'course': ui.view = 'upcoming'; ui.course = id; ui.filter = 'all'; clearSearch(); render(); break;
    case 'filter': ui.filter = el.dataset.filter; render(); break;
    case 'new-item': openItemModal(null, el.dataset.type ? { type: el.dataset.type } : {}); break;
    case 'new-on': openItemModal(null, { due: el.dataset.date }); break;
    case 'edit': { const it = getItem(id); if (it) openItemModal(it); break; }
    case 'toggle': toggleDone(id, el); break;
    case 'delete': deleteItem(id); break;
    case 'new-course': openCourseModal(); break;
    case 'edit-course': openCourseModal(courseById(id)); break;
    case 'settings': openSettings(); break;
    case 'day': openDayModal(el.dataset.date); break;
    case 'goto-date':
      ui.calMonth = firstOfMonth(fromKey(el.dataset.date));
      setView('calendar');
      break;
    case 'cal-prev': ui.calMonth = new Date(ui.calMonth.getFullYear(), ui.calMonth.getMonth() - 1, 1); render(); break;
    case 'cal-next': ui.calMonth = new Date(ui.calMonth.getFullYear(), ui.calMonth.getMonth() + 1, 1); render(); break;
    case 'cal-today': ui.calMonth = firstOfMonth(new Date()); render(); break;
    case 'clear-completed': {
      const n = db.items.filter((i) => i.done).length;
      confirmDialog({
        title: 'Clear completed items?',
        message: `This permanently deletes ${plural(n, 'completed item')}.`,
        confirmLabel: 'Clear all',
        onConfirm: () => { db.items = db.items.filter((i) => !i.done); commit(); },
      });
      break;
    }
    default: break;
  }
});

const content = $('#content');
content.addEventListener('dblclick', (e) => {
  const day = e.target.closest('.cal-day');
  if (day && !e.target.closest('button')) openItemModal(null, { due: day.dataset.date });
});
content.addEventListener('dragstart', (e) => {
  const chip = e.target.closest('.cal-chip');
  if (!chip) return;
  dragging = true;
  e.dataTransfer.setData('text/plain', chip.dataset.id);
  e.dataTransfer.effectAllowed = 'move';
});
content.addEventListener('dragend', () => {
  dragging = false;
  document.querySelectorAll('.cal-day.drop').forEach((x) => x.classList.remove('drop'));
});
content.addEventListener('dragover', (e) => {
  const day = e.target.closest('.cal-day');
  if (!day) return;
  e.preventDefault();
  document.querySelectorAll('.cal-day.drop').forEach((x) => x !== day && x.classList.remove('drop'));
  day.classList.add('drop');
});
content.addEventListener('dragleave', (e) => {
  const day = e.target.closest('.cal-day');
  if (day && !day.contains(e.relatedTarget)) day.classList.remove('drop');
});
content.addEventListener('drop', (e) => {
  const day = e.target.closest('.cal-day');
  if (!day) return;
  e.preventDefault();
  dragging = false;
  moveItem(e.dataTransfer.getData('text/plain'), day.dataset.date);
});

const search = $('#search');
search.addEventListener('input', () => { ui.search = search.value; render(); });
search.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { clearSearch(); search.blur(); render(); }
});

document.addEventListener('keydown', (e) => {
  if (modal) {
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
    else if (e.key === 'Enter' && e.ctrlKey && modal.onSubmit) { e.preventDefault(); modal.onSubmit(); }
    return;
  }
  if (e.ctrlKey && (e.key === 'f' || e.key === 'k')) { e.preventDefault(); search.focus(); search.select(); return; }
  if (e.ctrlKey && e.key === 'n') { e.preventDefault(); openItemModal(null); return; }
  const tag = document.activeElement && document.activeElement.tagName;
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || e.ctrlKey || e.altKey || e.metaKey) return;

  if (e.key === 'n' || e.key === 'N') { e.preventDefault(); openItemModal(null); }
  else if (e.key === '/') { e.preventDefault(); search.focus(); }
  else if (['1', '2', '3', '4'].includes(e.key)) setView(VIEWS[Number(e.key) - 1].key);
  else if (ui.view === 'calendar' && !ui.search && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
    const step = e.key === 'ArrowLeft' ? -1 : 1;
    ui.calMonth = new Date(ui.calMonth.getFullYear(), ui.calMonth.getMonth() + step, 1);
    render();
  }
});

// ================= Boot =================
async function init() {
  $('#search-icon').innerHTML = icon('search', 16);
  $('#new-btn').innerHTML = `${icon('plus', 16, 2.4)}New<kbd>N</kbd>`;
  $('#add-course-btn').innerHTML = icon('plus', 15);
  $('#settings-btn').innerHTML = `${icon('settings', 18)}<span class="label">Settings</span>`;

  let raw = null;
  try { raw = await api.load(); } catch { /* first run */ }
  db = normalize(raw);
  ui.calMonth = firstOfMonth(new Date());

  applyTheme();
  applySettings();
  render();

  api.onOpenItem((id) => { const it = getItem(id); if (it) openItemModal(it); });
  api.onNewItem(() => { if (!modal) openItemModal(null); });

  checkReminders();
  setInterval(checkReminders, 30000);
  // Keep "today" / overdue states fresh as time passes.
  setInterval(() => { if (!dragging) render(); }, 60000);
}

init();
