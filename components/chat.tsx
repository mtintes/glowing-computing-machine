import { TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import {useRecoilState, useSetRecoilState} from "recoil"
import { getAtom } from "../util/atoms";
import { Input } from "@chakra-ui/react"

export default function Chat(props) {
    let ws = {};

    useEffect(()=>{
        ws = props.ws
    }, [props])

    console.log(props)
    const commandAtom = getAtom("commandText")
    const [commandText, setCommandText] = useRecoilState(commandAtom)

    function sendCommand(event){
        // console.log("event", event)

        if(event.key === 'Enter'){

            const event = {
                event: "COMMAND",
                message: commandText,
                userId: props.userId
            }
            props.send(JSON.stringify(event))
            
            console.log("text entered: ",commandText)
            setCommandText("")
        }
    }

    return (
        <>
            <Input
            value={commandText} 
            onKeyDown={sendCommand} 
            onChange={event => {
                setCommandText(event.target.value)}
            }/>
        </>
    )
}