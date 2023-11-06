import { Grid, GridItem } from '@chakra-ui/react'
import Header from '../../components/Header/Header'
import Nav from '../../components/Nav/Nav'
import Vplayer from '../../components/VideoPlayer/Vplayer'
import { useGlobalStore } from '../../store/globalStore'

function Home() {
  const searchInput = useGlobalStore((state) => state.searchInput)
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
        {searchInput ? (
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
        )}
      </GridItem>
      <GridItem p={'16px 24px'} area={'footer'}>
        Footer
      </GridItem>
    </Grid>
  )
}

export default Home
