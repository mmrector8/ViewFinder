import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearSpots, fetchSpot } from "../../store/spot";
import CommentIndexItem from "../CommentIndexItem";
import CommentForm from "../CommentForm";
import { openPhotoShowModal, openSigninModal } from "../../store/ui";
import { months, convertDate } from "../CommentIndexItem";
import "./spotshow.css";
import LoadingSpinner from "../LoadingSpinner";

const SpotShowPage = () => {
  const spot = useSelector((state) => state.spots);
  const currentUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [openWriteComment, setOpenWriteComment] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    dispatch(fetchSpot(spotId));
    return () => dispatch(clearSpots());
  }, [dispatch, spotId]);

  const checkClicked = (e) => {
    if (
      !clicked &&
      !openWriteComment &&
      e.target.className === "open-comment-button"
    ) {
      setOpenWriteComment(true);
      setClicked(true);
    } else if (
      clicked &&
      openWriteComment &&
      e.target.className !== "textarea-for-comments" &&
      e.target.className !== "comment-button"
    ) {
      setClicked(false);
      setOpenWriteComment(false);
    }
  };

  if (!spot || !spot.photos) {
    return <LoadingSpinner />;
  }

  return (
    <div className="spot-show-page-container" onClick={checkClicked}>
      <div className="spot-show-grid-container">
        <div className="upvoted-photos">
          <img
            src={spot.photos?.at(0)?.url}
            alt="most upvoted image"
            className="most-upvoted-image"
            onClick={() => dispatch(openPhotoShowModal(spot.photos[0]))}
          ></img>
          <div className="top-upvoted-photos">
            {spot.photos.slice(1).length > 0
              ? spot?.photos
                  ?.slice(1)
                  .map((photo, i) => (
                    <img
                      src={photo.url}
                      alt="top upvoted photos"
                      key={i}
                      className="top-upvoted-smaller-images"
                      onClick={() => dispatch(openPhotoShowModal(photo))}
                    ></img>
                  ))
              : [1, 2, 3, 4].map((num, i) => (
                  <img
                    src=""
                    alt="top upvoted photos"
                    key={i}
                    className="top-upvoted-smaller-images"
                  ></img>
                ))}
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
            {spot.comments
              ?.map((comment, i) => (
                <CommentIndexItem comment={comment} key={i} />
              ))
              .reverse()}
          </div>
          <div className="spot-info-container">
            <div className="spot-info-item">
              <p>Spot Name: </p>
              <p className="spot-info-items">{spot.name}</p>
            </div>
            <div className="spot-info-item">
              <p>Date: </p>
              <p className="spot-info-items">
                {spot.photos[0] ? convertDate(spot.photos[0]?.updatedAt) : ""}
              </p>
            </div>
            <div className="spot-info-item">
              <p>Best Time of Day: </p>
              <p className="spot-info-items">{spot.photos[0]?.bestTimeOfDay}</p>
            </div>
            <div className="spot-info-item">
              <p>Conditions: </p>
              <div className="spot-info-items">
                {spot.photos[0]?.condition.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </div>
            <div className="spot-info-item">
              <p>Transportation: </p>
              <div className="spot-info-items">
                {spot.photos[0]?.transportation.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotShowPage;
