import React from 'react'
import {
  Avatar,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  Text,
  Button,
  MenuItem,
  MenuList,
  MenuDivider
} from '@chakra-ui/react'
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { MdOutlineSlowMotionVideo } from 'react-icons/md'
import { useGlobalStore } from '../../store/globalStore'
import CustomButton from '../CustomButton/CustomButton'
import { getUserBalanceInAR } from '../../lib/actions/arconnect'

function Header() {
  // const id = 'IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs';
  const [userAddress, setUserAddress] = React.useState<string>('')
  const [userBalance, setUserBalance] = React.useState<number | undefined>()

  const [searchInput, setSearchInput, connect, disconnect] = useGlobalStore((state) => [
    state.searchInput,
    state.setSearchInput,
    state.connect,
    state.disconnect
  ])

  const [isConnected, setIsConnected] = useGlobalStore((state) => [state.isConnected, state.setIsConnected])

  async function getUserAddress() {
    try {
      const userActiveAddress = await window.arweaveWallet.getActiveAddress()
      setUserAddress(userActiveAddress)
    } catch (error) {
      console.log(error)
    }
  }

  async function getBalance() {
    const balance = await getUserBalanceInAR(userAddress)
    setUserBalance(balance)
  }

  function handleSearch(evt: any) {
    setSearchInput(evt.target.value)
  }

  React.useEffect(() => {
    connectOptimistically()
  }, [])

  React.useEffect(() => {
    if (isConnected) {
      getUserAddress()
    }
    if (userAddress) {
      getBalance()
    }
  }, [isConnected])

  async function connectOptimistically() {
    const permissions = await window.arweaveWallet.getPermissions()
    if (permissions.length > 0) {
      setIsConnected(true)
    }
  }

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
            onChange={handleSearch}
            value={searchInput}
          />
          <InputRightElement
            _hover={{
              cursor: 'pointer',
              background: 'whitesmoke',
              borderRadius: '50%'
            }}
            mr="2rem"
            display={!searchInput ? 'none' : undefined}
            onClick={() => setSearchInput('')}
          >
            <AiOutlineClose fontSize="1.4rem" />
          </InputRightElement>
          <InputRightElement
            _hover={{
              cursor: 'pointer'
            }}
          >
            <AiOutlineSearch fontSize="1.4rem" />
          </InputRightElement>
        </InputGroup>
        <Flex alignItems="center" justifyContent="space-evenly" w="20%">
          <CustomButton
            handleClick={connect}
            title={
              isConnected && userAddress ? userAddress.slice(0, 5) + '...' + userAddress?.slice(38, 42) : 'Connect'
            }
          />
          {isConnected && userAddress && (
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar size={'sm'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
              </MenuButton>
              <MenuList>
                <MenuItem pointerEvents="none">Balance : {userBalance} AR</MenuItem>
                <MenuDivider />
                <MenuItem onClick={disconnect}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
