import { auth } from "services/auth";
import { LOGIN_ACTION } from "./types/AuthType";
// /api/auth/signin .loginacttion

export const LoginAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await auth.signin(data);
      dispatch({
        type: LOGIN_ACTION,
        payload: result.data.content.user,
      });
      localStorage.setItem("token", result.data.content.token);
      localStorage.setItem("data", JSON.stringify(data));
    } catch (error) {
      throw error;
    }
  };
};

// /api/auth/signup

export const RegisterAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await auth.signup(data);

      if (result.data.statusCode === 200) {
        dispatch({
          type: LOGIN_ACTION,
          payload: result.data.content,
        });
      }
      console.log("result", result);
    } catch (error) {
      throw error;
    }
  };
};
