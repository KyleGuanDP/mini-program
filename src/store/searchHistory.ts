import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchHistoryStore = defineStore(
  'searchHistory',
  () => {
    const syfcHistoryList = ref([])
    const addHistory = (keyword: string) => {
      keyword = keyword.trim()
      if (!keyword) return
      const existing = syfcHistoryList.value.filter((item) => item !== keyword)
      syfcHistoryList.value = [keyword, ...existing].slice(0, 10)
    }

    const clearHistory = () => {
      syfcHistoryList.value = []
    }
    return {
      syfcHistoryList,
      addHistory,
      clearHistory,
    }
  },
  {
    persist: true,
  },
)
