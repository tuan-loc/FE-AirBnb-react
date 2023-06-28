import produce from "immer";
import {
  GET_COMMENTS,
  GET_COMMENTS_BY_ROOM,
} from "redux/actions/types/CommentsType";

const inititalState = {
  // /api/binh-luan
  getComments: [],
  // /api/binh-luan/lay-binh-luan-theo-phong/{MaPhong}
  getCommentsWithroom: [],
};
export const CommentsReducer = (state = inititalState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_COMMENTS:
        draft.getComments = action.payload;
        break;
      case GET_COMMENTS_BY_ROOM:
        draft.getCommentsWithroom = action.payload;
        break;
      default:
        break;
    }
  });
};
