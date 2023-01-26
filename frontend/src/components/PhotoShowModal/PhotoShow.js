import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPhoto } from "../../store/photos";
import { openSigninModal } from "../../store/ui";
import { Link } from "react-router-dom";

import LikesForm from "../LikesForm";
import "./PhotoShow.css"


const PhotoShow = ({photo}) => {
    const dispatch = useDispatch();
    const {photoId} = useParams();
    const user = useSelector(store => store.users);
    const currentUser = useSelector((store) => store.session.user);

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
            <Link to={`/spots/${photo?.spotId?._id}`} className="photo-show-spot"> {photo?.spotId?.name}</Link>
          </div>
          <div className="photo-show-description">{photo?.description}</div>
          <div className="show-photo-heart">
            {currentUser ? (
              <LikesForm photo={photo} user={user} />
            ) : (
              <p className="login-favorite" onClick={() => dispatch(openSigninModal())}>To like, login here!</p>
            )}
          </div>
        </div>
      </div>
    );
    
}

export default PhotoShow; 