import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPhoto } from "../../store/photos";
import LikesForm from "../LikesForm";
import "./PhotoShow.css"



const PhotoShow = () => {
    const dispatch = useDispatch();
    const {photoId} = useParams();
    const photo = useSelector(getPhoto)

    useEffect(() => {
        dispatch(getPhoto(photoId))
    }, [dispatch, photoId])

    return (
      <div>
        <img
          height="400px"
          width="100%"
          className="photo-show-image"
          src="https://pinnacle-seeds.s3.us-west-1.amazonaws.com/yoga.jpg"
        />
        <div className="line"></div>
        <div className="photo-show-elements">
          <div className="left-side-show-box">
            <div className="photo-show-username">Username</div>
            <div>Spot name</div>
          </div>
          <div className="photo-show-description">Description</div>
          <div className="show-photo-heart">
              <LikesForm photo={photo}/>
          </div>
        </div>
      </div>
    );
    
}

export default PhotoShow; 