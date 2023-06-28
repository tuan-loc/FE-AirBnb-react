import produce from "immer";
import {
  GET_ALL_LOCATION_BY_ID,
  GET_ALL_LOCATION,
} from "redux/actions/types/LocationType";
const inititalState = {
  getAllLocation: [],
  getLocationById: null,
};

export const LocationReducer = (state = inititalState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_ALL_LOCATION:
        draft.getAllLocation = action.payload;
        break;
      case GET_ALL_LOCATION_BY_ID:
        draft.getLocationById = action.payload;
        break;
      case "DELETE_LOCATION":
        draft.getLocationById = null;
        break;
      default:
        break;
    }
  });
};
