import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { createLogger } from 'redux-logger';
import index from './reducers';

// Create client alias
// Used in action creators
const client = axios.create({
  baseURL: 'https://api.digitransit.fi',
  responseType: 'json',
});

// Axios interceptor configs
const options = {
  returnRejectedPromiseOnError: true,
  interceptors: {
    request: [
      async ({}, config) => {
        return config;
      },
    ],
    response: [
      {
        success: ({}, response) => {
          return response;
        },
        error: async ({}, error) => {
          return Promise.reject(error);
        },
      },
    ],
  },
};

// Define middleware to use
const middleware = [thunk, axiosMiddleware(client, options)];
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
  const logger = createLogger();
  middleware.push(logger);
}

const tools = [applyMiddleware(...middleware)];
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  tools.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

// Create redux store
const store = createStore(index, compose(...tools));

export { store };
