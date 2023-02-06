import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { deleteComment } from "../../store/spot";
import CommentForm from "../CommentForm";
import "./commentitem.css"
import Tooltip from '@mui/material/Tooltip';

export const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

export const convertDate = (commentDate) => {
    const date = commentDate.toString();
    const year = date.slice(0, 4)
    const month = parseInt(date.slice(5, 7))
    let day;
    if (date[8] === '0') {
        day = date.slice(9, 10)
    } else {
        day = date.slice(8, 10)
    }
    let convertedDate = `${months[month]} ${day}, ${year}`
    return convertedDate;
}

const CommentIndexItem = ({comment})=>{
    const currentUser = useSelector((state=> state.session.user))
    const dispatch = useDispatch();
    const [editCommentOpen, setEditCommentOpen] = useState(false)

    if (!comment) {
        return null
    }

    return (
      <div className="comment-item">
        <div className="name-and-profile-comment">
          <img
            src={comment.userId.profilePicUrl}
            className="comment-prof-pic"
          ></img>
          <a href={`/users/${comment?.userId?._id}`}id="username-for-comment">{comment?.userId?.username}</a>
        </div>
        <p className="comment-date">{convertDate(comment?.updatedAt)}</p>
        <div className="edit-delete-and-body">
          {currentUser && editCommentOpen ? (
            <CommentForm
              comment={comment}
              setEditCommentOpen={setEditCommentOpen}
            />
          ) : (
            <p className="comment-body">{comment?.body}</p>
          )}
          <div className="edit-and-delete-buttons-container">
            {(!!currentUser &&
            comment?.userId?._id === currentUser?._id) &&
            !editCommentOpen ? (
              <Tooltip title="Edit" arrow placement={"top"}>
                <button
                  onClick={() => setEditCommentOpen(true)}
                  className="edit-button"
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </Tooltip>
            ) : (
              ""
            )}
            {currentUser !== null && comment?.userId?._id === currentUser?._id ? (
              <Tooltip title="Delete" arrow placement={"top"}>
                <button
                  onClick={() => dispatch(deleteComment(comment._id))}
                  className="delete-button"
                >
                  <i className="fa-regular fa-square-minus"></i>
                </button>
              </Tooltip>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
}
export default CommentIndexItem;