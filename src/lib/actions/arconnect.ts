import Arweave from 'arweave'

const ONE_AR = 1000000000000

const arweave = Arweave.init({
  host: 'arweave.net',
  protocol: 'https',
  logging: false
})

export async function handleConnect() {
  try {
    const permissions = await window.arweaveWallet.getPermissions()

    if (permissions.length > 0) {
      return true
    } else {
      await window.arweaveWallet.connect(
        ['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'ACCESS_PUBLIC_KEY', 'SIGNATURE', 'DISPATCH'],
        {
          name: 'VPlayer',
          logo: 'https://github.com/skiran017/vRenderer/assets/23178403/a7837e99-2e00-4b67-9f1e-1d09d4621bca'
        }
      )
      return true
    }
  } catch (error) {
    console.log(error)
  }
}

export async function handleDisconnect() {
  try {
    await window.arweaveWallet.disconnect()
    return true
  } catch (error) {
    console.log(error)

    return false
  }
}

export async function getActiveAddress() {
  try {
    return await window.arweaveWallet.getActiveAddress()
  } catch (error) {
    console.log(error)
  }
}

export async function getUserBalanceInAR(address: string) {
  try {
    const balanceInWinston = await arweave.wallets.getBalance(address)

    const balanceInAR = +balanceInWinston / ONE_AR
    return balanceInAR
  } catch (error) {
    console.log(error)
  }
}
