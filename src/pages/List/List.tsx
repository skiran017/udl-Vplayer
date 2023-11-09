import React from 'react'
import { Input, Button, Flex, Text, FormLabel } from '@chakra-ui/react'
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature'
import { WarpFactory } from 'warp-contracts'
import { DeployPlugin } from 'warp-contracts-plugin-deploy'
import { U, UCM } from '../../utils/helpers/constants'
import { useGlobalStore } from '../../store/globalStore'

function List() {
  const warp = WarpFactory.forMainnet().use(new DeployPlugin())

  const isConnected = useGlobalStore((state) => state.isConnected)

  const [assetTxId, setAssetTxId] = React.useState('')
  const [assetQty, setAssetQty] = React.useState(1)

  function handleAssetInputChange(e: any) {
    setAssetTxId(e.target.value)
  }
  function handleAssetQtyChange(e: any) {
    setAssetQty(e.target.value)
  }

  async function createPair() {
    const userSigner = new InjectedArweaveSigner(window.arweaveWallet)
    await userSigner.setPublicKey()

    const contract = await warp.contract(UCM)

    const res = await contract.connect(userSigner).writeInteraction({ function: 'addPair', pair: [assetTxId, U] })
    console.log({ res })
  }
  async function allowPair() {
    const userSigner = new InjectedArweaveSigner(window.arweaveWallet)
    await userSigner.setPublicKey()

    const contract = await warp.contract(assetTxId)

    const res = await contract.connect(userSigner).writeInteraction({ function: 'allow', target: UCM, qty: assetQty })
    console.log({ res })
  }
  return (
    <>
      <Flex h="full" gap={6} direction="column" alignItems="center">
        <Flex>
          <FormLabel>UCM Contract : </FormLabel>
          <Text>tfalT8Z-88riNtoXdF5ldaBtmsfcSmbMqWLh2DHJIbg</Text>
        </Flex>
        <Flex>
          <FormLabel>U Contract : </FormLabel>
          <Text>KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw</Text>
        </Flex>
        <Flex>
          <p>
            To be able to list the license as an atomic asset and make it tradable on
            <strong>
              <a href="https://bazar.arweave.dev/" target="_blank">
                &nbsp;BazAR
              </a>
            </strong>
          </p>
        </Flex>
        <Flex>
          <ol
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '1.2rem 1.2rem'
            }}
          >
            <li>Add Asset Pair to UCM contract</li>
            <Flex direction="column" my="1rem" w="full">
              <FormLabel>Asset TxId : </FormLabel>
              <Input value={assetTxId} onChange={handleAssetInputChange} placeholder="enter asset txId" />
            </Flex>
            {isConnected ? (
              <Button onClick={createPair} mb="1rem">
                Add pair
              </Button>
            ) : (
              <Button disabled mb="1rem">
                Connect Wallet
              </Button>
            )}

            <li>Allow Asset Pair to be tradable on UCM</li>
            <Flex direction="column" my="1rem" w="full">
              <FormLabel>Quantity : </FormLabel>
              <Input
                value={assetQty}
                onChange={handleAssetQtyChange}
                type="number"
                min={1}
                placeholder="enter qty. of tradable atomic asset"
              />
            </Flex>
            {isConnected ? (
              <Button onClick={allowPair} mb="1rem">
                Allow pair
              </Button>
            ) : (
              <Button disabled mb="1rem">
                Connect Wallet
              </Button>
            )}
          </ol>
        </Flex>
      </Flex>
    </>
  )
}

export default List
