import { Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { MdOutlineSlowMotionVideo } from 'react-icons/md'
import { useGlobalStore } from '../../store/globalStore'

function Header() {
  // const id = 'IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs';
  const [searchInput, setSearchInput] = useGlobalStore((state) => [state.searchInput, state.setSearchInput])

  function handleSearch(evt: any) {
    setSearchInput(evt.target.value)
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
      </Flex>
    </Flex>
  )
}

export default Header
