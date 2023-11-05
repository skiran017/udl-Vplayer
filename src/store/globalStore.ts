import { create } from 'zustand'

interface GlobalStore {
  searchInput: string
  renderer: string
  setSearchInput: (txId: string) => void
  setRenderer: (permaAppId: string) => void
}

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  searchInput: '',
  renderer: '',
  setSearchInput: (txId: string) => set({ searchInput: txId }),
  setRenderer: (permaAppId: string) => set({ renderer: permaAppId })
}))
