import React from 'react'
import {Button} from '@material-ui/core'
import WebSocket from 'isomorphic-ws'
import {useRecoilState} from 'recoil'
// import WebSocket from 'isomorphic-ws'
// import io from 'socket.io-client'
// const ws = new WebSocket('ws://127.0.0.1:3005/ws')

// const io = require('socket.io-client')

// // @ts-ignore
// const socket = io('ws://localhost:3005');

const ws = new WebSocket('ws://localhost:3005/session')

ws.onopen = function open() {
    console.log('connected');
    ws.send(Date.now());
  };

ws.onmessage = function incoming(message){
    console.log("message", message.data.toString())
}

const handleNewMessage = () => {
    console.log('emitting new message');
    ws.send("testMessage")
    // socket.emit('new message', {
    //   room: 'test-room'
    // });
  }



export default class GameMenu extends React.Component {

    render(){
        return (
            <>
        <h1>
            test
        </h1>
        <Button onClick={() => handleJoinGame()}>
            Join a game
        </Button>
        <Button onClick={() => handleHostGame()}>
            Host a game
        </Button>
        </>
    )
    }
    
}