import { queryAllTransactionsGQL } from 'arweavekit/graphql'
import { getContract, readContractState } from 'arweavekit/contract'
import { getTags } from '../queries'

const HOST_GATEWAY = 'https://gw.warp.cc/sonar/gateway/v2/contract'
const ID = 'IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs'
const DRE = 'https://dre-u.warp.cc/contract'

export async function queryTagsData(txId: string) {
  const tagsTxdata = getTags(txId)
  const tagsData = await queryAllTransactionsGQL(tagsTxdata, {
    gateway: 'arweave.net',
    filters: {
      count: 10
    }
  })
  console.log({ tagsData })
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
      remoteStateSyncSource: DRE
    }
  })

  console.log({ contractState })
}

// export async function vPlayerTxData() {
//   const data = await queryGQL(getVPlayerTransactions, {
//     gateway: 'arweave.net',
//     filters: {
//       count: 10,
//       name: 'Content-Type',
//       values: 'video/*',
//       // match: 'VPLAYER',
//     },
//   })
//   console.log({ data })
// }

export async function getContractTxData(txId: string) {
  const contractTxData = await getContract(txId)
    .then((res) => res.contract)
    .then((data) => data)

  console.log({ contractTxData })
}
