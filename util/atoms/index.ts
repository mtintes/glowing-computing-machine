import {atom} from 'recoil'
import memoize from 'memoize'
import {find, propEq} from 'ramda'
import { memo } from 'react'
import _ from 'lodash'

const atoms = [{
    key: "session",
    default: ""
},
{
    key: "commandText",
    default: ""
},
{
    key: "userId",
    default: ""
},
{
    key: "websocket",
    default: {}
},
{
    key: "events",
    default: [{"event": "start", "message": ""}]
}]

function getAtomFromId(id: string){
    console.log("atom",id)
    const atomToReturn = find(propEq('key', id))(atoms)
    console.log("atomToReturn", atomToReturn)
    if(atomToReturn){
        console.log("here")
        return atom(atomToReturn);
    }else{
        return atom({key: 'default', default: ''})
    }
}

export const getAtom = _.memoize(getAtomFromId)

// export const getAtom = memoize(function ())