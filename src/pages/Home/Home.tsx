import { Flex, Box, GridItem, Spinner } from '@chakra-ui/react'
import Vplayer from '../../components/VideoPlayer/Vplayer'
import { useGlobalStore } from '../../store/globalStore'

function Home() {
  const [searchInput, tagData, isLoading] = useGlobalStore((state) => [
    state.searchInput,
    state.tagData,
    state.isLoading
  ])
  return (
    <Box>
      <GridItem p={'16px 24px'} area={'main'}>
        {!isLoading ? (
          searchInput && tagData ? (
            <Vplayer />
          ) : (
            <>
              <h1>
                Enter a video media Transaction ID in the search bar to render the video using <strong>VPlayer </strong>
                Renderer.
              </h1>
              <br />
              <p>
                You can find VPlayer Permaweb Application at : <br />
                <i>https://arweave.net/YHzqe3I-ACGTg5JvcY-vk7hogYh0z3yWRKxx--dCEt0/</i>
              </p>
            </>
          )
        ) : (
          <Flex justifyContent="center" alignItems="center" h="full">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal" size="xl" />
          </Flex>
        )}
      </GridItem>
    </Box>
  )
}

export default Home
