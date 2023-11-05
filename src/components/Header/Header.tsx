import React from 'react'
import { Flex, Input, InputGroup, InputRightElement, Text, Select, chakra } from '@chakra-ui/react'
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { MdOutlineSlowMotionVideo } from 'react-icons/md'
import { ConnectButton } from 'arweave-wallet-kit'
import { useGlobalStore } from '../../store/globalStore'

function Header() {
  // const id = 'IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs';
  const [searchInput, setSearchInput] = useGlobalStore((state) => [state.searchInput, state.setSearchInput])
  const [renderer, setRenderer] = React.useState()

  const rendererOptions = [
    {
      VPlayer: '/vplayer'
    },
    {
      Youtube: '/youtube'
    },
    {
      Others: '/others'
    }
  ]

  function handleSearch(evt: any) {
    setSearchInput(evt.target.value)
  }

  function selectRendererChange(e: any) {
    setRenderer(e.target.value)
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
        <Select
          w="20%"
          borderRadius={'16px'}
          _focusVisible={{
            borderColor: '#11999e'
          }}
          placeholder="Choose renderer"
          onChange={(e) => selectRendererChange(e)}
        >
          {rendererOptions.map((renderer, idx) => (
            <chakra.option value={Object.values(renderer)} key={idx}>
              {Object.keys(renderer)}
            </chakra.option>
          ))}
        </Select>
      </Flex>
      <ConnectButton accent="#11999e" />
    </Flex>
  )
}

export default Header
