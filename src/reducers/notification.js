import { notificationTypes as types } from './../actions/types';
const initialState = {
  notification: null,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.showNotification:
      return { ...state, notification: action.notification };
    case types.resetNotification:
      return initialState;
    default:
      return state;
  }
};
