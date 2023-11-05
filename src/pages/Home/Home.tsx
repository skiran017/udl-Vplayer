import { Grid, GridItem } from '@chakra-ui/react'
import Header from '../../components/Header/Header'
import Nav from '../../components/Nav/Nav'
import { useLocation } from 'react-router-dom'
import Vplayer from '../../components/VideoPlayer/Vplayer'
import { useGlobalStore } from '../../store/globalStore'

function Home() {
  const location = useLocation()
  const searchInput = useGlobalStore((state) => state.searchInput)
  const renderer = useGlobalStore((state) => state.renderer)
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
        {renderer === 'vplayer' ? (
          // <Vplayer txId={searchInput} />
          <iframe
            src={`https://arweave.net/YHzqe3I-ACGTg5JvcY-vk7hogYh0z3yWRKxx--dCEt0/?tx=IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs`}
          ></iframe>
        ) : (
          <h1>Choose VPlayer Renderer to view the media</h1>
        )}
      </GridItem>
      <GridItem p={'16px 24px'} area={'footer'}>
        Footer
      </GridItem>
    </Grid>
  )
}

export default Home
