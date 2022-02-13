

import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken");

export const REACT_APP_BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL

export const urlEcodedConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
};

export const authHeader = {
  headers: {
    "x-access-token": accessToken,
    "Accept": "application/json",
  "Content-Type": "application/json"
  },
}



export const removeCookies = () => {
    try {
        Cookies.remove("accessToken")
    } catch (e) {
        console.log(e)
    }
  };