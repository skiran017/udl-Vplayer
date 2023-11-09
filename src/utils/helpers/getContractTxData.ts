import { queryAllTransactionsGQL } from 'arweavekit/graphql'
import { getContract, readContractState } from 'arweavekit/contract'
import { getTags } from '../queries'
import { DRE_U } from './constants'

// const HOST_GATEWAY = 'https://gw.warp.cc/sonar/gateway/v2/contract'
// const ID = 'IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs'
// const DRE_1 = 'https://dre-1.warp.cc/contract'

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

export async function getContractTxData(txId: string) {
  const contractTxData = await getContract(txId)
    .then((res) => res.contract)
    .then((data) => data)

  return contractTxData
}
