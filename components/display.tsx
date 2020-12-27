import { Box, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getAtom } from "../util/atoms";

interface Event {
    message: string
    event: string
}

export default function Display() {

    const eventsAtom = getAtom('events');
    const [events, setEventsState] = useRecoilState(eventsAtom)
    // console.log("display", events) 
    // console.log("typeof", typeof events)

    let eventsText = [{event: "test", message: "test message"}, {event: "test", message: "test message 2"}];

    let processedEvents = []

    console.log("events to process", events)
    processedEvents = events.map((eventToMap: Event) => {
    if(eventToMap.event.startsWith("A-")){
        return <a key={eventToMap.message}>{eventToMap.message}</a>
    }})
    useEffect(() => {

    }, [events])
    
    return (
        <>
        <Box>
            <ul>
                {processedEvents}
            </ul>
        </Box>
        </>      
    )
}