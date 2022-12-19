import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { showOperationFailMsg, getGreenLine, getRedLine } from '../services/showMsg.js';

export const os = ([params]) => {
    try {
        return new Promise( async (res) => {
            let param = params.slice(2);
            switch (param) {
                case 'architecture': {
                    res(getGreenLine(`${param}: ${arch()}`));
                    break;
                }
                case 'cpus': {
                    const allCpus = cpus();
                    
                    let data = await Promise.all(allCpus.map(({ speed, model }) => {
                        const speedGHz = (speed / 1000).toFixed(2);
                        return { model, speed: `${speedGHz}GHz`};
                    }))

                    res(getGreenLine(`os cpus total count: ${allCpus.length}`), console.table(data));
                    break;
                }
                case 'EOL': {
                    res(getGreenLine(`os ${param}: ${JSON.stringify(EOL)}`));
                    break;
                }
                case 'homedir': {
                    res(getGreenLine(`os ${param}: ${homedir()}`));
                    break;
                }
                case 'username': {
                    res(getGreenLine(`${param}: ${userInfo().username}`));
                    break;
                }
                default: {
                    res(getRedLine(`os: Operation failed`));
                }
            }

        })
    } catch (err) {
        showOperationFailMsg('os', err);
    }
}