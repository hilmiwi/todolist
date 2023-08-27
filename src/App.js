import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Input,
  Heading,
  Button,
  Container,
  Divider,
  Checkbox,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const [list, setList] = useState([]);
  const [inputVal, setInputVal] = useState('');

  function submitHandler() {
    const newList = {
      desc: inputVal,
      status: false,
    };
    setList(prev => [...prev, newList]);
    setInputVal('')
  }
  function deleteHandler(idx){
    setList(list.filter((val,index) => index !== idx));
  }
  function getDone(){
    let count = 0;
    list.forEach(element => {
      if(element.status === true){
        count++
      }
    })
    return count
  }
  function onCheckBoxHandler(event, index){
    const updatedStatus = list.map((dt, idx)=>{
      if(idx === index){
        dt.status = event.target.checked
      }
      return dt
    })
    setList(updatedStatus)
  }
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        maxW='600px'
      >
          <Heading marginBottom='30px'>Chores ToDo List</Heading>
          {list?.length === 0 ? 
            <Text>Please add ToDo list first</Text>
            : null
          }
            {
              list.length !== 0 ? list.map((dt, idx) => {
                  return(
                    <Box key={idx} display='flex' width='100%' justifyContent='space-between' marginBottom='15px'>
                      <Checkbox colorScheme='green' borderColor='green' checked={dt.status} onChange={(event)=>onCheckBoxHandler(event,idx)}>
                        <Text marginLeft='20px'>{dt.desc}</Text>
                      </Checkbox> 
                      <IconButton
                        variant='outline'
                        colorScheme='red'
                        aria-label='Send email'
                        icon={<DeleteIcon/>}
                        size='sm'
                        onClick={()=>deleteHandler(idx)}
                      />
                    </Box>
                )
              }) : null
            }
          <Divider margin='20px 0'/>
          <Text fontWeight="bold" fontSize='xl'>Done : {getDone()}</Text>
          <Text textAlign="start" alignSelf='start'>Add Todo</Text>
          <Box display="flex" flexDir="column" width='100%'>
            <Input
              value={inputVal}
              onChange={event => setInputVal(event.target.value)}
              placeholder="Input Todo here"
              size="md"
              width='100%'
              margin='10px 0'
            />
            <Button alignSelf="flex-start" colorScheme='blue' onClick={submitHandler} isDisabled={inputVal === '' ? true:false}>ADD TASK</Button>
          </Box>
      </Container>
    </ChakraProvider>
  );
}

export default App;
