// import ReactPlayer from 'react-player'
import { Flex } from '@chakra-ui/react'
import { useGlobalStore } from '../../store/globalStore'
import { HOST_URL, VPlayer_ID } from '../../utils/helpers/constants'

interface PlayerProps {
  txId?: string
}

function Vplayer({ txId }: PlayerProps) {
  // const txID = 'IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs'
  const searchInput = useGlobalStore((state) => state.searchInput)
  return (
    <Flex width={'full'} height={'full'} justifyContent="center">
      <iframe
        // src={`${HOST_URL}${txId}`}
        allowFullScreen={true}
        src={`${HOST_URL}${VPlayer_ID}/?tx=${searchInput}`}
        height={'640px'}
        width={'90%'}
        style={{
          border: '1px solid black',
          borderRadius: '6px'
        }}
      />
    </Flex>
  )
}

export default Vplayer
