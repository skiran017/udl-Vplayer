import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from '../Header/Header';

function Home() {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={'1fr 4fr 0.4fr'}
      gridTemplateColumns={'0.6fr 4fr'}
      h="100vh"
      w={'full'}
    >
      <GridItem p={'12px 24px'} area={'header'}>
        <Header />
      </GridItem>
      <GridItem p={'12px 24px'} borderRight="1px solid #ccc" area={'nav'}>
        Nav
      </GridItem>
      <GridItem p={'12px 24px'} area={'main'}>
        Main
      </GridItem>
      <GridItem p={'12px 24px'} area={'footer'}>
        Footer
      </GridItem>
    </Grid>
  );
}

export default Home;
