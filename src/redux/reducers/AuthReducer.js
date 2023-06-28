import produce from "immer";
import { LOGIN_ACTION } from "redux/actions/types/AuthType";

const initialState = {
  userInformation: null,
};

export const Auth = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_ACTION:
        console.log(action.payload);
        draft.userInformation = action.payload;
        break;
      default:
        break;
    }
  });
};
