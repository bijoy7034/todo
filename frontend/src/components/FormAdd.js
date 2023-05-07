import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'

const FromAdd = (props) => {

    const toast = useToast()
    const [title , setTitle] = useState("")
    const [details, setDetails] = useState("")

    const  inputData= {title,details}

    const AddNewTask = async()=>{
        const res = fetch('/api/todo/',{
            method:'POST',
            body: JSON.stringify(inputData),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(()=>{
            console.log(res)
            toast({
                title: `Task ${title} Added`,
                status: 'info',
                position:'top',
                isClosable: true,
                variant: 'left-accent',
              })
            props.close()
        }).catch((err)=>{
            console.log(err)
        })

    }

    return ( 
        <div>
            
            <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your tasks</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e)=>{setTitle(e.target.value)}} required placeholder='Enter Task Title' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Details</FormLabel>
              <Input value={details} onChange={(e)=>{setDetails(e.target.value)}} required placeholder='Enter Details ' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=>{AddNewTask()}} colorScheme='blue' mr={3}>
              Add Task
            </Button>
            
          </ModalFooter>
        </ModalContent>
        </div>
     );
}
 
export default FromAdd;