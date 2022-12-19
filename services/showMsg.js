import { EOL } from 'os';
import { getCurrentDir } from './currentDir.js';

const getColouredLine = (text) => {
    console.log('\x1b[1;34m' + text + '\x1b[0m');
}

export const getRedLine = (text) => {
    console.log('\x1b[1;31m' + text + '\x1b[0m');
}

export const getGreenLine = (text) => {
    console.log('\x1b[1;32m' + text + '\x1b[0m');
}

export const getUnderscoredLine = (text) => {
    console.log('\x1b[4;37m' + text + '\x1b[0m');
}

export const showCurrentDir = () => getUnderscoredLine(`You are currently in \x1b[1;33m${getCurrentDir()}\x1b[0m`);

export const showEnterNameMsg = () => {
    getColouredLine('Please enter user name (--username=your_name)');
};

export const showInvalidInputMsg = () => getRedLine('Invalid input');

export const showWelcomeMsg = (username) => {
    getColouredLine(`Welcome to the File Manager, ${username}!`);
    showCurrentDir();
}

export const showThanksMsg = (username) => getColouredLine(`Thank you for using File Manager, ${username}, goodbye!`);

export const showOperationFailMsg = (operation, err) => {
    console.log(`\x1b[1;31m${operation}: Operation failed\x1b[0m` + EOL + `${err.message}`);
}