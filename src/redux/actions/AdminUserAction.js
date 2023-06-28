import {
  GET_ALL_USER,
  GET_ALL_USER_BY_ID,
  GET_PAGINATION_SEARCH,
  GET_SEARCH_USER_BY_USERS,
} from "redux/actions/types/AminUserType";

import { adminuser } from "services/adminuser";

//getALL
export const getAllAdminUserAction = () => {
  return async (dispatch) => {
    try {
      const result = await adminuser.getALLUser();
      dispatch({
        type: GET_ALL_USER,
        payload: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
// POST /api/users
export const PostAdminUserAction = (data) => {
  return async (dispatch) => {
    try {
      let result = await adminuser.postAminUser(data);
      console.log(result);
    } catch (errors) {
      throw errors;
    }
  };
};
//DELETE
// api/dat-phong/{id}
export const deleteAdminUserAction = (id) => {
  return async (dispatch) => {
    try {
      await adminuser.deleteAminUser(id);
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

//getALL

export const GetPaginationSearch = (
  pageIndex = 1,
  pageSize = 10,
  keyword = ""
) => {
  return async (dispatch) => {
    try {
      const result = await adminuser.getSearchAminUserbyPage(
        (pageIndex = 1),
        (pageSize = 10),
        (keyword = "")
      );
      if (result.data.statusCode === 200) {
        dispatch({
          type: GET_PAGINATION_SEARCH,
          payload: result.data.content,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

// GETBYID
export const getAdminUserByIDAction = (roomid) => {
  return async (dispatch) => {
    try {
      const result = await adminuser.getAminUserbyID(roomid);
      dispatch({
        type: GET_ALL_USER_BY_ID,
        payload: result.data.content,
      });
    } catch (errors) {
      console.log(errors);
    }
  };
};
//PUT
export const UpdateAdminUserAction = (userid, data) => {
  return async (dispatch) => {
    try {
      await adminuser.putAminUser(userid, data);
    } catch (errors) {
      throw errors;
    }
  };
};

// GETBYName
export const getAdminUserByNameUserAction = (roomid) => {
  return async (dispatch) => {
    try {
      const result = await adminuser.getSearchNameUser(roomid);
      dispatch({
        type: GET_SEARCH_USER_BY_USERS,
        payload: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

// POST /api/users
export const UpLoadAvatarUserAction = (data) => {
  return async (dispatch) => {
    try {
      let result = await adminuser.postUploadAminUserAvatar(data);
      console.log(result);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};
