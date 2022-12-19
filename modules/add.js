import { createWriteStream } from "fs";
import { join } from "path";
import { getCurrentDir } from "../services/currentDir.js";
import { showOperationFailMsg } from "../services/showMsg.js";

export const add = ([newFileName]) => {
    try {
        return new Promise((res) => {
            const ws = createWriteStream(join(getCurrentDir(), newFileName), { flags: 'wx' });
            ws.on('error', (err) => res(showOperationFailMsg('add', err)));
            ws.on('close', () => res());
            ws.close();
        })
    } catch (err) {
        showOperationFailMsg('add', err);
    }
}