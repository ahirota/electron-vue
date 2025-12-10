import osUtils from 'os-utils';
import os from 'os';
import fs from 'fs';
import path from 'path';
import {app} from 'electron';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './util.js';
import readLastLines from 'read-last-lines';

export function watchLog() {
    return fs.watch(path.join(app.getAppPath(),'/src/electron/testFile.txt'), async (eventType, Filename) => {
        if (eventType == 'change') {
            const line = await readLastLines.read(path.join(app.getAppPath(),'/src/electron/testFile.txt'),1);
            console.log(`Last Line: ${line}`);
        }
    }); 
}


