import axios from "axios";


import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../Shared/actions/alert.actions";
import { urlEcodedConfig } from "../../../utils/contants";


export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signup = (details, history) => {
  

  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
      const {data} = await axios.post("/api/user/register",
        details,
        urlEcodedConfig
      );

      if(data.error){
        dispatch(
          showErrorNotification("Action failed", data.error)
        );
        dispatch({
          type: SIGNUP_SUCCESS,
        });
        return
      }

      dispatch({
        type: SIGNUP_SUCCESS,
      });
      dispatch(showSuccessNotification("Registeration Successful!"));
      history.push("/login")

    } catch (error) {
      if (error.response.status === 422) {
        dispatch({
          type: SIGNUP_ERROR,
        });
       
      } else {
        dispatch({
          type: SIGNUP_ERROR,
        });
        if (!error.response) {
          dispatch(
            showErrorNotification("Action failed", "Check your internet and try again")
          );
        } else {
          console.log(error.response)
          
        }
      }
    }
  };
};