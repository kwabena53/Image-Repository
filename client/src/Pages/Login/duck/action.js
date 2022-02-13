import axios from "axios";
import { showSuccessNotification, showErrorNotification} from "../../../Shared/actions/alert.actions";
import { urlEcodedConfig } from "../../../utils/contants";
import Cookies from "js-cookie";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";





export const login = (details, history,) => {


    return async (dispatch) => {
      dispatch({ type: LOGIN_REQUEST });
      try {
        const { data } = await axios.post("/api/user/login",
          details,
          urlEcodedConfig
        );  
       
        console.log("d: ", data)
        if(data.error){
          dispatch(
            showErrorNotification("Action failed", data.error)
          );
          dispatch({
            type: LOGIN_ERROR,
          });
          return
        }

        if (data && data.token) {
          Cookies.set("accessToken", data.token, {
            expires: 7,
          });
          
          showSuccessNotification(
            "Login successful!",
            "You have successfully logged in."
          );

          dispatch({
            type: LOGIN_SUCCESS,
            data
          });
          
          history.go("/")
        }
         
      } catch (error) {
        dispatch({
          type: LOGIN_ERROR,
        });
        console.log("error: ", error.message)
        if (!error.response) {
          dispatch(
            showErrorNotification("Action failed", "Check your internet and try again")
          );
        } else {
          dispatch(
            showErrorNotification(error?.response?.data?.message)
          );
        }
      }
    };
  };