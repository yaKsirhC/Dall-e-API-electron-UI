const path = require('path')
const {app, BrowserWindow} = require('electron')

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'SysInfo',
        width: 500,
        height: 500,
        resizable: true,
        webPreferences:{
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, './preload.js')
        }
    })

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
}

app.whenReady().then(() => {
    createMainWindow()
})