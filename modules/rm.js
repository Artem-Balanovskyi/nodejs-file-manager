import { rm as removeFile } from "fs";
import { showOperationFailMsg } from "../services/showMsg.js";
import { pathValidation } from "../services/validationChecks.js";

export const rm = ([pathToFile]) => {
    try {
        return new Promise((res) => {
            pathToFile = pathValidation(pathToFile);
            removeFile(pathToFile, (err) => {
                if (err) {
                    res(showOperationFailMsg('rm', err))
                } else {
                    console.log('File has been deleted successfully');
                    res()
                }
            })
        })
    } catch (err) {
        showOperationFailMsg('rm', err);
    }
}

