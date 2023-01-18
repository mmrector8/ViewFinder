import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {fetchUser} from "../../store/user"
import "./usershow.css"

const UserShowPage = () =>{
    const user = useSelector((state=> state.users))   
    const {userId} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchUser(userId))
    }, [dispatch, userId])

    if(!user){
        return null;
    }

    return (
        <div className='user-show-page-container'>
            <div className='top-field'>
                <img src="" alt="" className="profile-pic"></img>
                <h1 className="profile-title">{user.username}'s Profile</h1>
            </div>
            <div className="user-photo-grid">
                {/* {user.photos?.map((photo, i)=> {
                    <img src={`${photo.url}`} alt="img grid" className="user-image-grid" key={i}></img>
                })} */}
                {[1,2,3,4,5,6,7,8,9].map((num, i)=> <img src="" className="user-image-grid-photo" alt='placeholder' key={i}></img>)}
            </div>

        </div>
        
    )
}

export default UserShowPage;