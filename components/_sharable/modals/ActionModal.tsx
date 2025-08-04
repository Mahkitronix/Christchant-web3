import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from '@heroui/react'

interface ActionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  isSubmitting: boolean
}

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isSubmitting,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="xs" backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button color="primary" onPress={onConfirm} isDisabled={isSubmitting}>
            {isSubmitting ? (
              <Spinner className="text-white" size="sm" />
            ) : (
              'Yes, delete'
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ActionModal
