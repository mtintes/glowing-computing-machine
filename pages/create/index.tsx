import React, { useEffect } from 'react'
import unfetch from 'isomorphic-unfetch'
import {api} from '../config'
import { useRecoilState } from 'recoil'
import {getAtom} from '../../util/atoms'

// let sessionId = "abcd"

export function CreateGame() {

    const sessionAtom = getAtom("session")
    console.log("sessionState", sessionAtom)
    const [sessionId, setSessionId] = useRecoilState(sessionAtom)
    console.log("sessionIDFromAtom", sessionId)

    useEffect(() => {
        unfetch(`${api.host}:${api.port}/session`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: "test"})
        })
        .then(res => res.json())
        .then((response)=> {
            console.log("fetch:", response)
            setSessionId(response.id)
        })
        // setSessionId(response.id)
    }, [])



    return (
        <>
            <h1>Your session is {sessionId}</h1>
        </>
    )

}

export default class Create extends React.Component {
    render(){
        return (
            <CreateGame/>
        )
    }
}