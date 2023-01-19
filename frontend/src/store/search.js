import jwtFetch from "./jwt";

export const RECEIVE_RESULTS = "search/receiveResults";
export const CLEAR_RESULTS = "search/clearResults";

export const receiveResults = (results) => ({
  type: RECEIVE_RESULTS,
  payload: results
});

export const clearResults = () => ({
  type: CLEAR_RESULTS
});

export const fetchResults = (query) => async dispatch => {
  const res = await jwtFetch(`/api/search?type=${query.type}&body=${query.body}`);
  const results = await res.json();
  dispatch(receiveResults(results));
};

const resultsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_RESULTS:
      return { ...action.payload };
    case CLEAR_RESULTS:
      return {};
    default:
      return state;
  }
};

export default resultsReducer;