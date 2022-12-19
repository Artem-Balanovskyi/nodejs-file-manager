import { homedir } from 'os';
import { isDirectory } from "./validationChecks.js";
import { getRedLine, showOperationFailMsg } from './showMsg.js';
import { join, isAbsolute } from 'path';

export let currentDir = homedir();

export const getCurrentDir = () => {
    return currentDir;
}

export const setCurrentDir = async (path) => {
    try {
        const pathIsDir = await isDirectory(path);

        if (!pathIsDir) {
            getRedLine('This is not a directory.');
            return;
        }

        if (path.toLowerCase().startsWith('c:')) {
            return currentDir = isAbsolute(path) ? path : join(getCurrentDir(), path);
        } else {
            getRedLine('Working directory can not be changed. (Only disk [C:])');
        }
    } catch (err) {
        showOperationFailMsg('setCurrentDir', err);
    }
}