import * as ActionTypes from "../Actions/ActionTypes";
import axios from 'axios';
import { HOST_URL } from "../../Settings";

export const authSuccess = tokens => {
    return{
        type: ActionTypes.AUTH_SUCCESS,
        tokens
    }
} 

export const authCheckState = () => {
  return dispatch => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    if (tokens === undefined || tokens === null) {
    //  dispatch(logoutAuthCheckState());
      } else {
          const url = `${HOST_URL}/api/token/verify/`;
            axios.post(url, {token: tokens.access} )
            .then(resp=>{
                console.log(resp.data)
                dispatch(authSuccess(tokens));
            })
            .catch (error=>{
                console.log(error)
              //  dispatch(logoutAuthCheckState());
            })
         //  dispatch(authSuccess(user));
      }
    }
  };
