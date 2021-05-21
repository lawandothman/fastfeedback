import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { mutate } from 'swr'
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

const AddSiteModal: React.FC = ({ children }) => {
  const toast = useToast()
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, reset } = useForm<ISite>()

  const onCreateSite: SubmitHandler<ISite> = ({ name, url }) => {
    const newSite = {
      authorId: auth?.user?.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    }

    createSite(newSite)
    toast({
      title: 'Success!',
      description: 'We\'ve added your site.',
      duration: 5000,
      status: 'success',
      isClosable: true,
    })
    mutate(
      ['/api/sites', auth?.user?.token],
      async (data: { sites: ISite[] }) => ({ sites: [...data.sites, newSite] }),
      false,
    )
    onClose()
    reset()
  }

  return (
    <>
      <Button
        backgroundColor='gray.900'
        color='white'
        fontWeight='medium'
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
        onClick={onOpen}
      >
        {children}
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
                {...register('name', { required: true })}
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
