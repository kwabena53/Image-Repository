import { notification } from "antd";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "./types";

export const showErrorNotification = (title, description) => {
  return (dispatch) => {
    dispatch({ type: ERROR_NOTIFICATION });
    notification.error({
      message: title,
      description,
    });
  };
};

export const showSuccessNotification = (title, description) => {
  return (dispatch) => {
    dispatch({ type: SUCCESS_NOTIFICATION });
    notification.success({
      message: title,
      description,
    });
  };
};
