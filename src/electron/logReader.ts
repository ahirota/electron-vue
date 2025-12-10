import fs from 'fs';
import path from 'path';
import {app} from 'electron';
import readLastLines from 'read-last-lines';

export function watchLog() {
    return fs.watch(path.join(app.getAppPath(),'/src/electron/testFile.txt'), async (eventType, Filename) => {
        if (eventType == 'change') {
            const line = await readLastLines.read(path.join(app.getAppPath(),'/src/electron/testFile.txt'),1);
            console.log(`Last Line: ${line}`);
        }
    }); 
}


