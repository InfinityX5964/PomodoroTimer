const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

app.setAppUserModelId('com.focus.pomodoro');
Menu.setApplicationMenu(null);

let win, mini = false, saved = null;

function create() {
  win = new BrowserWindow({
    width: 400, height: 700, minWidth: 260, minHeight: 300,
    backgroundColor: '#000000',
    title: 'Focus',
    titleBarStyle: 'hidden',
    titleBarOverlay: { color: '#000000', symbolColor: '#8a8a90', height: 32 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      backgroundThrottling: false
    }
  });
  win.loadFile('index.html');
}

ipcMain.handle('toggle-mini', () => {
  if (!mini) {
    saved = win.getBounds();
    win.setMinimumSize(200, 200);
    win.setSize(280, 380);
    win.setAlwaysOnTop(true, 'floating');
    mini = true;
  } else {
    win.setAlwaysOnTop(false);
    win.setMinimumSize(260, 300);
    if (saved) win.setBounds(saved);
    mini = false;
  }
  return mini;
});

app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
