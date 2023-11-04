import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Menu,
  MenuItem,
  MenuButton,
  Button,
  MenuList
} from '@chakra-ui/react'
import { AiOutlineSearch, AiOutlineDown } from 'react-icons/ai'
import { MdOutlineSlowMotionVideo } from 'react-icons/md'
import { ConnectButton } from 'arweave-wallet-kit'

function Header() {
  // const id = 'IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs';

  return (
    <Flex w="full" justifyContent="space-between" alignItems="center">
      <Flex justifyContent="center" w="12%" alignItems="center">
        <MdOutlineSlowMotionVideo style={{ fontSize: '1.8rem', color: '#11999e' }} />
        <Text fontWeight={'bold'} fontSize="1.25rem" mx="6px">
          VPlayer
        </Text>
      </Flex>
      <Flex w="60%" justifyContent="space-evenly">
        <InputGroup w="70%">
          <Input
            type="text"
            placeholder="Search"
            borderRadius="18px"
            _focusVisible={{
              borderColor: '#11999e'
            }}
          />
          <InputRightElement pointerEvents="none">
            <AiOutlineSearch style={{ fontSize: '1.4rem' }} />
          </InputRightElement>
        </InputGroup>
        <Menu>
          <MenuButton as={Button} rightIcon={<AiOutlineDown />} variant={'outline'} color="white " borderRadius="18px">
            Choose Renderer
          </MenuButton>
          <MenuList fontWeight="semibold">
            <MenuItem as="a" href="#">
              VPlayer
            </MenuItem>
            <MenuItem as="a" href="#">
              Others
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <ConnectButton accent="#11999e" />
    </Flex>
  )
}

export default Header
