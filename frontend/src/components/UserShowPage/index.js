import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearUser, fetchUser } from "../../store/user";
import "./usershow.css";
import { openPhotoShowModal } from "../../store/ui";
import LoadingSpinner from "../LoadingSpinner";

const UserShowPage = () => {
  const user = useSelector((state) => state.users);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(userId));
    () => dispatch(clearUser());
  }, [dispatch, userId]);

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-show-page-container">
      <div className="top-field">
        <img className="profile-pic" src={user.profilePicUrl}></img>
        <h1 className="profile-title">{user.username}'s Profile</h1>
      </div>
      <div className="user-photo-grid margin-needed-photo">
        {user?.photos?.map((photo, i) => (
          <div className="user-photo-container" key={i}>
            <p
              className="overlay-photo-text-user"
              onMouseEnter={(e) => e.stopPropagation()}
              onMouseLeave={(e) => e.stopPropagation()}
            >
              {photo.description}
            </p>
            <img
              src={photo.url}
              alt="img grid"
              key={i}
              className="location-images"
              onMouseEnter={() => setIsHovered(photo._id)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => dispatch(openPhotoShowModal(photo))}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserShowPage;
