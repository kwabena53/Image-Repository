
import {
    LOGIN_SUCCESS,
    LOGIN_ERROR, 
    LOGIN_REQUEST,
  
  } from "./action";

  const INITIAL_STATE = {
    loggingIn: false,
  };

  export default function reducer (state = INITIAL_STATE, action = { type: "" }) {
    const { type } = action;
  
    switch (type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loggingIn: true,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...action.data,
          loggingIn: false,
        };
      case LOGIN_ERROR:
        return {
          ...state,
          loggingIn: false,
        };
      default:
        return state;
    }
  }