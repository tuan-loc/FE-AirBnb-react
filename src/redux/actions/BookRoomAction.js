import {
  GET_ALL_ROOM,
  GET_ALL_ROOM_BY_ID,
  GET_ALL_ROOM_BY_USERS,
} from "redux/actions/types/BookroomType";
import { bookroom } from "services/bookroom";

// /api/dat-phong
export const getAllRoomAction = () => {
  return async (dispatch) => {
    try {
      const result = await bookroom.getAllRoom();
      dispatch({
        type: GET_ALL_ROOM,
        payload: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

// POST /api/dat-phong
export const PostRoomAction = (data) => {
  return async (dispatch) => {
    try {
      let result = await bookroom.postRoom(data);
      console.log(result);
    } catch (errors) {
      console.log("errors", errors);
      throw errors;
    }
  };
};

// //api/dat-phong/{id}
export const getRoomByIDAction = (roomid) => {
  return async (dispatch) => {
    try {
      const result = await bookroom.getRoombyID(roomid);
      dispatch({
        type: GET_ALL_ROOM_BY_ID,
        payload: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
//PUT /api/dat-phong/{id}
export const UpdateRoomAction = (roomid, data) => {
  console.log("haha");
  return async (dispatch) => {
    try {
      let result = await bookroom.putRoom(roomid, data);
      console.log("result", result);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};
// api/dat-phong/{id}
export const deleteRooomAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await bookroom.deleteRoom(id);
      console.log("result", result.data.content);
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
//GET /api/dat-phong/lay-theo-nguoi-dung/{MaNguoiDung}
export const getRoomByUserAction = (userid) => {
  return async (dispatch) => {
    try {
      const result = await bookroom.getRoombyUser(userid);
      dispatch({
        type: GET_ALL_ROOM_BY_USERS,
        payload: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
