import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { getCurrentDir } from '../services/currentDir.js';
import { showOperationFailMsg } from '../services/showMsg.js';

export const ls = async () => {
    try {
        const allFiles = await readdir(getCurrentDir());

        let data = await Promise.all(allFiles.map(async (fileName) => {
            try {
                const isFile = (await stat(join(getCurrentDir(), fileName))).isFile();
                return {
                    type: isFile ? 'File' : 'Directory',
                    name: fileName,
                };
            } catch (err) {
                return {
                    type: err.message,
                    name: fileName,
                };
            }
        }));

        data.sort((a, b) => a.type > b.type ? 1 : -1);
        console.table(data);
    } catch (err) {
        showOperationFailMsg('ls', err);
    }
};