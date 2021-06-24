import fs from 'fs'
import { access, mkdir, rmdir } from 'fs/promises'

let isLocked4Process = false

export default class locker {
  static lockDir = 'config.lock'

  static async isLocked() {
    let isLocked = true
    await access(this.lockDir).catch(() => {
      isLocked = false
    })
    return isLocked
  }

  static async lock() {
    let isLocked = true
    await mkdir(this.lockDir).catch((error) => {
      isLocked = false
      console.error(error)
    })
    isLocked4Process = isLocked
    return isLocked
  }

  static async unlock() {
    if (isLocked4Process) {
      await rmdir(this.lockDir).catch((error) => {
        console.error(error)
      })
      isLocked4Process = false
    }
  }
}

process.on('exit', () => isLocked4Process && fs.rmdirSync(locker.lockDir))
