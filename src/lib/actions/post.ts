import { Asset } from '../../types/post'
import contractData from '../../utils/contractData.json'
import { createTransaction } from 'arweavekit/transaction'

const toArrayBuffer = async (file: any): Promise<ArrayBuffer> =>
  new Promise((resolve, _) => {
    const fr = new FileReader()
    fr.readAsArrayBuffer(file)
    fr.addEventListener('loadend', (e) => {
      resolve(e.target?.result as ArrayBuffer)
    })
  })

export async function postAsset(asset: Asset): Promise<string> {
  // const data: ArrayBuffer = await toArrayBuffer(asset.file);

  const blob = new Blob(['License File'], { type: 'text/plain;charset=utf-8' })
  const data = (await toArrayBuffer(blob)) as ArrayBuffer

  // array of input tags
  const inputTags: { name: string; value: string }[] = [
    // Content mime (media) type (For eg, "image/png")
    // { name: "Content-Type", value: asset.file.type },
    { name: 'Content-Type', value: blob.type },
    // { name: "Indexed-By", value: "ucm" },
    { name: 'License', value: 'yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8' },
    { name: 'Payment-Mode', value: 'Global-Distribution' },
    // Help network identify post as SmartWeave Contract
    { name: 'App-Name', value: 'SmartWeaveContract' },
    { name: 'App-Version', value: '0.3.0' },
    // Link post to contract source
    { name: 'Contract-Src', value: contractData.contractId },
    //tx id of VPlayer renderer
    { name: 'Render-With', value: 'YHzqe3I-ACGTg5JvcY-vk7hogYh0z3yWRKxx--dCEt0' },
    // Initial state for our post (as a contract instance)
    {
      name: 'Init-State',
      value: JSON.stringify({
        creator: asset.creatorId,
        owner: asset.creatorId,
        ticker: 'VPLAYER',
        balances: {
          // [asset.creatorId]: 10 //for licence
          [asset.creatorId]: 1 //for trailer/video,
        },
        // contentType: asset.file.type,
        contentType: blob.type,
        comments: [],
        likes: {}
      })
    },
    { name: 'Creator-Name', value: asset.creatorName },
    // Standard tags following ANS-110 standard for discoverability of asset
    { name: 'Creator', value: asset.creatorId },
    { name: 'Title', value: asset.title },
    { name: 'Description', value: asset.description },
    { name: 'Video', value: asset.videoTx },
    { name: 'Trailer', value: asset.trailerTx },

    // { name: "Type", value: "video" },
    // { name: "Type", value: "trailer" },
    { name: 'Type', value: 'license' }
  ]

  // adding hashtags passed in by users to the 'inputTags' array
  asset.tags.map((t) => {
    inputTags.push({ name: t.value, value: t.value })
  })

  if (asset.license === 'access') {
    inputTags.push({ name: 'Access', value: 'Restricted' }, { name: 'Access-Fee', value: 'One-Time-' + asset.payment })
  }
  if (asset.license === 'derivative') {
    inputTags.push(
      { name: 'Derivation', value: 'Allowed-with-license-fee' },
      { name: 'Derivation-Fee', value: 'One-Time-' + asset.payment }
    )
  }
  if (asset.license === 'commercial') {
    inputTags.push(
      { name: 'Commercial-Use', value: 'Allowed' },
      { name: 'Commercial-Fee', value: 'One-Time-' + asset.payment }
    )
  }

  const txn = await createTransaction({
    type: 'data',
    environment: 'mainnet',
    data: data,
    options: {
      tags: inputTags,
      signAndPost: true
    }
  })

  console.log('Transaction uploaded successfully', txn.transaction.id)

  return txn.transaction.id
}
