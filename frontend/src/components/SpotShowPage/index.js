import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSpot } from "../../store/spot"
import CommentIndexItem from "../CommentIndexItem";
import CommentForm from "../CommentForm";
import { openSigninModal } from "../../store/ui";
import "./spotshow.css"
import LoginModal from "../SessionForms/LoginModal";

const SpotShowPage = ()=>{
    const spot = useSelector(state=> state.spots)
    const currentUser = useSelector((state)=> state.session.user)
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const [openWriteComment, setOpenWriteComment] = useState(false)
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        dispatch(fetchSpot(spotId))
    }, [dispatch, spotId])

    if(!spot){
        return null
    }

    const checkClicked = (e)=>{
        if(!clicked && !openWriteComment && e.target.className==="open-comment-button"){
            setOpenWriteComment(true)
            setClicked(true)
        } else if (clicked && openWriteComment && e.target.className !== "textarea-for-comments" && e.target.className !== "comment-button"){
            setClicked(false)
            setOpenWriteComment(false)
        }
    }

    return(
        <div className="spot-show-page-container" onClick={checkClicked} >
            <div className="spot-show-grid-container">
                <div className="upvoted-photos">
                    <img src={spot.photos[0].url} alt="most upvoted image" className="most-upvoted-image"></img>
                    <div className="top-upvoted-photos">
                        {spot.photos.slice(1).length > 0 ? spot.photos?.slice(1).map((photo, i) => <img src={photo.url} alt="top upvoted photos" key={i} className="top-upvoted-smaller-images"></img>) : 
                             [1, 2, 3, 4].map((num, i) => <img src="" alt="top upvoted photos" key={i} className="top-upvoted-smaller-images"></img>) }
                        
                        
                    </div>
                </div>
                <div className="comments-and-info-container">
                    <div className="comments-box">
                        {currentUser ? <button className="open-comment-button">Comment on this spot!</button> : <button className="open-sign-in-button" onClick={()=> dispatch(openSigninModal())}>Please login to write a comment</button>} 
                        {openWriteComment ? <CommentForm setOpenWriteComment={setOpenWriteComment} setClicked={setClicked}/> : ""} 
                        {spot.comments?.map((comment, i)=> <CommentIndexItem comment={comment} key={i}/>).reverse()}
                    </div>
                    <div className="spot-info-container">
                        <p className="spot-info-item">{spot.name}</p>
                        <p className="spot-info-item">Date and Time</p>
                        <p className="spot-info-item">Best Time of Day: </p>
                        <p className="spot-info-item">Conditions</p>
                        <p className="spot-info-item">Transportation</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default SpotShowPage;