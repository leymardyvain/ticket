import axios from 'axios';
import { getToken } from './tokconfig';
import { development, production } from 'api/connexion';

let rurl = process.env.NODE_ENV === "development" ? development() : production();

const apifichier = axios.create({
  baseURL: `${rurl}/fichier`, // our API base URL
});

// Request interceptor for adding the bearer token
apifichier.interceptors.request.use(
  (config) => {
    const token = getToken(); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints
export const getCountFichier = (numTicket) => {
  return apifichier.get(`/count/${numTicket}`, (numTicket));
};

export const addFichier = (formData) => {
  return apifichier.post('', (formData));
};

export const getFichierByIDTicket = (id_ticket) => {
  return apifichier.get(`/ticket/${id_ticket}`);
};

export const getDownloadFileName = (fileName) => {
  return apifichier.get(`/download/${fileName}`,
    {
      responseType: "blob",
    }
  );
};

export const deleteFileByName = (idFile) => {
  return apifichier.delete(`/${idFile}`);
};

// Export the api instance
export default apifichier;