import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Chat from '../components/chat'
import Display from '../components/display'
import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'isomorphic-ws'
import {Flex, Box, Grid} from '@chakra-ui/react'
import {processEvents} from '../hooks'
import cookie from 'js-cookie'
import unfetch from 'isomorphic-unfetch'
import {api} from './config'
import { useRecoilState } from 'recoil'
import {getAtom} from '../util/atoms'
import {useEffect, useState, useRef} from 'react'
import {GameId} from '../components/gameId'

function getUserId(){
    const userIdfromCookie = cookie.get('userId')
    if(userIdfromCookie){
      return userIdfromCookie
    }else{
      const newUserId = uuidv4();
      cookie.set('userId', newUserId);
      return newUserId;
    }
}


export default function Home() {

  // const [isPaused, setPause] = useState(false);
  
  const eventsAtom = getAtom('events');
  const [events, setEventsState] = useRecoilState(eventsAtom)

  const ws = useRef(null);

  function send(event){
    // console.log("send event")
    ws.current.send(event)
  }

  const userId = getUserId()
  console.log("userId", userId)

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3005')
    ws.current.onopen = function open() {
      console.log("current", ws.current)
      ws.current.send(`{"event": "USERID", "message": "${getUserId()}"}`)
      console.log('connected');
      };
      
    return () => {
      ws.current.close();
    };

  }, [])

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
        // if (isPaused) return;
        const message = JSON.parse(e.data);
        // console.log("events on message:", message)
        // const wholeArray = [...events, message]
        // console.log("wholeArray", wholeArray)
        setEventsState([...events, message])
        // console.log("e", message);
    };
  });
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Infinity Motel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main 
        <h1>
          Welcome to the Infinity Motel
        </h1>
      </main> */}
      {/* <main className={styles.main}> */}
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Box bg="blue.300">
          <GameId/>
        </Box>
      </Flex>
      <Flex w="80%" justifyContent="center">
        <Box>
          <Display/>
        </Box>
          {/* <Box w="50%" bg="blue.100" >
            <Display/>
          </Box> */}
          {/* <Box w="50%" bg="blue.200" >
            Testing 2
          </Box> */}
        </Flex>
        <Flex w="60%" justifyContent="center" alignContent="flex-end" position="absolute" bottom="3%">
          <Box w="100%"bg="blue.500">
            <Chat send={send} userId={userId}/>
          </Box>
        </Flex>
      {/* </main> */}
    </div>
  )
}
