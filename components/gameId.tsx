import { Box, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getAtom } from "../util/atoms";

interface Event {
    message: string
    event: string
}

export function GameId() {

    let gameId = ""

    const eventsAtom = getAtom('events');
    const [eventsFromApi, setEventsState] = useRecoilState(eventsAtom)

    eventsFromApi.forEach(eventToFind => {
        // console.log("game id events")
        if(eventToFind.event === "ROOMJOIN"){
            gameId = eventToFind.message
        }else if(eventToFind.event === "GAMEEXIT"){
            gameId = ''
        }
    });

    // useEffect(() => {

    // }, [eventsFromApi])
    
    if(gameId != ""){
    return (
        <>
            <a>
                You game ID is: '{gameId}' Let you friends know and they can play too! To leave the game type 'leave game'
            </a>
        </>      
    )}
    
    return (
        <>
            <a>Create a game by typing 'create game' or join a game by typing 'join game GAME_ID'</a>
        </>
    )
}