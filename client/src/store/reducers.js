import { combineReducers } from "redux";
import dataReducer from "../duck/reducer";
import loginReducer from "../Pages/Login/duck/reducer"
import signupReducer from "../Pages/Register/duck/reducer"




const reducers = combineReducers({
  data: dataReducer, 
  signup: signupReducer,
  login: loginReducer
});

export default reducers;
