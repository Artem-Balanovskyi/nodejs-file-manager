import { createHash } from "crypto";
import { createReadStream } from "fs";
import { pathValidation } from "../services/validationChecks.js";
import { showOperationFailMsg } from "../services/showMsg.js";
import { isExists } from "../services/validationChecks.js";

export const hash = async ([pathToFile]) => {
    try {
        pathToFile = pathValidation(pathToFile);
        await isExists(pathToFile);
        return new Promise((res) => {
            const hash = createHash("sha256");
            const rs = createReadStream(pathToFile);
            rs.on("data", (data) => hash.update(data));
            rs.on("end", () => res(hash.digest("hex")));
            rs.on('error', (err) => res(showOperationFailMsg('calcHash', err)));
        });
    } catch (err) {
        showOperationFailMsg('calcHash', err);
    }
}