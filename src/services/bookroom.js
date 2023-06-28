import { baseService } from "./baseService";
export class BookRoom extends baseService {
  // eslint-disable-next-line
  constructor() {
    super();
  }
  //getallroom
  //   /api/dat-phong
  getAllRoom = () => {
    return this.get(`/api/dat-phong`);
  };
  //post room
  //   /api/dat-phong
  postRoom = (data) => {
    return this.post(`/api/dat-phong`, data);
  };
  // getroombyid
  //   /api/dat-phong/{id}
  getRoombyID = (roomid) => {
    return this.get(`/api/dat-phong/${roomid}`);
  };
  //  put /api/dat-phong/{id}
  putRoom = (rommid, data) => {
    return this.put(`/api/dat-phong/${rommid}`, data);
  };
  //  delete /api/dat-phong/{id}
  deleteRoom = (rommid) => {
    return this.delete(`/api/dat-phong/${rommid}`);
  };
  //   /api/dat-phong/lay-theo-nguoi-dung/{MaNguoiDung}
  getRoombyUser = (userid) => {
    return this.get(`/api/dat-phong/lay-theo-nguoi-dung?MaNguoiDung=${userid}`);
  };
}

export const bookroom = new BookRoom();
