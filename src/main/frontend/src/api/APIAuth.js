import axios from 'axios';
import { getToken } from './tokconfig';
import { development, production } from './connexion';

//const url = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URL_DEVELOPMENT : process.env.REACT_APP_URL_PRODUCTION;

let state = process.env.NODE_ENV;

let rurl = null;

  if(state === "development"){
    rurl = development();
  }
  else{
    rurl = production();
  }

const apiauth = axios.create({
  baseURL: rurl, // our API base URL
});

// Request interceptor for adding the bearer token
apiauth.interceptors.request.use(
  (config) => {
    const token = getToken(); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*axios.interceptors.response.use(
  
  (response) => response,
  
  async (error) => {
  
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
  
      originalRequest._retry = true;
  
      const newAccessToken = await handleTokenExpiration();
  
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

apiauth.interceptors.response.use(
  
  (response) => response,
  
  async (error) => {
  
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
  
      originalRequest._retry = true;

      const refreshtoken = getRefreshToken();

      console.log("dans response check refresh token");

      if (refreshtoken || !isTokenExpired(refreshtoken)) {
        
        console.log("dans if");

        console.log("originalRequest ",originalRequest);

        localStorage.removeItem('[[@^]7893T##5267');

        const responseToken = await apirefreshtoken();

        console.log('responseToken ', responseToken);
        
        localStorage.setItem('[[@^]7893T##5267', encryptAES(responseToken.data.access_token));

        const newAccessToken = getToken();
        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        return apiauth(originalRequest);
      }
      else {
        
        console.log("dans else");

        localStorage.removeItem('[[@^]7893T##5267'); // Clear expired token
        localStorage.removeItem('{{@^]1234R**PMLK');
        
        return  navigate('/login', { replace: true});;
      }

    }

    return Promise.reject(error)
  },
);*/

// API endpoints
export const getUser = (username) => {
  return apiauth.get(`/getuserByUsername/${username}`);
};

export const getRole = (role) => {
  return apiauth.get(`/getroleByRoleName/${role}`);
};

export const getAllRole = () => {
  return apiauth.get(`/getAllRole`);
};

export const getAllUser = () => {
  return apiauth.get(`/getAllUser`);
};

export const createUser = (formData) => {
  return apiauth.post('/user/save', formData);
};

export const setRegister = (formData) => {
  return apiauth.post(`/signup/${formData}`);
};

export const setAddtouser = (formData) => {
  return apiauth.post('/role/addtouser', formData);
};

export const setDeletetouser = (formData) => {
  return apiauth.post('/role/deletetouser', formData);
};

export const updateUserPassword = (formData) => {
  return apiauth.put('/update', formData);
};

// Export the apiauth instance
export default apiauth;