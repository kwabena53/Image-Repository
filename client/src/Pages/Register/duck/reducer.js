import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./action";

const INITIAL_STATE = {
  signingUp: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type } = action;

  switch (type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        signingUp: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signingUp: false,
      };
    default:
      return state;
  }
}
