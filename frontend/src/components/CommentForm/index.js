import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createComment, updateComment } from "../../store/spot";
import Tooltip from "@mui/material/Tooltip";
import "./commentform.css";

const CommentForm = ({
  comment,
  setEditCommentOpen,
  setOpenWriteComment,
  setClicked,
}) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [body, setBody] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (comment) {
      setBody(comment.body);
      setIsEdit(true);
    }
  }, [dispatch, spotId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      const data = {
        userId: user._id,
        spotId: spotId,
        body,
      };
      return dispatch(createComment(data))
        .then(() => setOpenWriteComment(false))
        .then(() => setClicked(false))
        .then(() => setBody(""));
    } else {
      const data = {
        ...comment,
        body,
      };
      return dispatch(updateComment(data)).then(() =>
        setEditCommentOpen(false)
      );
    }
  };

  return (
    <form
      onSubmit={handleCommentSubmit}
      className={isEdit ? "" : "for-form-border"}
    >
      <div className="comment-input-container">
        <textarea
          onChange={(e) => setBody(e.target.value)}
          value={body}
          placeholder="Write a comment"
          className={isEdit ? "textarea-for-edits" : "textarea-for-comments"}
        />
        <button
          type="submit"
          className={isEdit ? "edit-button" : "comment-button"}
          onClick={isEdit ? () => setEditCommentOpen(true) : () => {}}
        >
          {isEdit ? (
            <Tooltip title="Edit" arrow placement={"top"}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Tooltip>
          ) : (
            "Comment"
          )}
        </button>
      </div>
    </form>
  );
};
export default CommentForm;
