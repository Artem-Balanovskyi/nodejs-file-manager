import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output, argv } from 'process';
import { getUserData } from './services/getArguments.js';
import { getParsedLine } from './services/getParsedLine.js';
import { showCurrentDir, showEnterNameMsg, showWelcomeMsg, showThanksMsg, showInvalidInputMsg } from './services/showMsg.js';
import { getCurrentDir } from './services/currentDir.js';
import { up, cat, add, rn, cp, mv, rm, ls, cd, hash, os, zip } from './modules/modulesConnector.js';


if (!argv[2]) {
    showEnterNameMsg();
    process.exit();
} else {
    let { key, username } = await getUserData();

    if (key !== 'username' || username === '') {
        showEnterNameMsg();
        process.exit();
    } else {
        username = username[0].toUpperCase() + username.slice(1);
        showWelcomeMsg(username);

        const rl = createInterface({ input, output });

        rl.on("line", async (line) => {
            const { command, params } = await getParsedLine(line);
            let promise;
            switch (command) {
                case 'cat':
                    promise = cat(params);
                    break;
                case 'add':
                    promise = add(params);
                    break;
                case 'rn':
                    promise = rn(params);
                    break;
                case 'cp':
                    promise = cp(params);
                    break;
                case 'mv':
                    promise = mv(params)
                    break;
                case 'rm':
                    promise = rm(params);
                    break;
                case 'hash':
                    promise = hash(params);
                    break;
                case 'os':
                    promise = os(params);
                    break;
                case 'compress':
                    promise = zip('compress', params);
                    break;
                case 'decompress':
                    promise = zip('decompress', params);
                    break;
                case 'ls':
                    promise = ls(getCurrentDir());
                    break;
                case 'cd':
                    await cd(params);
                    promise = new Promise((res) => res());
                    break;
                case 'up':
                    await up();
                    promise = new Promise((res) => res());
                    break;
                case '.exit':
                    rl.close();
                    break;
                default:
                    promise = new Promise((resolve) => {
                        resolve(showInvalidInputMsg());
                    });
                    break;
            }
            if (!promise) return;
            promise.then(result => {
                if (result) console.log(`${result}`);
                showCurrentDir();
            })
        })
        rl.on('close', () => showThanksMsg(username));
    }
}

