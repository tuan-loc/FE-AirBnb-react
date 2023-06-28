import produce from "immer";
import {
  GET_ALL_ROOM,
  GET_ALL_ROOM_BY_ID,
  GET_ALL_ROOM_BY_USERS,
} from "redux/actions/types/BookroomType";

const inititalState = {
  // /api/dat-phong
  getAllRoom: [],
  //   /api/dat-phong/{id}
  getRoomByID: null,
  // /api/dat-phong/lay-theo-nguoi-dung/{MaNguoiDung}
  getRoomByUser: null,
};
export const BookRoomReducer = (state = inititalState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_ALL_ROOM:
        draft.getAllRoom = action.payload;
        break;
      case GET_ALL_ROOM_BY_ID:
        draft.getRoomByID = action.payload;
        break;
      case GET_ALL_ROOM_BY_USERS:
        draft.getRoomByUser = action.payload;
        break;
      default:
        break;
    }
  });
};
