import React, { useRef, useState } from 'react'
import { mutate } from 'swr'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { deleteFeedback } from '@/lib/firestore'
import { useAuth } from '@/lib/auth'
import { IFeedback } from 'types'

interface RemoveButtonProps {
  feedbackId?: string
}

const DeleteFeedbackButton:React.FC<RemoveButtonProps> = ({ feedbackId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const auth = useAuth()

  const onClose = () => setIsOpen(false)
  const onDelete = () => {
    if (feedbackId) {
      deleteFeedback(feedbackId)
      mutate(
        ['/api/feedback', auth?.user?.token],
        async (data: { feedback: IFeedback[] }) => ({
          feedback: data.feedback.filter(
            (feedback) => feedback.id !== feedbackId,
          ),
        }),
        false,
      )
      onClose()
    }
  }

  return (
    <>
      <IconButton
        aria-label='Delete feedback'
        icon={<DeleteIcon />}
        variant='ghost'
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cant undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' fontWeight='bold' onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteFeedbackButton
