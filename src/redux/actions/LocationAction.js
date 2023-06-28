import {
  GET_ALL_LOCATION_BY_ID,
  GET_ALL_LOCATION,
} from "redux/actions/types/LocationType";

import { location } from "services/location";

//getALL
export const getAlllocationAction = () => {
  return async (dispatch) => {
    try {
      const result = await location.getAllLocation();
      dispatch({
        type: GET_ALL_LOCATION,
        payload: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
// POST location
export const PostlocationAction = (data) => {
  return async (dispatch) => {
    try {
      let result = await location.postLocation(data);
      console.log(result);
    } catch (errors) {
      throw errors;
    }
  };
};
export const GetPaginationSearchLocationAction = (
  pageIndex = 1,
  pageSize = 10,
  keyword = ""
) => {
  return async (dispatch) => {
    console.log(pageIndex, pageSize);
    try {
      const result = await location.getSearchbyPage(
        pageIndex,
        pageSize,
        keyword
      );
      console.log(result);
      if (result.data.statusCode === 200) {
        dispatch({
          type: GET_ALL_LOCATION,
          payload: result.data.content,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

// GETBYID
export const getlocationByIDAction = (roomid) => {
  return async (dispatch) => {
    try {
      const result = await location.getLocationbyID(roomid);
      dispatch({
        type: GET_ALL_LOCATION_BY_ID,
        payload: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

//PUT
export const UpdatelocationAction = (locationID, data) => {
  return async (dispatch) => {
    try {
      let result = await location.putLocaitonById(locationID, data);
      console.log("result", result);
    } catch (errors) {
      throw errors;
    }
  };
};
//DELETE

export const deletelocationAction = (id) => {
  console.log(id);
  return async (dispatch) => {
    try {
      const result = await location.deleteLocaion(id);

      console.log("result", result.data.content);
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

//getALL

// POST /api/users
export const UpLoadAvatarLocatinAction = (data) => {
  return async (dispatch) => {
    try {
      let result = await location.postUploadLocation(data);
      console.log(result);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};
