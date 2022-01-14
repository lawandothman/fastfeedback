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
  Button,
  useDisclosure,
  useToast,
  Switch,
} from '@chakra-ui/react'
import { ISite } from 'types'
import { updateSite } from '@/lib/firestore'
import { useAuth } from '@/lib/auth'
import { SettingsIcon } from '@chakra-ui/icons'

interface EditSiteModalProps {
  settings?: {
    timestamp: boolean
    ratings: boolean
    icons: boolean
  }
  siteId: string
}

const EditSiteModal: React.FC<EditSiteModalProps> = ({
  children,
  settings,
  siteId,
}) => {
  const toast = useToast()
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit } = useForm<ISite>()

  const onEditSite: SubmitHandler<Partial<ISite>> = async ({ settings }) => {
    await updateSite(siteId, { settings })
    toast({
      title: 'Success!',
      description: 'We\'ve updated your site.',
      duration: 5000,
      status: 'success',
      isClosable: true,
    })
    mutate(['/api/sites', auth?.user?.token])
    onClose()
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
        leftIcon={<SettingsIcon />}
        onClick={onOpen}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onEditSite)}>
          <ModalHeader fontWeight='bold'>Edit Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl display='flex' alignItems='center'>
              <Switch
                key={settings?.timestamp.toString()}
                defaultChecked={settings?.timestamp}
                {...register('settings.timestamp')}
                colorScheme='green'
              />
              <FormLabel htmlFor='show-timestamp' ml={2}>
                Show Timestamp
              </FormLabel>
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <Switch
                key={settings?.icons.toString()}
                defaultChecked={settings?.icons}
                {...register('settings.icons')}
                colorScheme='green'
              />
              <FormLabel htmlFor='show-icons' ml={2}>
                Show Icons
              </FormLabel>
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <Switch
                key={settings?.ratings.toString()}
                defaultChecked={settings?.ratings}
                {...register('settings.ratings')}
                colorScheme='green'
              />
              <FormLabel htmlFor='show-ratings' ml={2}>
                Show Ratings
              </FormLabel>
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
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditSiteModal
