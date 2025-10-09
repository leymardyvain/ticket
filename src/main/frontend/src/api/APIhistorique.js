import axios from 'axios';
import { getToken } from './tokconfig';
import { development, production } from 'api/connexion';

let rurl = process.env.NODE_ENV === "development" ? development() : production();

const apihistorique = axios.create({
  baseURL: `${rurl}/historique`, // our API base URL
});

// Request interceptor for adding the bearer token
apihistorique.interceptors.request.use(
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

/* apihistorique.interceptors.response.use(

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
          
          return apihistorique(originalRequest);
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
export const getHistorique = (username) => {
  return apihistorique.get(`/byusername/${username}`, (username));
};

export const getHistorique_Superviseur = (nom_societe) => {
  return apihistorique.get(`/bynom_societe/${nom_societe}`, (nom_societe));
};

export const getHistoriqueBySocieteName = (name) => {
  return apihistorique.get(`/etat_Ticket/${name}`, (name));
};

export const getHistoriqueBySuiviTicketID = (id) => {
  return apihistorique.get(`/historiquebysuivi_Ticket/${id}`, (id));
};

export const addHistorique = (formData) => {
  return apihistorique.post('', formData);
};

export const updateHistorique = (userId, formData) => {
  return apihistorique.put(`/${userId}`, (userId,formData));
};

// Export the api instance
export default apihistorique;