import React from 'react';
import { Flex } from '@chakra-ui/react';
import { ConnectButton } from 'arweave-wallet-kit';

function Header() {
  return (
    <Flex w="full" justifyContent="flex-end">
      <ConnectButton accent="#11999e" />
    </Flex>
  );
}

export default Header;
