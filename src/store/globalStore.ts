import { create } from 'zustand'
import { handleConnect, handleDisconnect } from '../lib/actions/arconnect'

interface GlobalStore {
  searchInput: string
  isConnected: boolean | undefined
  isLoading: boolean
  activeAddress: string
  tagData: [] | null
  assetQty: number
  assetTxId: string
  setSearchInput: (txId: string) => void
  setIsConnected: (status: boolean | undefined) => void
  setIsLoading: (status: boolean) => void
  setActiveAddress: (address: string) => void
  setTagData: (data: any) => void
  setAssetQty: (qty: number) => void
  setAssetTxId: (assetTxId: string) => void
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  searchInput: '',
  isConnected: false,
  isLoading: false,
  activeAddress: '',
  tagData: [],
  assetQty: 1,
  assetTxId: '',
  setSearchInput: (txId: string) => set({ searchInput: txId }),
  setIsConnected: (status: boolean | undefined) => set({ isConnected: status }),
  setIsLoading: (status: boolean) => set({ isLoading: status }),
  setActiveAddress: (address: string) => set({ activeAddress: address }),
  setTagData: (data: any) => set({ tagData: data }),
  setAssetQty: (qty: number) => set({ assetQty: qty }),
  setAssetTxId: (assetTxId: string) => set({ assetTxId: assetTxId }),
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
