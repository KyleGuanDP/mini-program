// utils/storage.ts

type StorageKey = string

class UniStorage {
  set<T = any>(key: StorageKey, value: T): boolean {
    try {
      uni.setStorageSync(key, JSON.stringify(value))
      return true
    } catch (e) {
      console.error('【UniStorage:set】失败', e)
      return false
    }
  }

  get<T = any>(key: StorageKey, defaultValue: T | null = null): T | null {
    try {
      const data = uni.getStorageSync(key)
      return data ? JSON.parse(data) : defaultValue
    } catch (e) {
      console.error('【UniStorage:get】失败', e)
      return defaultValue
    }
  }

  remove(key: StorageKey): void {
    try {
      uni.removeStorageSync(key)
    } catch (e) {
      console.error('【UniStorage:remove】失败', e)
    }
  }

  clear(): void {
    try {
      uni.clearStorageSync()
    } catch (e) {
      console.error('【UniStorage:clear】失败', e)
    }
  }
}

const storage = new UniStorage()
export default storage
