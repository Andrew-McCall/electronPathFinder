const { app, BrowserWindow } = require('electron');

app.whenReady().then( () => {

    const mainWindow = new BrowserWindow({
        width:632,
        height:632,
        resizable:false,
        autoHideMenuBar: true,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
            nodeIntegrationInWorker: true
        },
        title:"Loading"
    });

    mainWindow.loadFile('main.html')

})