import { queryAllTransactionsGQL } from 'arweavekit/graphql'
import { getContract, readContractState } from 'arweavekit/contract'
import { getTags } from '../queries'
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature'
import { WarpFactory } from 'warp-contracts'
import { DeployPlugin } from 'warp-contracts-plugin-deploy'

// const HOST_GATEWAY = 'https://gw.warp.cc/sonar/gateway/v2/contract'
// const ID = 'IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs'
const DRE_U = 'https://dre-u.warp.cc/contract'
// const DRE_1 = 'https://dre-1.warp.cc/contract'

const warp = WarpFactory.forMainnet().use(new DeployPlugin())

export async function queryTagsData(txId: string) {
  const tagsTxdata = getTags(txId)
  const tagsData = await queryAllTransactionsGQL(tagsTxdata, {
    gateway: 'arweave.net',
    filters: {
      count: 10
    }
  })
  return tagsData
}

export async function contractStateFetcher(txId: string) {
  const contractState = await readContractState({
    environment: 'mainnet',
    contractTxId: txId,
    evaluationOptions: {
      allowBigInt: true,
      internalWrites: true,
      unsafeClient: 'skip',
      remoteStateSyncEnabled: true,
      remoteStateSyncSource: DRE_U
    }
  })

  return contractState
}

export async function createPairOnUcm() {
  const U = `KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw`
  const UCM = `tfalT8Z-88riNtoXdF5ldaBtmsfcSmbMqWLh2DHJIbg`
  const ASSET = `rC_7IMP3wbeEMeht1PjMsCy7VltXTZBii5FBUAKOxrE`

  const userSigner = new InjectedArweaveSigner(window.arweaveWallet)
  await userSigner.setPublicKey()

  const contract = await warp.contract(UCM)

  const res = await contract.connect(userSigner).writeInteraction({ function: 'addPair', pair: [ASSET, U] })
  console.log({ res })
}
export async function allowPairOnUcm() {
  const UCM = `tfalT8Z-88riNtoXdF5ldaBtmsfcSmbMqWLh2DHJIbg`
  const ASSET = `rC_7IMP3wbeEMeht1PjMsCy7VltXTZBii5FBUAKOxrE`

  const userSigner = new InjectedArweaveSigner(window.arweaveWallet)
  await userSigner.setPublicKey()

  const contract = await warp.contract(ASSET)

  const res = await contract.connect(userSigner).writeInteraction({ function: 'allow', target: UCM, qty: 5 })
  console.log({ res })
}

export async function getContractTxData(txId: string) {
  const contractTxData = await getContract(txId)
    .then((res) => res.contract)
    .then((data) => data)

  return contractTxData
}
