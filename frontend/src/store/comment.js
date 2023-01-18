import jwtFetch from './jwt';

//  const RECEIVE_NEW_COMMENT = "comments/RECEIVE_NEW_COMMENT";
// const RECEIVE_COMMENT_ERRORS = "comments/RECEIVE_COMMENT_ERRORS";
// const CLEAR_COMMENT_ERRORS = "comments/CLEAR_COMMENT_ERRORS";

// export const receiveNewComment = (comment)=>{
//     console.log("hitting receive new comment", comment)
//     return {
//         type: RECEIVE_NEW_COMMENT,
//          comment
//     }
// }

// const receiveErrors = errors => ({
//     type: RECEIVE_COMMENT_ERRORS,
//     errors
// });

// export const clearCommentErrors = errors => ({
//     type: CLEAR_COMMENT_ERRORS,
//     errors
// });

// export const createComment = data => async dispatch => {
//     // console.log(data.spotId)
//     try {
//         console.log('hitting try')
//         const res = await jwtFetch(`/api/comments/spots/${data.spotId}`, {
//             method: 'POST',
//             body: JSON.stringify(data)
//         });
//         const comment = await res.json();
//         console.log(comment, 'hitting comment')
//         dispatch(receiveNewComment(comment));
//     } catch (err) {
//         console.log('hitting errors')
//         const resBody = await err.json();
//         if (resBody.statusCode === 400) {
//             return dispatch(receiveErrors(resBody.errors));
//         }
//     }
// };

// const nullErrors = null;

// export const commentErrorsReducer = (state = nullErrors, action) => {
//     switch (action.type) {
//         case RECEIVE_COMMENT_ERRORS:
//             return action.errors;
//         case RECEIVE_NEW_COMMENT:
//         case CLEAR_COMMENT_ERRORS:
//             return nullErrors;
//         default:
//             return state;
//     }
// };

// const commentsReducer = (state = {}, action) => {
//     switch (action.type) {
//         case RECEIVE_NEW_COMMENT:
//             return { ...state, spots : {comments: [action.comment]} };
//         default:
//             return state;
//     }
// };

// export default commentsReducer;