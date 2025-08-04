import React from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from '@heroui/react'

export default function UiDrawerA({ label }: { label: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div className="flex gap-2" onClick={onOpen}>
        {label}
      </div>
      <Drawer backdrop={'blur'} isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Artist Details
              </DrawerHeader>
              <DrawerBody>TEST</DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
