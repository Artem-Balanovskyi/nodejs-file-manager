import { cp } from "./cp.js";
import { rm } from "./rm.js";
import { showOperationFailMsg } from "../services/showMsg.js";

export const mv = ([pathToFile, pathToNewDir]) => {
    try {
        return new Promise((res) => {
            cp([pathToFile, pathToNewDir]).then((result) => {
                if (result) res(result);
                else res(rm([pathToFile]))
            })
        })
    } catch (err) {
        showOperationFailMsg('mv', err);
    }
}
