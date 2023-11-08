import { Grid, GridItem } from '@chakra-ui/react'
import Header from './Header/Header'
import Nav from './Nav/Nav'
import Footer from './Footer'

function Layout({ children }: any) {
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
        {children}
      </GridItem>
      <GridItem p={'2px 24px'} area={'footer'}>
        <Footer />
      </GridItem>
    </Grid>
  )
}

export default Layout
