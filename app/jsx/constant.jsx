export const BASE_URL = 'http://localhost:3000';
export const VIOLATIONS_URL = BASE_URL + '/violations';
export const NEW_URL = BASE_URL + '/create';
export const BASE_URL_API = BASE_URL + '/api/';
export const VIOLATIONS_API = BASE_URL_API+ '/violations';
export const LOCATIONS_API = BASE_URL_API + '/locations/'
export const API_USER_INFO_URL = BASE_URL + '/api/users/';
export const API_SIGN_UP_URL = BASE_URL + '/api/sign_up';
export const API_USER_UPDATE_URL = BASE_URL + '/api/users/';
export const API_SIGN_IN_URL = BASE_URL + '/api/sign_in';
export const API_SIGN_OUT_URL = BASE_URL + '/api/sign_out';
export const SIGN_UP_URL = '/signup';
export const SIGN_IN_URL = BASE_URL + '/login';
export const USERS_API = BASE_URL_API+ '/users';
export const USER_INFO_URL = BASE_URL + '/users/';
export const CURRENT_USER_INFO_URL = BASE_URL + '/my-profile';
export const CREATE_LOCATION_URL = BASE_URL + '/new-location';
export const USERS_IMPORT = BASE_URL + '/users-import';

let header = {}

if (localStorage.grUser != null) {
  header = {
    headers: {
      'USER-TOKEN': JSON.parse(localStorage.grUser).USER_TOKEN
    }
  }
}
export const headers = header;
export const DEFAULT_AVATAR = 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg';
let alertOptions = {
  offset: 14,
  position: 'top right',
  theme: 'dark',
  time: 5000,
  transition: 'scale'
}
export const ALERT_OPTIONS = alertOptions;

let config_firebase = {
  apiKey: "AIzaSyCOJT76DNusqTAFJbJpqUtR5L8VTQsLvkU",
  authDomain: "secure-site-174215.firebaseapp.com",
  databaseURL: "https://secure-site-174215.firebaseio.com",
  projectId: "secure-site-174215",
  storageBucket: "secure-site-174215.appspot.com",
  messagingSenderId: "320676314657"
};
export const CONFIG_FIREBASE = config_firebase;
