import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
import { 
  SimpleGrid,
  Text,
  Heading,
  Card, 
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  useToast,
  Badge
} from "@chakra-ui/react"
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import React, { useState } from "react"
const List = (props) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [marked] = useState('Task Completed')
  const [color] = useState('green')
  const [idd, setId] = useState()
  const [title , setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [color_card, setColorCard] = useState('green')
  const toast = useToast()
    const HandleDelete = async(id)=>{
        await fetch('/api/todo/'+id, {
            method:'DELETE'
        }).then(()=>{
           toast({
                title: `Task Deleted`,
                status: 'error',
                position:'top',
                isClosable: true,
                variant: 'left-accent',
              })
            props.close()
        })
    }

    const HandleUpdate = async(id)=>{
      const updateInp = {marked,color,color_card}
      await fetch('/api/todo/'+id, {
        method:'PATCH',
        body: JSON.stringify(updateInp),
         headers: {
            'Content-Type': 'application/json'
            }
      }).then(()=>{
        toast({
                title: `Task marked as complete`,
                status: 'success',
                position:'top',
                isClosable: true,
                variant: 'left-accent',
              })
            props.close()
      }).catch((err)=>{
        console.log(err)
      })
    }




    const HandleEdit = async(id,title,details)=>{
      setTitle(title)
      setDetails(details)
      setId(id)
      onOpen()
      
    }

    const HandleEdit2 = async()=>{
      const updateInp = {title,details}
      await fetch('/api/todo/'+idd, {
        method:'PATCH',
        body: JSON.stringify(updateInp),
         headers: {
            'Content-Type': 'application/json'
            }
      }).then(()=>{
        toast({
                title: `Saved changes`,
                status: 'success',
                position:'top',
                isClosable: true,
                variant: 'left-accent',
              })
            props.close()
            onClose()
      }).catch((err)=>{
        console.log(err)
      })
    }


    return ( 
        <div className="list">
          <SimpleGrid paddingTop='10px' spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
  {props.items && props.items.map((item) =>  (
    <Card borderLeft="8px" borderColor={item.color_card} bg='grey.400'>
    <CardHeader paddingBottom='3'>
      <Heading size='md'> {item.title}</Heading><Badge fontSize='0.7em' variant='solid' colorScheme={item.color}>
       {item.marked}
      </Badge>
    </CardHeader>
    <CardBody p='0' paddingLeft='5'>
      <Text>{item.details}.</Text>
    </CardBody>
    <CardFooter>
      <HStack spacing='14px'>
                  <IconButton variant='solid'colorScheme='teal' size="xs" onClick={()=>{HandleUpdate(item._id)}} aria-label='Call Sage' fontSize='15px' icon={<CheckIcon />}/>
                  <IconButton variant='solid'colorScheme='blue' size="xs" onClick={()=>{HandleEdit(item._id,item.title,item.details)}} aria-label='Call Sage' fontSize='15px' icon={<EditIcon />}/>
                  <IconButton variant='solid'colorScheme='red'   size="xs" onClick={()=>{HandleDelete(item._id)}} aria-label='Call Sage' fontSize='15px' icon={<DeleteIcon />}/>
               
                  </HStack>
    </CardFooter>
  </Card>
  
  ))}
</SimpleGrid>




<Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input onChange={(e)=>{setTitle(e.target.value)}} ref={initialRef} value={title} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Details</FormLabel>
              <Input  onChange={(e)=>{setDetails(e.target.value)}} value={details} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=>{HandleEdit2()}} bgColor='purple.400' color='white' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </div>
     );
}
 
export default List;