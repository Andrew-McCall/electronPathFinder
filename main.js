const { app, BrowserWindow } = require('electron');

app.whenReady().then( () => {

    const mainWindow = new BrowserWindow({
        width:612,
        height:612,
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