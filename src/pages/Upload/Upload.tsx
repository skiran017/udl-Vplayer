import { Box } from '@chakra-ui/react'
// import { allowPairOnUcm, createPairOnUcm } from '../../utils/helpers/getContractTxData'
import Inputform from '../../components/Inputform/Inputform'

function Upload() {
  // async function createPair() {
  //   const pairCreation = await createPairOnUcm()
  // }
  // async function allowPair() {
  //   const allowAsset = await allowPairOnUcm()
  // }
  return (
    <Box w="full">
      {/* <Button onClick={createPair}>add pair</Button>
      <Button onClick={allowPair}>allow asset</Button> */}
      <Inputform />
    </Box>
  )
}

export default Upload
