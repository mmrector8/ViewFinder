import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addLike, deleteLike } from "../../store/photos";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LikesForm = ({photo})=>{
    const currentUser = useSelector(state=> state.session.user)
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false)

    console.log(photo)

    const sendOrRemoveLike = ()=>{
        if(!liked){
            dispatch(addLike(photo._id))
                .then(() => setLiked(true))
            
        }else{
            dispatch(deleteLike(photo._id))
                .then(() => setLiked(false))
        } 
    }

    return (
        <div className="likes-form">
                <button onClick={sendOrRemoveLike}>
                    {liked && currentUser? <FavoriteIcon
                        className="show-photo-fav"
                        fontSize="medium"
                        sx={{ color: "red" }}
                    /> : <FavoriteBorderIcon
                    className="show-photo-fav"
                    fontSize="medium"
                    sx={{ color: "red" }}
                />}</button>
        </div>
    )
}

export default LikesForm;