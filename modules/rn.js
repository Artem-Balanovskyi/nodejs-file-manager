
import { rename } from "fs";
import { join, sep } from "path";
import { showOperationFailMsg } from "../services/showMsg.js";
import { pathValidation, isFile } from "../services/validationChecks.js";

export const rn = (params) => {
    try {
        return new Promise( async (res) => {
            let pathToFile = pathValidation(params[0]);
            let newFileName = (params[1]);
            let isItFile = await isFile(pathToFile);

            if (pathToFile === undefined || !isItFile) {
                console.log('File path has not been set');
                return;
            }

            if (newFileName === undefined) {
                console.log('File path for new file name has not been set');
                return;
            }

            const pathToDir = pathToFile.slice(0, pathToFile.lastIndexOf(sep));
            rename(pathToFile, join(pathToDir, newFileName), () => {
                console.log('File has been renamed successfully');
                res();
            })
        })
    } catch (err) {
        showOperationFailMsg('rn', err);
    }
}