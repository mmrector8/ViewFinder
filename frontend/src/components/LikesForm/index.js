import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addLike, deleteLike } from "../../store/photos";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./likesform.css"

const LikesForm = ({photo, user})=>{
    const currentUser = useSelector(state=> state.session.user)
    const likes = useSelector(state => state.ui.photoShowModalOpen.likes)
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false)
    const [likersLike, setLikersLike] = useState("")

    useEffect(()=>{

        likes?.map((like)=>{
            if(currentUser && currentUser._id == like.likerId){
               
                setLiked(true)
                setLikersLike(like)
            }
        })
    }, [dispatch, photo, likes])


    if(!likes){
        return null;
    }

    const sendOrRemoveLike = ()=>{
        console.log(likersLike)
        if(!liked){
         return dispatch(addLike(photo))
                .then((newLike)=> setLikersLike(newLike))
                .then(() => setLiked(true))
                
        }else{
            return dispatch(deleteLike(likersLike._id))
                .then(()=> setLiked(false))
                .then(()=> setLikersLike(""))
        }
    }

    return (
        <div className="likes-form" id={!Object.keys(user).length ? "likes-padding" : undefined}>
                 <p className="likes-length">{likes.length}</p>
                <button onClick={sendOrRemoveLike} className="like-button">
                {liked && currentUser ? <FavoriteIcon
                        className="show-photo-fav"
                        fontSize="medium"
                        sx={{ color: "red" }}
                     />: <FavoriteBorderIcon
                    className="show-photo-fav"
                    fontSize="medium"
                    sx={{ color: "red" }}
                />}</button>
        </div>
    )
}

export default LikesForm;