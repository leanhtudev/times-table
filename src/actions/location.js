import { locationTypes as types } from './types';
const saveLocation = (name, location) => ({
  type: types.saveLocation,
  name,
  location,
});
export default {
  saveLocation,
};
