import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Chat from '../components/chat'
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


  const [isPaused, setPause] = useState(false);
  
  const eventsAtom = getAtom('commandText');
  const [events, setEventsState] = useRecoilState(eventsAtom)

  const ws = useRef(null);

  function send(event){
    ws.current.send(event)
  }


  const userId = getUserId()
  console.log(userId)
  // useEffect(() =>{
    
  //   // ws.send(JSON.stringify({"event": "REGISTER_USER_ID", "message": userId}), () =>{
  //   //   console.log("sent message")
  //   // })
  // })

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3005')
    ws.current.onopen = function open() {
      console.log("current", ws.current)
      ws.current.send(`{"event": "USERID", "message": "${getUserId()}"}`)
      console.log('connected');
      };
      
    // ws.current.onmessage = function incoming(message){
    //     processEvents(message.data)
    //     ws.current.send("somedata");
    //     console.log("message", message.data.toString())
    //   };
      
    return () => {
      ws.current.close();
    };

    
  }, [])

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
        if (isPaused) return;
        const message = JSON.parse(e.data);
        console.log("e", message);
    };
  }, [isPaused]);
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Infinity Motel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>
          Welcome to the Infinity Motel
        </h1>
      </main>

      <Flex alignContent="center" justifyContent="center" w="100%">
        <Box w="40%">
            <Chat send={send}/>
        </Box>
      </Flex>

    </div>
  )
}
