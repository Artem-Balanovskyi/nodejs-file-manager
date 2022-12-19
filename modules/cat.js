import { createReadStream } from "fs";
import { showOperationFailMsg, getGreenLine } from "../services/showMsg.js";
import { pathValidation } from "../services/validationChecks.js";

export const cat = ([pathToFile]) => {
    try {
        return new Promise((res) => {
            pathToFile = pathValidation(pathToFile);
            const rs = createReadStream(pathToFile, { flags: 'r' });
            rs.on("data", data => {
                res(getGreenLine(data.toString()));
            })
            rs.on('error', (err) => {
                res(showOperationFailMsg('cat', err));
            })
        })
    } catch (err) {
        showOperationFailMsg('cat', err);
    }
}