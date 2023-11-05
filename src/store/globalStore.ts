import { create } from 'zustand'
import { handleConnect, handleDisconnect } from '../lib/actions/arconnect'

interface GlobalStore {
  searchInput: string
  isConnected: boolean | undefined
  setSearchInput: (txId: string) => void
  setIsConnected: (status: boolean | undefined) => void
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  searchInput: '',
  isConnected: false,
  setSearchInput: (txId: string) => set({ searchInput: txId }),
  setIsConnected: (status: boolean | undefined) => set({ isConnected: status }),
  connect: async () => {
    const connected = await handleConnect()

    if (connected) {
      set({
        isConnected: true
      })
    }
  },
  disconnect: async () => {
    const disconnected = await handleDisconnect()

    if (disconnected) {
      set({
        isConnected: false
      })
    }
  }
}))
