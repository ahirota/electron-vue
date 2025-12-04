import {app, BrowserWindow} from 'electron';
import path from 'path';
import {isDev} from './util.js';
import { pollResources, getStaticData } from './resourceManager.js';

type test = string;

app.on('ready', () => {
    const mainWindow = new BrowserWindow({});
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123/');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-vue/index.html'));
    }

    pollResources();
});