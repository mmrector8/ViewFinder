import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deletePhoto, getPhoto } from "../../store/photos";
import { closePhotoShowModal, openSigninModal } from "../../store/ui";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import YesIcon from "@mui/icons-material/Check";
import NoIcon from "@mui/icons-material/Clear";
import LikesForm from "../LikesForm";
import "./PhotoShow.css";

const PhotoShow = ({ photo }) => {
  const dispatch = useDispatch();
  const { photoId } = useParams();
  const user = useSelector((store) => store.users);
  const currentUser = useSelector((store) => store.session.user);
  const [confirmation, setConfirmation] = useState(false);
  const spotsPresent = useSelector((store)=> store.spots)

  useEffect(() => {
    dispatch(getPhoto(photoId));
  }, [dispatch, photoId]);

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
          <div className="photo-show-username">
            <Link 
              to={`/users/${photo?.userId?._id}`}
              className="photo-show-username"
              onClick={() => dispatch(closePhotoShowModal())}
            >
              {photo?.userId?.username}
            </Link>
            </div>
          <Link
            to={`/spots/${photo?.spotId?._id}`}
            className="photo-show-spot"
            onClick={() => dispatch(closePhotoShowModal())}
          >
            {" "}
            Spot: {photo?.spotId?.name}
          </Link>
        </div>
        <div className="photo-show-description">{photo?.description}</div>
        <div className="show-photo-heart">
          {currentUser ? (
            <LikesForm photo={photo} user={user} />
          ) : (
            <p
              className="login-favorite"
              onClick={() => dispatch(openSigninModal())}
            >
              To like, login here!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoShow;
