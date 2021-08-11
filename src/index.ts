import { readFileSync, writeFileSync } from 'fs'
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

  static timer?: NodeJS.Timeout
  static saveMap = new Map<string, string | number | boolean>()
  static removeKeySet = new Set<string>()

  private static async waitUnlock(): Promise<void> {
    return new Promise((resolve, reject) => {
      let times = this.waitUnlockTimes
      const timer = setInterval(() => {
        if (times-- <= 0) {
          clearInterval(timer)
          reject(new Error('the file is locked'))
        } else {
          const isLocked = locker.isLocked()
          if (!isLocked) {
            clearInterval(timer)
            resolve()
          }
        }
      }, this.waitUnlockInterval)
    })
  }

  private static readFileSync() {
    let str = '{}'
    try {
      str = readFileSync(configPath, 'utf8')
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }
    return str
  }

  private static update() {
    if (this.timer) return

    this.timer = setTimeout(async () => {
      const isLocked = locker.isLocked()
      isLocked && (await this.waitUnlock())

      this.timer = undefined

      locker.lock()
      const str = this.readFileSync()
      const obj = JSON.parse(str)
      this.removeKeySet.forEach((key) => delete obj[key])
      this.removeKeySet.clear()
      this.saveMap.forEach((value, key) => (obj[key] = value))
      this.saveMap.clear()
      const str2 = JSON.stringify(obj)
      writeFileSync(configPath, str2)
      locker.unlock()
    })
  }

  static set(key: string, value: string | number | boolean) {
    this.saveMap.set(key, value)
    this.update()
  }

  static get(key: string): string | number | boolean | undefined {
    if (this.saveMap.has(key)) return this.saveMap.get(key)
    if (this.removeKeySet.has(key)) return

    const str = this.readFileSync()
    const obj = JSON.parse(str)
    return obj[key]
  }

  static remove(key: string) {
    this.saveMap.delete(key)
    this.removeKeySet.add(key)
    this.update()
  }

  static clear() {
    this.saveMap.clear()
    const str = this.readFileSync()
    const obj = JSON.parse(str)
    Object.keys(obj).forEach((key) => this.removeKeySet.add(key))
    this.update()
  }
}
