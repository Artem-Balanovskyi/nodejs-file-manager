import { access, stat } from 'fs/promises'
import { resolve, isAbsolute, join } from 'path'
import { getCurrentDir } from './currentDir.js';
import { showOperationFailMsg } from './showMsg.js';

export const pathValidation = (path) => {
  try {
    return path = isAbsolute(path) ? path : join(getCurrentDir(), path);
  } catch(err) {
    showOperationFailMsg('pathValidation', err);
  }
}

export const isExists = async (path) => {
  try {
    await access(path)
    return true
  } catch (error) {
    return false
  }
}

export const isDirectory = async (path) => {
  try {
    path = resolve(path)
    const stats = await stat(path)
    return stats.isDirectory()
  } catch (error) {
    return false
  }
}

export const isFile = async (path) => {
  try {
    path = resolve(path)
    const stats = await stat(path)
    return stats.isFile()
  } catch (error) {
    return false
  }
}