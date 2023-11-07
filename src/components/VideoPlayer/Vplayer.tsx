// import ReactPlayer from 'react-player'
import { Flex, FormLabel, Link, Tag, Text } from '@chakra-ui/react'
import { useGlobalStore } from '../../store/globalStore'
import { HOST_URL } from '../../utils/helpers/constants'
import { contractStateFetcher, queryTagsData } from '../../utils/helpers/getContractTxData'
import React from 'react'

const restrictedTags = [
  'ArweaveKit',
  'Name',
  'App-Name',
  'App-Version',
  'License',
  'Content-Type',
  'Contract-Src',
  'Init-State',
  'Signing-Client',
  'Signing-Client-Version'
]
const hiddenTags = [
  'ArweaveKit',
  'Name',
  'App-Name',
  'App-Version',
  'License',
  'Content-Type',
  'Contract-Src',
  'Init-State',
  'Signing-Client',
  'Signing-Client-Version',
  'Video',
  'Trailer',
  'Title',
  'Description',
  'Contract-Manifest'
]

function Vplayer() {
  // const txID = 'IL5nfhl96Tvhxq0GpV7opSbX88T2l5eFJDaNudORbDs'
  const [searchInput, activeAddress] = useGlobalStore((state) => [state.searchInput, state.activeAddress])
  const [tagData, setTagData] = useGlobalStore((state) => [state.tagData, state.setTagData])

  const [isLicensed, setisLicensed] = React.useState<boolean>(false)
  const [hasLicense, setHasLicense] = React.useState<boolean>(false)
  const [videoPlayerId, setVideoPlayerId] = React.useState<string>()
  const [videoId, setVideoId] = React.useState<string>()
  const [trailerId, setTrailerId] = React.useState<string>()
  const [title, setTitle] = React.useState<string>()
  const [description, setDescription] = React.useState<string>()

  async function tagsFetcher() {
    try {
      const data = await queryTagsData(searchInput)
      setTagData(data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getContractState() {
    try {
      const data = await contractStateFetcher(searchInput)
      console.log({ data })
      if (data && data?.readContract) {
        const validOwner = data?.readContract.cachedValue.state.balances.hasOwnProperty(activeAddress)
        setHasLicense(validOwner)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log({ hasLicense })
  console.log({ isLicensed })

  console.log({ tagData })

  async function normalisedTags() {
    let tags: any = []

    if (tagData) {
      tagData
        ?.at(0)
        //@ts-ignore
        ?.node.tags?.filter((tag: any) => !restrictedTags.includes(tag.name))
        .map((tag: any) => tags.push({ [tag.name]: tag.value }))

      const videoPlayerId = tags?.find((tag: any) => tag['Render-With'])
      setVideoPlayerId(videoPlayerId['Render-With'])

      const videoId = tags?.find((tag: any) => tag['Video'])
      setVideoId(videoId['Video'])

      const trailerId = tags?.find((tag: any) => tag['Trailer'])
      setTrailerId(trailerId['Trailer'])

      const title = tags?.find((tag: any) => tag['Title'])
      setTitle(title['Title'])
      const description = tags?.find((tag: any) => tag['Description'])
      setDescription(description['Description'])

      const licenseFee = tags?.find((tag: any) => tag['Commercial-Fee'])
      if (licenseFee) {
        setisLicensed(true)
      } else {
        setisLicensed(false)
      }
    } else {
      return
    }
  }

  React.useEffect(() => {
    if (searchInput.length > 10) {
      tagsFetcher()
      getContractState()
    }
  }, [searchInput])

  React.useEffect(() => {
    if (tagData && activeAddress) {
      normalisedTags()
    }
  }, [tagData, activeAddress])

  const video = `${HOST_URL}${videoPlayerId}/?tx=${videoId}`
  const trailer = `${HOST_URL}${videoPlayerId}/?tx=${trailerId}`
  return (
    <Flex height={'full'} direction="column">
      <Flex justifyContent="center" width={'full'} height="80%">
        {tagData && isLicensed ? (
          <Flex direction="column" width={'full'} alignItems="center">
            <iframe
              // src={`${HOST_URL}${txId}`}
              allowFullScreen={true}
              src={hasLicense ? video : trailer}
              height={'640px'}
              width={'90%'}
              style={{
                border: '1px solid black',
                borderRadius: '6px'
              }}
            />
            {!hasLicense ? (
              <Flex justifyContent="center" h="12%" alignItems="center">
                You don't have the license to watch the full video. Please purchase the license at&nbsp;
                <Link fontWeight={'bold'} href={`https://bazar.arweave.dev/#/asset/${searchInput}`} target="_blank">
                  {' '}
                  BazAR
                </Link>
              </Flex>
            ) : null}
          </Flex>
        ) : (
          <iframe
            src={`${HOST_URL}${searchInput}`}
            allowFullScreen={true}
            // src={video}
            height={'640px'}
            width={'90%'}
            style={{
              border: '1px solid black',
              borderRadius: '6px'
            }}
          />
        )}
      </Flex>
      <Flex direction="column" justifyContent="flex-start" wrap={'wrap'} height="10%" m="1rem 2rem">
        <Flex>
          <FormLabel fontSize={'1.2rem'}>Title:</FormLabel>
          <Text fontSize={'1.2rem'}>{title}</Text>
        </Flex>
        <Flex>
          <FormLabel fontSize={'1.2rem'}>Description:</FormLabel>
          <Text fontSize={'1.2rem'}>{description}</Text>
        </Flex>
      </Flex>
      <Flex wrap={'wrap'} maxH="10%" m="1rem 2rem">
        {searchInput &&
          tagData
            ?.at(0)
            //@ts-ignore
            ?.node.tags?.filter((tag: any) => !hiddenTags.includes(tag.name))
            .map((tag: any) => (
              <>
                <Tag mr={6} mb={3}>
                  {tag.name}: {tag.value}
                </Tag>
              </>
            ))}
      </Flex>
    </Flex>
  )
}

export default Vplayer
