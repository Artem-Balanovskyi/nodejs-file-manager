import { dirname } from 'path';
import { getCurrentDir, setCurrentDir } from '../services/currentDir.js';
import { showOperationFailMsg } from '../services/showMsg.js';

export const up = async () => {
    try {
        const upDir = dirname(getCurrentDir());
        await setCurrentDir(upDir);
    } catch (err) {
        showOperationFailMsg('up', err);
    }
}