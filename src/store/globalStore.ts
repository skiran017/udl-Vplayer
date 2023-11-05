import { create } from 'zustand'

interface GlobalStore {
  searchInput: string
  setSearchInput: (txId: string) => void
}

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  searchInput: '',
  setSearchInput: (txId: string) => set({ searchInput: txId })
}))
