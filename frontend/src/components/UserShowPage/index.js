import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {fetchUser} from "../../store/user"

const UserShowPage = () =>{
    const user = useSelector((state=> state.users))   
    const userId = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchUser(userId))
    }, [dispatch])

    if(!user){
        return null;
    }

    return (
        <h1>{user.username}</h1>
    )
}

export default UserShowPage;