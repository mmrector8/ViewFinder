import jwtFetch from "./jwt";

export const RECEIVE_USER = 'users/RECEIVE_USER'

export const receiveUser = user =>({
    type: RECEIVE_USER,
    user
}) 

export const getUser = (userId)=>(state)=>{
    if(state.users){
        return state.users[userId]
    }
}