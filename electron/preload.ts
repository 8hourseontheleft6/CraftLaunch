import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),

  // launcher
  scanVersions: () => ipcRenderer.invoke('scan-versions'),
  getMinecraftDir: () => ipcRenderer.invoke('get-minecraft-dir'),
  selectMinecraftDir: () => ipcRenderer.invoke('select-minecraft-dir'),
  launchGame: (version: string) => ipcRenderer.invoke('launch-game', version),
});
