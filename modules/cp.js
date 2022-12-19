import { createReadStream, createWriteStream } from "fs";
import { join, sep } from "path";
import { showOperationFailMsg } from "../services/showMsg.js";
import { pathValidation, isFile, isExists } from "../services/validationChecks.js";

export const cp = (params) => {
    try {
        return new Promise(async (res) => {
            const pathToFile = pathValidation(params[0]);
            const pathToNewDir = pathValidation(params[1]);

            const isItFile = await isFile(pathToFile);
            const isItExists = await isExists(pathToNewDir);

            if (pathToFile === undefined || !isItFile) {
                console.log('File path has not been set');
                return;
            }

            if (pathToNewDir === undefined || !isItExists) {
                console.log("File path for copy's directory has not been set");
                return;
            }

            const rs = createReadStream(pathToFile);
            rs.on("error", (err) => res(showOperationFailMsg('rs', err)));
            const fileName = pathToFile.slice(pathToFile.lastIndexOf(sep) + 1);
            const ws = createWriteStream(join(pathToNewDir, fileName));
            ws.on("error", (err) => res(showOperationFailMsg('ws', err)));
            rs.pipe(ws);
            rs.on('end', () => {
                console.log('File has been copied successfully');
                ws.close();
                res();
            });
        })
    } catch (err) {
        showOperationFailMsg('cp', err);
    }
}