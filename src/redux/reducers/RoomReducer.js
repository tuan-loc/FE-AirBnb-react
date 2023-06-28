import {
  GET_ALL_RENTAL_ROOM,
  GET_ALL_RENTAL_ROOM_BY_ID,
  GET_SEARCH_RENTAL_ROOM_BY_LOCATION,
} from "redux/actions/types/RoomType";
import produce from "immer";
const inititalState = {
  // /api/dat-phong
  getAllRenderRoom: [],
  //   /api/dat-phong/{id}
  getRenderRoomrByID: null,
  // /api/dat-phong/lay-theo-nguoi-dung/{MaNguoiDung}
  getPaginationSearchingRenderRoom: null,
  getSearchByRenderRoom: null,
};
export const RoomReducers = (state = inititalState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_ALL_RENTAL_ROOM:
        draft.getAllRenderRoom = action.payload;
        break;
      case GET_ALL_RENTAL_ROOM_BY_ID:
        draft.getRenderRoomrByID = action.payload;
        break;
      case "DELETE_ROOM":
        draft.getRenderRoomrByID = null;
        break;

      default:
        break;
    }
  });
};
