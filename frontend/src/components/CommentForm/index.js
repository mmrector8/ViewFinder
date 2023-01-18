import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createComment } from "../../store/spot";

const CommentForm = ()=>{
    const {spotId} = useParams();
    const dispatch= useDispatch();
    const user = useSelector((state) => state.session.user)

    const [body, setBody] = useState("")
    const [isEdit, setEdit] = useState(false)

    const handleCommentSubmit = async (e)=>{
        e.preventDefault();
        const data = {
            userId: user._id,
            spotId: spotId,
            body
        }
        return dispatch(createComment(data))
    }

    return (
        <form onSubmit={handleCommentSubmit}>
            <textarea onChange={(e=> setBody(e.target.value))} placeholder="Write a comment"/>
            <button type="submit">Comment</button>
        </form>
    )

}
export default CommentForm;