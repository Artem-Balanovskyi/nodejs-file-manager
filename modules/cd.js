import { setCurrentDir } from '../services/currentDir.js';
import { showOperationFailMsg } from '../services/showMsg.js';
import { pathValidation } from '../services/validationChecks.js';

export const cd = async ([pathToDir]) => {
    try {
        pathToDir = pathValidation(pathToDir);
        await setCurrentDir(pathToDir);
    } catch (err) {
        showOperationFailMsg('cd', err);
    }
}