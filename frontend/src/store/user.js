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

export const fetchUser = (userId)=> async dispatch =>{
    userId = (userId.id)
    try{
        const res = await jwtFetch(`/api/users/${userId}`)
        const user = await res.json()
        return dispatch(receiveUser(user))
    }catch(err){
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors));
        }
    }
}

const usersReducer = (state={}, action)=>{
    const newState = {...state}
    switch(action.type){
        case RECEIVE_USER:
            return {...newState, ...action.user}
        default:
            return state;
    }
}
export default usersReducer;