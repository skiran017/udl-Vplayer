import { Flex } from '@chakra-ui/react'

function Footer() {
  return (
    <Flex justifyContent="center" alignItems="center">
      Powered By{' '}
      <span style={{ margin: '0 6px' }}>
        <img src="https://www.arweave.org/favicon-183x183.png" width="20px" alt="ar-logo" />
      </span>{' '}
      ARWEAVE{' '}
    </Flex>
  )
}

export default Footer
