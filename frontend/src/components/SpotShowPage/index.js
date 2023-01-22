import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSpot } from "../../store/spot"
import CommentIndexItem from "../CommentIndexItem";
import CommentForm from "../CommentForm";
import { openPhotoShowModal, openSigninModal } from "../../store/ui";
import { months, convertDate } from "../CommentIndexItem";
import { getBestTimeOfDay, getConditions, getTransportation } from "./spotShowHelperFunctions";
import "./spotshow.css"
import LoginModal from "../SessionForms/LoginModal";

const SpotShowPage = ()=>{
    const spot = useSelector(state=> state.spots)
    const currentUser = useSelector((state)=> state.session.user)
    const photos = useSelector((state)=> state.spots.photos)
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const [openWriteComment, setOpenWriteComment] = useState(false)
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        dispatch(fetchSpot(spotId))
    }, [dispatch, spotId])

    if(!spot || !spot.photos){
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

    getConditions(photos)

    return (
      <div className="spot-show-page-container" onClick={checkClicked}>
        <div className="spot-show-grid-container">
          <div className="upvoted-photos">
            <div className={spot.photos[0] ? "most-upvoted-photo-container" : "no-photos-yet-container"}>
              {spot.photos[0] ?
            <img src={spot.photos[0]?.url} alt="most upvoted image" className="most-upvoted-image" onClick={() => dispatch(openPhotoShowModal(spot.photos[0]))}></img>
                : <p className="no-photos-yet">{currentUser ? "No photos yet! Click the camera button in the top right corner to add one!" : "No photos yet! Please login and click the camera button in the top right corner to add one!"}</p>}
            </div>
            <div className={spot.photos[0] ? "top-upvoted-photos" : "no-display-photos"}>
              {spot?.photos?.slice(1).length > 0
                ? spot?.photos
                    ?.slice(1, 5)
                    .map((photo, i) => (
                      <img
                        src={photo.url}
                        alt="top upvoted photos"
                        key={i}
                        className="top-upvoted-smaller-images"
                        onClick={() => dispatch(openPhotoShowModal(photo))}
                      ></img>
                    ))
                : ""
                }
            </div>
          </div>
          <div className="comments-and-info-container">
            <div className="comments-box">
              {currentUser ? (
                <button className="open-comment-button">
                  Comment on this spot!
                </button>
              ) : (
                <button
                  className="open-sign-in-button"
                  onClick={() => dispatch(openSigninModal())}
                >
                  Please login to write a comment
                </button>
              )}
              {openWriteComment ? (
                <CommentForm
                  setOpenWriteComment={setOpenWriteComment}
                  setClicked={setClicked}
                />
              ) : (
                ""
              )}
              {spot?.comments
                ?.map((comment, i) => (
                  <CommentIndexItem comment={comment} key={i} />
                ))
                .reverse()}
            </div>
            <div className="spot-info-container">
              <div className="spot-info-item">
                <p>Spot Name: </p>
                <p className="spot-info-items">{spot?.name}</p>
              </div>
              <div className="spot-info-item">
                <p>Date of featured photo: </p>
                <p className="spot-info-items">
                  {spot?.photos[0] ? convertDate(spot?.photos[0]?.updatedAt) : ""}
                </p>
              </div>
              <div className="spot-info-item">
                <p>Best Time of Day: </p>
                <p className="spot-info-items">
                  {photos && getBestTimeOfDay(photos)}
                </p>
              </div>
              <div className="spot-info-item">
                <p>Reported Conditions: </p>
                <div className="spot-info-items conditions-info-items">
                  {getConditions(photos)?.map((item, i) => (
                    <p key={i} className="condition-info-item">{item}</p>
                  ))}
                </div>
              </div>
              <div className="spot-info-item">
                <p>Transportation: </p>
                <div className="spot-info-items transportation-info-items">
                  {getTransportation(photos)?.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SpotShowPage;