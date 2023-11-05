import { Flex, Text } from '@chakra-ui/react'
import { RiVideoUploadLine, RiHome3Line } from 'react-icons/ri'
import CustomNavButton from './CustomNavButton'

function Nav() {
  return (
    <Flex direction="column">
      <CustomNavButton href="#">
        <RiHome3Line fontSize={'1.2rem'} />
        <Text>Home</Text>
      </CustomNavButton>
      <CustomNavButton href="#">
        <RiVideoUploadLine fontSize={'1.2rem'} />
        <Text>Upload</Text>
      </CustomNavButton>
    </Flex>
  )
}

export default Nav
