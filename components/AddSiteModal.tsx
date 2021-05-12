import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { ISite } from 'types'
import { createSite } from '@/lib/firestore'
import { useAuth } from '@/lib/auth'

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const auth = useAuth()
  const { register, handleSubmit } = useForm<ISite>()

  const onCreateSite: SubmitHandler<ISite> = ({ site, url }) => {
    createSite({
      authorId: auth?.user?.uid,
      createdAt: new Date().toISOString(),
      site,
      url,
    })
    toast({
      title: 'Success!',
      description: 'We\'ve added your site.',
      duration: 5000,
      status: 'success',
      isClosable: true,
    })
    onClose()
  }

  return (
    <>
      <Button
        fontWeight='medium'
        maxW='200px'
        variant='solid'
        size='md'
        onClick={onOpen}
      >
        Add Your First Site
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight='bold'>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register('site', { required: true })}
                placeholder='My site'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder='https://website.com'
                {...register('url', { required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight='medium'>
              Cancel
            </Button>
            <Button
              backgroundColor='#99FFFE'
              color='#194D4C'
              fontWeight='medium'
              type='submit'
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddSiteModal
