import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { promises as fs } from 'node:fs'
//import util from 'node:util' //for promisifying callback based function into async/await

const require = createRequire(import.meta.url)

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'), //was preload.mjs for some reason
      // devTools: false
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//CUSTOM START
// IPC listener to read file
ipcMain.handle('read-file', async (event, filePath: string): Promise<string> => {
  try {
    //const content: any = await fs.readFile(filePath, () => {}); //couldnt manage to provide utf-8, but had to provide callback even tho i can await ... - i dont understand fully
    //const content = fs.readFileSync(filePath, 'utf-8');
    // const content: any = await fs.readFile(filePath, 'utf-8');
    const content = await fs.readFile(filePath, 'utf-8');

    // await delay(2000);
    // promise and await is working fine - the only problem was that printing to the website took pretty long
    // what is also the action that caused the lag

    // console.log("TEST") //is logged to local console - console.log in main world does log to browser console

    return content;
  } catch (error: any) { //i have to define any -> to conform to typescript for some reason
    throw new Error('Failed to read file: ' + error.message);
  }
});
//CUSTOM END

app.whenReady().then(createWindow)