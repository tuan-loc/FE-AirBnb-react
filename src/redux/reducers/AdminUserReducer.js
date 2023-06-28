import {
  GET_ALL_USER,
  GET_ALL_USER_BY_ID,
  GET_PAGINATION_SEARCH,
  GET_SEARCH_USER_BY_USERS,
} from "redux/actions/types/AminUserType";
import produce from "immer";
const inititalState = {
  // /api/dat-phong
  getAllUser: [],
  //   /api/dat-phong/{id}
  getUserByID: {},
  // /api/dat-phong/lay-theo-nguoi-dung/{MaNguoiDung}
  getPaginationSearching: null,
};
export const AdminUserReducers = (state = inititalState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_ALL_USER:
        draft.getAllUser = action.payload;
        break;
      case GET_ALL_USER_BY_ID:
        draft.getUserByID = action.payload;
        break;
      case GET_PAGINATION_SEARCH:
        draft.getPaginationSearching = action.payload;
        break;
      case GET_SEARCH_USER_BY_USERS:
        draft.getAllUser = action.payload;
        break;

      case "DELETE":
        draft.getUserByID = {};
        break;

      default:
        break;
    }
  });
};
