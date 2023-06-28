import { comments } from "services/comment";
import { GET_COMMENTS, GET_COMMENTS_BY_ROOM } from "./types/CommentsType";

// /api/binh-luan
export const getAllCommentsAction = () => {
  return async (dispatch) => {
    try {
      const result = await comments.getComments();
      dispatch({
        type: GET_COMMENTS,
        payload: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

// /api/binh-luan
export const PostCommentAction = (data) => {
  return async (dispatch) => {
    try {
      let result = await comments.postComment(data);
      console.log(result);
    } catch (errors) {
      console.log(errors.response?.data);
      throw errors;
    }
  };
};
// /api/binh-luan/{id}
export const UpdateCommentAction = (id, data) => {
  return async (dispatch) => {
    try {
      let result = await comments.putComment(id, data);
      console.log("result", result);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};
// /api/binh-luan/{id}
export const deleteCommentAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await comments.deleteComment(id);
      console.log("result", result.data.content);
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
// /api/binh-luan/lay-binh-luan-theo-phong/{MaPhong}
export const getCommentByRoomAction = (roomid) => {
  return async (dispatch) => {
    try {
      const result = await comments.getCommentsbyRoom(roomid);
      dispatch({
        type: GET_COMMENTS_BY_ROOM,
        payload: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
