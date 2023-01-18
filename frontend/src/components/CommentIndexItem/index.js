

const CommentIndexItem = ({comment})=>{

    return (
        <div className="comment-item">
            <p className="comment-body">{comment.body}</p>
        </div>
    )
}
export default CommentIndexItem;