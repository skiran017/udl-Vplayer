import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Textarea,
  FormLabel,
  FormControl,
  Input,
  Button,
  useToast,
  Flex,
  chakra,
  Spinner,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { postAsset } from '../../lib/actions/post'
import { useGlobalStore } from '../../store/globalStore'
import { Form, FormField, FormItem, FormMessage } from './customForm'
import { CustomSelect } from './select'

const formSchema = z.object({
  // image: imageSchema,
  // video: videoSchema,
  title: z.string(),
  creatorName: z.string().optional(),
  description: z.string().optional(),
  videoTx: z.string(),
  trailerTx: z.string(),
  license: z.string().optional(),
  payment: z.string().optional(),
  renderer: z.string().optional(),
  tags: z
    .array(
      z.object({
        value: z.string()
      })
    )
    .optional()
})

type InputFormValues = z.infer<typeof formSchema>

export default function Inputform() {
  const toast = useToast()

  // defining form based on zod schema
  const form = useForm<InputFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      creatorName: '',
      description: '',
      videoTx: '',
      trailerTx: '',
      renderer: 'YHzqe3I-ACGTg5JvcY-vk7hogYh0z3yWRKxx--dCEt0',
      license: 'default',
      payment: '',
      tags: []
    }
  })

  const [isLoading, setIsLoading] = React.useState(false)

  const [isConnected, activeAddress, connect] = useGlobalStore((state) => [
    state.isConnected,
    state.activeAddress,
    state.connect
  ])

  const {
    formState: { isSubmitting }
  } = useForm()

  async function onSubmit(values: InputFormValues) {
    console.log({ values })
    // This will be type-safe and validated.
    setIsLoading(true)
    try {
      const transactionId = await postAsset({
        // file: values.video,
        // file: values.image,
        title: values.title,
        description: values.description || '',
        videoTx: values.videoTx || '',
        trailerTx: values.trailerTx || '',
        license: values.license || 'default',
        payment: values.payment || '',
        renderer: values.renderer || 'YHzqe3I-ACGTg5JvcY-vk7hogYh0z3yWRKxx--dCEt0',
        tags: values.tags || [],
        creatorName: values.creatorName || '',
        creatorId: activeAddress || ''
      })
      toast({
        title: 'Success!',
        description: `Atomic asset uploaded!`,
        render: () => (
          <Flex
            onClick={(e: any) => {
              e.preventDefault()
              window.open(`https://ar-io.dev/${transactionId}`, '_blank')
            }}
          >
            View Transaction
          </Flex>
        ),
        status: 'success',
        isClosable: true,
        position: 'bottom-left'
      })
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Something went wrong!',
        description: error.message || 'Unknown Error',
        status: 'error',
        isClosable: true,
        position: 'bottom-left'
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState, form.reset])

  const licenseValue = form.watch('license')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid
          p="12px 24px"
          gridColumnGap={12}
          gridTemplateColumns={'1fr 1fr'}
          gridTemplateRows={'1fr 1fr 1fr'}
          h="full"
        >
          <GridItem>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <chakra.span color="red">*</chakra.span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>
          <GridItem>
            <FormField
              control={form.control}
              name="creatorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creator</FormLabel>
                  <FormControl>
                    <Input placeholder="creator name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>

          <GridItem>
            <FormField
              control={form.control}
              name="videoTx"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Video Tx Id <chakra.span color="red">*</chakra.span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="video tx id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>
          <GridItem>
            <FormField
              control={form.control}
              name="trailerTx"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Trailer Tx Id <chakra.span color="red">*</chakra.span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="trailer tx id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>
          <GridItem>
            <FormField
              control={form.control}
              name="renderer"
              render={({ field }) => (
                <FormItem className="w-full lg:w-1/2">
                  <FormLabel>Renderer </FormLabel>
                  <FormControl>
                    <Input placeholder="video renderer txId" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>
          <GridItem>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description" {...field} resize="none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>
        </Grid>

        <Grid p="12px 24px" gridColumnGap={12} gridTemplateColumns={'1fr 1fr'}>
          <GridItem>
            <FormField
              control={form.control}
              name="license"
              render={({ field }) => (
                <FormItem className="w-full lg:w-1/2">
                  <FormLabel>License</FormLabel>
                  <FormControl>
                    <CustomSelect onChange={field.onChange} defaultValue={field.value} name="license">
                      <option value="default">UDL Default Public Use</option>
                      <option value="access">UDL Restricted Access</option>
                      <option value="commercial">UDL Commercial Use - One Time Payment</option>
                      <option value="derivative">UDL Derivative Works - One Time Payment</option>
                    </CustomSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>
          <GridItem>
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem className="w-full lg:w-1/2">
                  <FormLabel>
                    Payment {licenseValue === 'default' ? null : <chakra.span color="red">*</chakra.span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="License Fee in AR"
                      {...field}
                      disabled={licenseValue === 'default'}
                      required={licenseValue !== 'default'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>
        </Grid>
        <Flex justifyContent="center">
          <Flex mt={4}>
            {isConnected ? (
              isLoading ? (
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal" size="xl" />
              ) : (
                <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                  Upload Video
                </Button>
              )
            ) : (
              <Button colorScheme="teal" onClick={connect}>
                Please connect to upload an asset
              </Button>
            )}
          </Flex>
        </Flex>
      </form>
    </Form>
  )
}
