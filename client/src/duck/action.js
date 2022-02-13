import axios from "axios";
import { urlEcodedConfig } from "../utils/contants";
import { normalizeData, saveLike } from "../utils/helper";

export const GET_DATA_REQUEST = "GET_DATA_REQUEST"
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS"
export const GET_DATA_ERROR = "GET_DATA_ERROR"
export const CLICK_LIKE = "CLICK_LIKE"
export const CLICK_MY_LIKE = "CLICK_MY_LIKE"

export const GET_PUBLIC_IMAGE_REQUEST = "GET_PUBLIC_IMAGE_REQUEST"
export const GET_PUBLIC_IMAGE_SUCCESS = "GET_PUBLIC_IMAGE_SUCCESS"
export const GET_PUBLIC_IMAGE_ERROR = "GET_PUBLIC_IMAGE_ERROR"


export const GET_USER_IMAGE_REQUEST = "GET_USER_IMAGE_REQUEST"
export const GET_USER_IMAGE_SUCCESS = "GET_USER_IMAGE_SUCCESS"
export const GET_USER_IMAGE_ERROR = "GET_USER_IMAGE_ERROR"

const REACT_APP_NASA_API = process.env.REACT_APP_NASA_API
const REACT_APP_NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY



export const getData = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_DATA_REQUEST,
        });
        
        //Ends  today
        const date = new Date()
        const end_date = date.toISOString().slice(0, 10).toString()

        //starts 7 days from today
        date.setDate(date.getDate() - 7)
        const start_date = date.toISOString().slice(0, 10).toString()
        
        try {
            let { data } = await axios.get(
                `${REACT_APP_NASA_API}?api_key=${REACT_APP_NASA_API_KEY}&start_date=${start_date}&end_date=${end_date}`,
            );

            data = normalizeData(data)

            dispatch({
                type: GET_DATA_SUCCESS,
                data
            });

            localStorage.setItem("storedApods", JSON.stringify(data))
            
        } catch (error) {
            if (!error.response) {
                dispatch({
                    type: GET_DATA_ERROR,
                    error: "Action failed Check your internet and try again"
                });
                
            } else {
                dispatch({
                    type: GET_DATA_ERROR,
                    error: error?.message
                });
            }
        }
    };
}

export const clickLikeButton =(isLiked, id)=>{

    return(dispatch)=>{
        try{
            saveLike(isLiked, id)

            dispatch({
                    type: CLICK_LIKE,
                    isLiked,
                    id
                })
        }catch (error){
            dispatch({
                type: GET_DATA_ERROR,
                error: "Couldn't save like"
            });
        }
    }
   
}

export const getPublicImgs = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_PUBLIC_IMAGE_REQUEST,
        });
        
        
        try {
            let { data } = await axios.get('/api/images', urlEcodedConfig)
            

            dispatch({
                type: GET_PUBLIC_IMAGE_SUCCESS,
                data
            });

            
        } catch (error) {
            dispatch({
                type: GET_PUBLIC_IMAGE_ERROR,
            })
           
        }
    };
}


export const getUserImgs = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_USER_IMAGE_REQUEST,
        });
        
       
        try {
            let { data } = await axios.get('/api/images',urlEcodedConfig )
            

            dispatch({
                type: GET_USER_IMAGE_SUCCESS,
                data
            });

            
        } catch (error) {
            dispatch({
                type: GET_USER_IMAGE_ERROR,
            })
           
        }
    };
}
