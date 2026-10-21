const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  toggleMini: () => ipcRenderer.invoke('toggle-mini')
});
