import { Flex, Text } from '@chakra-ui/react'
import { RiVideoUploadLine, RiHome3Line } from 'react-icons/ri'
import CustomNavButton from './CustomNavButton'
import { useNavigate } from 'react-router-dom'

function Nav() {
  const navigate = useNavigate()
  return (
    <Flex direction="column">
      <CustomNavButton onClick={() => navigate('/')}>
        <RiHome3Line fontSize={'1.2rem'} />
        <Text>Home</Text>
      </CustomNavButton>
      <CustomNavButton onClick={() => navigate('/upload')}>
        <RiVideoUploadLine fontSize={'1.2rem'} />
        <Text>Upload</Text>
      </CustomNavButton>
    </Flex>
  )
}

export default Nav
