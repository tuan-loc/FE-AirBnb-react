import { baseService } from "./baseService";
export class Comments extends baseService {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  getComments = () => {
    return this.get(`/api/binh-luan`);
  };

  postComment = (data) => {
    return this.post(`/api/binh-luan`, data);
  };

  putComment = (id, data) => {
    return this.put(`/api/binh-luan/${id}`, data);
  };
  deleteComment = (id) => {
    return this.delete(`/api/binh-luan/${id}`);
  };
  getCommentsbyRoom = (roomid) => {
    return this.get(`/api/binh-luan/lay-binh-luan-theo-phong/${roomid}`);
  };
}

export const comments = new Comments();
