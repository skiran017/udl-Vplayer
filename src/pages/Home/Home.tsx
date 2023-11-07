import { Flex, Grid, GridItem, Spinner } from '@chakra-ui/react'
import Header from '../../components/Header/Header'
import Nav from '../../components/Nav/Nav'
import Vplayer from '../../components/VideoPlayer/Vplayer'
import { useGlobalStore } from '../../store/globalStore'

function Home() {
  const [searchInput, tagData, isLoading] = useGlobalStore((state) => [
    state.searchInput,
    state.tagData,
    state.isLoading
  ])
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={'0.5fr 4fr 0.2fr'}
      gridTemplateColumns={'0.6fr 4fr'}
      h="100vh"
      w={'full'}
    >
      <GridItem p={'16px 24px'} area={'header'}>
        <Header />
      </GridItem>
      <GridItem p={'16px 24px'} borderRight="1px solid #ccc" area={'nav'}>
        <Nav />
      </GridItem>
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
      <GridItem p={'2px 24px'} area={'footer'}>
        <Flex justifyContent="center" alignItems="center">
          Powered By{' '}
          <span style={{ margin: '0 6px' }}>
            <img src="https://www.arweave.org/favicon-183x183.png" width="20px" alt="ar-logo" />
          </span>{' '}
          ARWEAVE{' '}
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Home
