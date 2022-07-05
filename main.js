const { app, BrowserWindow } = require('electron');

app.whenReady().then( () => {

    const mainWindow = new BrowserWindow({
        width:480,
        height:512,
        resizable:false,
        autoHideMenuBar: true,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
            nodeIntegrationInWorker: true
        },
        title:"Loading"
    });

    mainWindow.loadFile('home.html')

})