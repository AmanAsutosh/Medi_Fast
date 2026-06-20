import {jwtDecode} from 'jwt-decode'

export function isTokenExpired(token){
    if(!token)return true

    try{
        const decodeToken=jwtDecode(token)
        const timeNow=Date.now()/1000
        return decodeToken.exp<timeNow
    }catch(err){
        console.error("error from isTokenExpire.jsx",err)
        return true
    }
}