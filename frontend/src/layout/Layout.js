import { Grid, GridItem, HStack, IconButton, Modal, Text, useDisclosure } from "@chakra-ui/react"
import List from "../components/list";
import { AddIcon} from '@chakra-ui/icons';
import FromAdd from "../components/FormAdd";
import React, { useEffect, useState } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Menu_todo from "../components/menu";
import pic from '../assets/notFound.svg'
import About from "../components/about";

const SideMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [lists , setLists] = useState()
  const [noItems , setNoItems] = useState(null)
  const [loader, setLoader] = useState(null)
  const [heading , setHeading] = useState('All Tasks')
  const onCloseSample = async()=>{
    await onClose()
    await setLoader(loader+1)
  }


  const handleFilter = async()=>{
        const res = await fetch('https://todo-website-qcy0.onrender.com/api/todo/complete')
        const data = await res.clone().json()
        if(res.ok){
          setLists(data)
          setHeading('Completed Tasks')
        }
  }
  const handleFilter2 = async()=>{
        const res = await fetch('https://todo-website-qcy0.onrender.com/api/todo/pending')
        const data = await res.clone().json()
        if(res.ok){
          setLists(data)
          setHeading('Pending Tasks')
        }
  }
  
  useEffect(()=>{
      const fetchData= async()=>{
        const res = await fetch('https://todo-website-qcy0.onrender.com/api/todo/')
        const data = await res.clone().json()
        if(res.ok){
          setLists(data)
          setHeading('All Tasks')
          if(!lists){
            setNoItems(1)
          }
          else{
            setNoItems(null)
          }
          
        }
      }
      fetchData()
      
    },
    [loader])

    return ( 
        <div>
          <Grid templateColumns="repeat(6, 1fr)">
            <GridItem as="aside" colSpan={{ base: 6, lg: 2, xl: 1 }} bg="purple.400" minHeight={{ lg: '100vh' }} p={{ base: '20px', lg: '30px' }}>
            <div className="section">
                <About/>
            </div>
          </GridItem>
          <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 5 }} p="30px">
            <HStack className='heading2' display='flex' justifyContent='space-between'>
            <Text className='text_todo' bg='purple.400' bgClip='text' fontSize='4xl' fontWeight='extrabold'>{heading}</Text> 
         <HStack>
         <Menu_todo filter ={()=>{handleFilter()}} filter2 = {()=>{handleFilter2()}} close={()=>{onCloseSample()}}/>
        <IconButton onClick={onOpen} icon={<AddIcon />} bgColor='purple.400' color='white' variant='outline'></IconButton>
        </HStack>
        </HStack>
       
         <hr/>
          <p>All task that you have added</p>

         <>
         <BrowserRouter>
          <Routes>
            <Route index path='/' element={<List items={lists} close={()=>{onCloseSample()}} />}></Route>
          </Routes>
         </BrowserRouter></>
         <div>
              {noItems ? (
                <div className="icon_wrapper">
                <img src={pic} className="App-svg" alt="logo" />
                <h1>Add tasks by clicking the add button</h1>
          </div>
            ) : (<div></div>)}
          </div>
       </GridItem>
      </Grid>

    <Modal isOpen={isOpen} onClose={onClose}>
        <FromAdd  close={()=>{onCloseSample()}}/>
    </Modal>
    </div>
     );
}
 
export default SideMenu;