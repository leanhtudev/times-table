import { combineReducers } from 'redux';
import { locationReducer } from './locations';
import { notificationReducer } from './notification';

// export root reducer
const index = combineReducers({
  location: locationReducer,
  notification: notificationReducer,
});
export default index;
