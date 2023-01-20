import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPhoto } from "../../store/photos";
import LikesForm from "../LikesForm";
import "./PhotoShow.css"


const PhotoShow = ({photo}) => {
    const dispatch = useDispatch();
    const {photoId} = useParams();


    useEffect(() => {
        dispatch(getPhoto(photoId))
    }, [dispatch, photoId])

    return (
      <div>
        <img
          height="400px"
          width="100%"
          className="photo-show-image"
          src={photo?.url}
        />
        <div className="line"></div>
        <div className="photo-show-elements">
          <div className="left-side-show-box">
            <div className="photo-show-username">{photo?.userId?.username}</div>
            <div>{photo?.spotId?.name}</div>
          </div>
          <div className="photo-show-description">{photo?.description}</div>
          <div className="show-photo-heart">
              <LikesForm photo={photo}/>
          </div>
        </div>
      </div>
    );
    
}

export default PhotoShow; 