import "./commentitem.css"

const CommentIndexItem = ({comment})=>{

    const months = {
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

    const convertDate = (commentDate) => {
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

    if(!comment){
        return null
    }

    return (
        <div className="comment-item">
            <div className="name-and-profile-comment">
                <img src="prof-pic" className="comment-prof-pic"></img>
                <p className='username-for-comment'>{comment.userId.username}</p>
            </div>
            <p className="comment-date">{convertDate(comment.updatedAt)}</p>
            <p className="comment-body">{comment.body}</p>
        </div>
    )
}
export default CommentIndexItem;