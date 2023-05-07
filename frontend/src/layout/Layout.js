import { Button, Grid, GridItem, HStack, Link, Modal, Text, useDisclosure } from "@chakra-ui/react"
import List from "../components/list";
import { AddIcon } from '@chakra-ui/icons';
import FromAdd from "../components/FormAdd";
import React, { useEffect, useState } from "react";

const SideMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [lists , setLists] = useState([])
  const [loader, setLoader] = useState(0)
  const onCloseSample = async()=>{
    await onClose()
    await setLoader(loader+1)
  }

  useEffect(()=>{
      const fetchData= async()=>{
        const res = await fetch('/api/todo/')
        const data = await res.clone().json()
        if(res.ok){
          setLists(data)
          console.log(lists)
        }
      }
      fetchData()
    },
    [loader])

    return ( 
        <div>
          <Grid templateColumns="repeat(6, 1fr)">
      <GridItem
        as="aside"
        colSpan={{ base: 6, lg: 2, xl: 1 }} 
        bg="purple.400"
        minHeight={{ lg: '100vh' }}
        p={{ base: '20px', lg: '30px' }}
      >
        <div class="section">
        <div class="item"><Link>All Tasks</Link></div>
        <div class="item"><Link>Settings</Link></div>
        <div class="item"><Link>About</Link></div>
  </div>
      </GridItem>
      <GridItem
        as="main"
        colSpan={{ base: 6, lg: 4, xl: 5 }} 
        p="30px"
      >
         <HStack className='heading2' spacing='900px'>
        <Text className='text_todo' bg='purple.400' bgClip='text' fontSize='4xl' fontWeight='extrabold'>All Tasks</Text> 
         <Button onClick={onOpen} rightIcon={<AddIcon />} bgColor='purple.400' color='white' variant='outline'>
          Add Task
        </Button>
        </HStack>
       
         <hr/>
          <p>All task that you have added</p>
         <List items={lists} close={()=>{onCloseSample()}} />
      </GridItem>
    </Grid>

    <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <FromAdd  close={()=>{onCloseSample()}}/>
      </Modal>

        </div>
     );
}
 
export default SideMenu;