const DEV_API_URL = 'http://localhost:3000';
const PROD_API_URL = 'https://unica-backend-55c11e8062f3.herokuapp.com/';

export const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;