import * as ActionTypes from "../Actions/ActionTypes";
import { updateObject } from "../Utility";

const initialState = {
  atoken: null,
  rtoken: null,
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    atoken: action.tokens.token,
  //  rtoken: action.tokens.refresh,
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS:
      return authSuccess(state, action); 
    default:
      return state;
  }
};

export default reducer;