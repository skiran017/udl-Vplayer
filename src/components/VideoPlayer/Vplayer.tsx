import React from 'react';
import ReactPlayer from 'react-player';
import { Flex } from '@chakra-ui/react';

interface PlayerProps {
  txId: string;
}

const HOST_URL = 'https://www.arweave.net/';

function Vplayer({ txId }: PlayerProps) {
  // const txID = 'IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs';
  return (
    <Flex
      width={'full'}
      height={'full'}
      // ml={'30%'}
      // mt="20vh"
    >
      <ReactPlayer
        controls={true}
        light={true}
        playing={true}
        url={
          txId
            ? `${HOST_URL}${txId}`
            : 'https://www.youtube.com/watch?v=LXb3EKWsInQ'
        }
        height={'680px'}
        width={'70vw'}
        style={{
          border: '1px solid black',
          borderRadius: '6px',
        }}
      />
    </Flex>
  );
}

export default Vplayer;
