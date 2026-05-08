import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { scanVersions, launchGame, getMinecraftDir, setMinecraftDir } from './launcher.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 550,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('window-minimize', () => mainWindow?.minimize());
  ipcMain.on('window-maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
  ipcMain.on('window-close', () => mainWindow?.close());

  // launcher IPC
  ipcMain.handle('scan-versions', () => {
    return scanVersions();
  });

  ipcMain.handle('get-minecraft-dir', () => {
    return getMinecraftDir();
  });

  ipcMain.handle('select-minecraft-dir', async () => {
    console.log('[select-minecraft-dir] called, mainWindow:', !!mainWindow);
    const result = await dialog.showOpenDialog(mainWindow!, {
      properties: ['openDirectory'],
      title: '选择 .minecraft 文件夹',
    });
    if (result.canceled || result.filePaths.length === 0) {
      return { selected: false };
    }
    const dir = result.filePaths[0];
    // verify it has versions folder
    const versionsPath = path.join(dir, 'versions');
    if (!fs.existsSync(versionsPath)) {
      return { selected: false, error: '所选文件夹没有 versions 子目录, 不是有效的 .minecraft 文件夹' };
    }
    setMinecraftDir(dir);
    return { selected: true, path: dir, versions: scanVersions() };
  });

  ipcMain.handle('launch-game', async (_event, version: string) => {
    try {
      await launchGame(version);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || String(err) };
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
