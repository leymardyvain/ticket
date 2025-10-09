import axios from 'axios';
import { getToken } from './tokconfig';
import { development, production } from 'api/connexion';

let rurl = process.env.NODE_ENV === "development" ? development() : production();

const apipersonnel = axios.create({
  baseURL: `${rurl}/personnel`, // our API base URL
});

// Request interceptor for adding the bearer token
apipersonnel.interceptors.request.use(
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

/* apipersonnel.interceptors.response.use(

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
          
          return apipersonnel(originalRequest);
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
export const getPersonnel = () => {
  return apipersonnel.get();
};

export const getPersonnelByUsername = (username) => {
  return apipersonnel.get(`/personnelbynom_societe/${username}`, username);
};

export const getListPersonnelByNomSociete = () => {
  return apipersonnel.get(`/listpersonnelbynom_societe`);
};

export const getListPersonnelAssignateur = () => {
  return apipersonnel.get(`/listallpersonnelAssignateur`);
};

export const getListPersonnelEnCharge = () => {
  return apipersonnel.get(`/listallpersonnelEnCharge`);
};

export const getAllListPersonnelByNomSociete = (assignateur) => {
  return apipersonnel.get(`/listallpersonnelbynom_societe/${assignateur}`, (assignateur));
};

export const getPersonnelByNomPersonnel = (nomPersonnel) => {
  return apipersonnel.get(`/personnelByNomPersonne/${nomPersonnel}`, nomPersonnel);
};

export const getPersonnelByUsernameRapport = (username) => {
  return apipersonnel.get(`/personnelByUsername/${username}`, username);
};

export const addPersonnel = (formData) => {
  return apipersonnel.post('/user/save', formData);
};

export const updatePersonnel = (userId, formData) => {
  return apipersonnel.put(`/${userId}`, (userId, formData));
};

export const updateUserPassword = (formData) => {
  return apiauth.put('/updatePassword', formData);
};

// Export the api instance
export default apipersonnel;