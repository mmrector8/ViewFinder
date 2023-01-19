import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createComment, updateComment } from "../../store/spot";

const CommentForm = ({ comment, setEditCommentOpen})=>{
    const {spotId} = useParams();
    const dispatch= useDispatch();
    const user = useSelector((state) => state.session.user)
    const [body, setBody] = useState("")
    const [isEdit, setIsEdit] = useState(false)


    useEffect(()=>{
        if(comment){
            setBody(comment.body)
            setIsEdit(true)
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
                .then(()=> setEditCommentOpen(false))
        }
        
    }

    return (
        <form onSubmit={handleCommentSubmit}>
            <textarea onChange={(e=> setBody(e.target.value))} value={body} placeholder="Write a comment"/>
            <button type="submit">{isEdit? "Edit" : "Comment"}</button>
        </form>
    )

}
export default CommentForm;