import { existsSync, mkdirSync, rmSync } from 'fs'

let isLocked4Process = false

export default class locker {
  static lockDir = 'config.lock'

  static isLocked() {
    return existsSync(this.lockDir)
  }

  static lock() {
    isLocked4Process = !!mkdirSync(this.lockDir, { recursive: true })
  }

  static unlock() {
    if (isLocked4Process) {
      rmSync(this.lockDir, { recursive: true, force: true })
      isLocked4Process = false
    }
  }
}

process.on('exit', () => locker.unlock())
