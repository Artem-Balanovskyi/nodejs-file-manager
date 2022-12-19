import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from "fs";
import { sep, join } from 'path';
import { pathValidation, isFile, isExists } from '../services/validationChecks.js';
import { showOperationFailMsg, getRedLine } from '../services/showMsg.js';

export const zip = (operation, [arg1, arg2]) => {
    try {
        return new Promise(async (res) => {

            const pathToFile = pathValidation(arg1);
            const pathToDest = pathValidation(arg2);

            const isItFile = await isFile(pathToFile);
            const isItExists = await isExists(pathToDest);

            if (operation === undefined) {
                console.log(`operation:${operation}`)
                console.log('Type of operation has not been set');
                return;
            }

            if (pathToFile === undefined || !isItFile) {
                console.log('File path has not been set');
                return;
            }

            if (pathToDest === undefined || !isItExists) {
                console.log(`isExists: ${isItExists}`)
                console.log("File path for destination directory has not been set");
                return;
            }

            let fileName = pathToFile.split(sep).pop();
            fileName = fileName.endsWith('.br') ? fileName.slice(0, -3) : `${fileName}.br`;

            const rs = createReadStream(pathToFile, { flags: 'r' });
            rs.on('error', (err) => res(showOperationFailMsg('zip rs', err)));
            const ws = createWriteStream(join(pathToDest, fileName), { flags: 'wx' });
            ws.on('error', (err) => { res(showOperationFailMsg('zip ws', err)) });

            const zipOperation = operation === 'compress' ?
                createBrotliCompress() : operation === 'decompress' ?
                    createBrotliDecompress() : null;

            if (zipOperation) {
                rs.pipe(zipOperation.on('error', (err) => {
                    res(showOperationFailMsg(`${operation}`, err));
                })).pipe(ws);
                ws.on('finish', () => res())
            } else {
                res(getRedLine(`${operation}: Operation failed`));
            }
        })
    } catch (err) {
        showOperationFailMsg(`${operation}`, err);
    }
}