import { notificationTypes as types } from './types';
const showNotification = (message, type) => {
  const defaultMessage = {
    type: 'error',
    message: 'sf',
    duration: 2000,
  };
  return {
    type: types.showNotification,
    notification: { ...defaultMessage, ...message },
  };
};

const resetNotification = (message) => {
  return {
    type: types.resetNotification,
  };
};
export default {
  showNotification,
  resetNotification,
};
