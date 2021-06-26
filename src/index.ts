import { readFileSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import electron from 'electron'
import locker from './lock'

const app = electron.app || (electron.remote && electron.remote.app)
const userDataPath = app?.getPath('userData') || path.join(__dirname, '..')
const configPath = path.join(userDataPath, 'config.json')
locker.lockDir = path.join(userDataPath, 'config.lock')

export default class storage {
  static waitUnlockTimes = 3
  static waitUnlockInterval = 100

  static async waitUnlock(): Promise<void> {
    return new Promise((resolve, reject) => {
      let times = this.waitUnlockTimes
      const timer = setInterval(async () => {
        if (times-- <= 0) {
          clearInterval(timer)
          reject(new Error('the file is locked'))
        } else {
          const isLocked = await locker.isLocked()
          if (!isLocked) {
            clearInterval(timer)
            resolve()
          }
        }
      }, this.waitUnlockInterval)
    })
  }

  static async readFile() {
    const str = await readFile(configPath, 'utf8').catch((error) => {
      if (error.code !== 'ENOENT') throw error
    })
    return str || '{}'
  }

  static async writeFile(str: string) {
    await writeFile(configPath, str, 'utf8').catch((error) => {
      throw error
    })
  }

  static async set(key: string, value: string | number | boolean) {
    const isLocked = await locker.isLocked()
    isLocked && (await this.waitUnlock())
    await locker.lock()
    const str = await this.readFile()
    const obj = JSON.parse(str)
    obj[key] = value
    const str2 = JSON.stringify(obj)
    await this.writeFile(str2)
    await locker.unlock()
  }

  static async get(key: string): Promise<string | number | boolean | undefined> {
    const str = await this.readFile()
    const obj = JSON.parse(str)
    return obj[key]
  }

  static async getSync(key: string): Promise<string | number | boolean | undefined> {
    const str = readFileSync(configPath, 'utf8') || '{}'
    const obj = JSON.parse(str)
    return obj[key]
  }

  static async remove(key: string) {
    const isLocked = await locker.isLocked()
    isLocked && (await this.waitUnlock())
    await locker.lock()
    const str = await this.readFile()
    const obj = JSON.parse(str)
    delete obj[key]
    const str2 = JSON.stringify(obj)
    await this.writeFile(str2)
    await locker.unlock()
  }

  static async clear() {
    const isLocked = await locker.isLocked()
    isLocked && (await this.waitUnlock())
    await locker.lock()
    await this.writeFile('{}')
    await locker.unlock()
  }
}
