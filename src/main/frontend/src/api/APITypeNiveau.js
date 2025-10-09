import axios from 'axios';
import { getToken } from './tokconfig';
import { development, production } from 'api/connexion';

let rurl = process.env.NODE_ENV === "development" ? development() : production();

const apiniveau_criticite = axios.create({
  baseURL: `${rurl}/niveau_criticite`, // our API base URL
});

// Request interceptor for adding the bearer token
apiniveau_criticite.interceptors.request.use(
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

/* apiniveau_criticite.interceptors.response.use(

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
          
          return apiniveau_criticite(originalRequest);
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
export const getNiveau_criticite = () => {
  return apiniveau_criticite.get();
};

export const addNiveau_criticite = (formData) => {
  return apiniveau_criticite.post('', formData);
};

export const updateNiveau_criticite = (userId, formData) => {
  return apiniveau_criticite.put(`/${userId}`, (userId,formData));
};

// Export the api instance
export default apiniveau_criticite;