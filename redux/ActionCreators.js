import * as ActionTypes from './ActionTypes';
import { baseUrl } from './baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestSignup = (creds) => {
  return {
    type: ActionTypes.SIGNUP_REQUEST,
    creds
  }
}

export const receiveSignup = (response) => {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    token: response.token,
    id: response.id
  }
}

export const signupError = (message) => {
  return {
    type: ActionTypes.SIGNUP_FAILURE,
    message
  }
}

export const signupUser = (creds) => (dispatch) => {
  dispatch(requestSignup(creds))

  return fetch(baseUrl + 'users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      else if (!response.ok) {
        alert('ERROR:' + ' ' + 'Failed to load response!');
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        AsyncStorage.setItem('token', response.token);
        AsyncStorage.setItem('creds', JSON.stringify(creds));
        AsyncStorage.setItem('id', response.id);

        dispatch(receiveSignup(response));
      }
      else {
        var error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(signupError(error.message)))
};

