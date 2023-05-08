import { DragHandleIcon, SettingsIcon } from "@chakra-ui/icons";
import { Button, HStack , Link, Text, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
const About = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return ( 
    <div>
        <div>
            <div className="item"><HStack><DragHandleIcon marginRight='3'/><Text>Dashboard</Text></HStack></div>
            <div className="item"><HStack> <SettingsIcon marginRight='3'/><Text><Link onClick={onOpen}>About</Link></Text> </HStack></div>
        </div> 
        <Modal size='xl' onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>TODO APP</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                         A to-do list app is a tool that helps individuals and teams stay organized and on top of their tasks. With so much going on in our daily lives, it can be challenging to keep track of everything we need to do. A to-do list app simplifies this process by allowing users to create and manage their tasks in one central location.
                        One of the primary benefits of a to-do list app is that it eliminates the need for paper lists or sticky notes, which can easily get lost or forgotten. With a to-do list app, users can easily access their tasks from their mobile devices, computers, or tablets, making it easy to stay on top of their to-do lists, even when they're on the go.
                        Another advantage of a to-do list app is that it can help users prioritize their tasks. Users can assign due dates, set reminders, and even create subtasks for complex projects. This feature allows users to focus on the most critical tasks first, ensuring that they don't miss important deadlines or forget essential tasks.
                        <Text fontSize='sm' color='purple.400' marginTop='6' textAlign='center'>Copyright 2023 &#169; Bijoy Anil</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
            </ModalContent>
      </Modal>
    </div>
    
    );
}
 
export default About;