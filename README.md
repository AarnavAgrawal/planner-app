# Planner

A personal Windows planner for assignments, projects, quizzes, tests, exams, and everyday tasks.

## Install

Run `dist\Planner Setup 1.0.0.exe`. Windows SmartScreen may warn because the app isn't code-signed —
click **More info → Run anyway**.

## Develop

```sh
npm install
npm start        # run the app
npm run dist     # build the installer into dist/
```

## Where data lives

`%APPDATA%\Planner\planner-data.json` (a `.bak` copy of the previous save sits next to it).
Settings → **Export backup** saves a copy anywhere you like.

## Layout

- `main.js` — Electron main process: window, tray, notifications, file storage
- `preload.js` — the small, safe API the UI uses (`window.planner`)
- `src/` — the UI (`index.html`, `styles.css`, `app.js`)
- `build/icon.png` — app icon
