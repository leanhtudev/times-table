import { locationTypes as types } from './../actions/types';
const initialState = {
  origin: null,
  destination: null,
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.saveLocation:
      return {
        ...state,
        [action.name]: action.location,
      };
    default:
      return state;
  }
};
