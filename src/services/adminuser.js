import { baseService } from "./baseService";
export class AdminUser extends baseService {
  // eslint-disable-next-line
  constructor() {
    super();
  }
  //   /api/users
  getALLUser = () => {
    return this.get(`/api/users`);
  };
  //  POST /api/users
  postAminUser = (data) => {
    return this.post(`/api/users`, data);
  };

  //  DELETE /api/users
  deleteAminUser = (userid) => {
    return this.delete(`/api/users?id=${userid}`);
  };

  //get pagination-searching
  //   /api/users/phan-trang-tim-kiem

  getSearchAminUserbyPage = (pageIndex = 1, pageSize = 10, keyword = "") => {
    if (keyword.trim() !== "") {
      return this.get(
        `/api/users/phan-trang-tim-kiempageIndex=${pageIndex}&pageSize=${pageSize}`
      );
    } else {
      return this.get(
        `/api/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`
      );
    }
  };

  //   /api/users/{id}
  getAminUserbyID = (userid) => {
    return this.get(`/api/users/${userid}`);
  };

  putAminUser = (id, data) => {
    return this.put(`/api/users/${id}`, data);
  };
  //   /api/users/search/{TenNguoiDung}

  getSearchNameUser = (nameUser) => {
    return this.get(`/api/users/search/${nameUser}`);
  };
  //  POST /api/users/upload-avatar
  postUploadAminUserAvatar = (formFile) => {
    return this.post(`/api/users/upload-avatar`, formFile);
  };
}

export const adminuser = new AdminUser();
