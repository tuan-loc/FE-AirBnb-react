import { baseService } from "./baseService";
export class Location extends baseService {
  // eslint-disable-next-line
  constructor() {
    super();
  }
  //getalllocation
  //  /api/vi-tri
  getAllLocation = () => {
    return this.get(`/api/vi-tri`);
  };
  //post location
  // api/vi-tri
  postLocation = (data) => {
    return this.post(`/api/vi-tri`, data);
  };

  // pagination-searching
  //   /api/phong-thue/lay-phong-theo-vi-tri

  paginationSearching = (pageIndex = 1, pageSize = 10, keyword = "") => {
    if (keyword.trim() !== "") {
      return this.get(
        `api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
    } else {
      return this.get(
        `api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`
      );
    }
  };

  //   /api/phong-thue/phan-trang-tim-kiem

  getSearchbyPage = (pageIndex = 1, pageSize = 10, keyword = "") => {
    if (keyword.trim() === "") {
      return this.get(
        `/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
    } else {
      return this.get(
        `/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`
      );
    }
  };

  //get locationbyId
  //   /api/phong-thue/lay-phong-theo-vi-tri

  getLocationbyID = (locationID) => {
    return this.get(`/api/vi-tri/${locationID}`);
  };

  //  PUT /api/vi-tri/{id}
  putLocaitonById = (localtionid, data) => {
    return this.put(`/api/vi-tri/${localtionid}`, data);
  };
  //  delete /api/phong-thue/{id}
  deleteLocaion = (rommid) => {
    return this.delete(`/api/vi-tri/${rommid}`);
  };
  //   /api/dat-phong/lay-theo-nguoi-dung/{MaNguoiDung}
  //  POST /api/users/upload-avatar
  postUploadLocation = (formFile, locaitonId) => {
    return this.post(
      `/api/phong-thue/upload-hinh-phong?maViTri=${locaitonId}`,
      formFile
    );
  };
}

export const location = new Location();
