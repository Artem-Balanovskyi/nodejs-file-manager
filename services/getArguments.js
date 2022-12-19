import { argv } from 'process';
import { showEnterNameMsg } from './showMsg.js';

export const getArguments = () => {
    return argv.slice(2)
        .filter((arg) => arg.startsWith('--'))
        .map((arg) => {
            const [key, value] = arg.split('=');
            return { key: key.replace('--', ''), value };
        });
};


export const getUserData = async () => {
    try {
        return {
            key: getArguments()[0].key,
            username: getArguments()[0].value
        }
    } catch (err) {
        showEnterNameMsg();
    }
}