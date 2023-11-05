import { Grid, GridItem } from '@chakra-ui/react'
import Header from '../../components/Header/Header'
import Nav from '../../components/Nav/Nav'

function Home() {
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
        Main
      </GridItem>
      <GridItem p={'16px 24px'} area={'footer'}>
        Footer
      </GridItem>
    </Grid>
  )
}

export default Home
