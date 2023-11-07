import { Flex, Button } from '@chakra-ui/react'
import { allowPairOnUcm, createPairOnUcm } from '../../utils/helpers/getContractTxData'
function Upload() {
  async function createPair() {
    const pairCreation = await createPairOnUcm()
  }
  async function allowPair() {
    const allowAsset = await allowPairOnUcm()
  }
  return (
    <Flex>
      <Button onClick={createPair}>add pair</Button>
      <Button onClick={allowPair}>allow asset</Button>
    </Flex>
  )
}

export default Upload
