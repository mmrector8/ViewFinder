import { useState } from "react";
import { useDispatch } from "react-redux"
import { addLike, deleteLike } from "../../store/photos";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LikesForm = ({photo})=>{
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false)


    const sendOrRemoveLike = ()=>{
        if(!liked){
            dispatch(addLike(photo.id))
                .then(() => setLiked(true))
            
        }else{
            dispatch(deleteLike(photo.id))
                .then(() => setLiked(false))
        } 
    }

    return (
        <div className="likes-form">
            <form onClick={handleSubmit}>
                <button onClick={sendOrRemoveLike}>
                    {liked ? <FavoriteIcon
                        className="show-photo-fav"
                        fontSize="medium"
                        sx={{ color: "red" }}
                    /> : <FavoriteIcon
                    className="show-photo-fav"
                    fontSize="medium"
                    sx={{ color: "red" }}
                />}</button>
            </form>
        </div>
    )
}

export default LikesForm;