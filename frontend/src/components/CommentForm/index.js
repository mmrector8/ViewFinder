import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createComment, updateComment } from "../../store/spot";

const CommentForm = ({ comment})=>{
    const {spotId} = useParams();
    const dispatch= useDispatch();
    const user = useSelector((state) => state.session.user)
    const [body, setBody] = useState("")


    useEffect(()=>{
        if(comment){
            setBody(comment.body)
        }
    }, [dispatch, spotId])

    const handleCommentSubmit = async (e)=>{
        e.preventDefault();
        if(!comment){
            const data = {
                userId: user._id,
                spotId: spotId,
                body
            }
            return dispatch(createComment(data))
                .then(() => setBody(""))
        }else{
            const data = {
                ...comment,
                body
            }
            return dispatch(updateComment(data))
        }
        
    }

    return (
        <form onSubmit={handleCommentSubmit}>
            <textarea onChange={(e=> setBody(e.target.value))} value={body} placeholder="Write a comment"/>
            <button type="submit">Comment</button>
        </form>
    )

}
export default CommentForm;