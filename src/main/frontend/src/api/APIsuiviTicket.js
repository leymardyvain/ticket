import axios from 'axios';
import { getToken } from './tokconfig';
import { development, production } from 'api/connexion';

let rurl = process.env.NODE_ENV === "development" ? development() : production();

const apisuivi_Ticket = axios.create({
  baseURL: `${rurl}/suivi_Ticket`, // our API base URL
});

// Request interceptor for adding the bearer token
apisuivi_Ticket.interceptors.request.use(
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

/* apisuivi_Ticket.interceptors.response.use(

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
          
          return apisuivi_Ticket(originalRequest);
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
export const getSuivi_Ticket = (username) => {
  return apisuivi_Ticket.get(`/byusername/${username}`, (username));
};

export const getRapport = (nom_personnel, nom_etat, nom_type, nom_niveau, nom_personnel_en_charge, nom_personnel_assignateur, date_debut, date_fin) => {
  return apisuivi_Ticket.get(`/rapport/${nom_personnel}/${nom_etat}/${nom_type}/${nom_niveau}/${nom_personnel_en_charge}/${nom_personnel_assignateur}/${date_debut}/${date_fin}`, 
    ( nom_personnel, nom_etat, nom_type, nom_niveau, nom_personnel_en_charge, nom_personnel_assignateur,date_debut,date_fin ));
};

export const getSuivi_Ticket_Superviseur_All_Etat = () => {
  return apisuivi_Ticket.get(`/bynom_societe`);
};

export const getSuivi_Ticket_Superviseur = (nom_societe) => {
  return apisuivi_Ticket.get(`/bynom_societe_en_attente_assignation`);
};

export const getSuivi_Ticket_Superviseur_en_cours_assignation = (username) => {
  return apisuivi_Ticket.get(`/bynom_societe_en_cours_assignation/${username}`, (username));
};

export const getSuivi_Ticket_Superviseur_resolu_Dashboard = (username) => {
  return apisuivi_Ticket.get(`/dashboard_resolu/${username}`, (username));
};

export const getSuivi_Ticket_Superviseur_resolu_Dashboard_Admin = () => {
  return apisuivi_Ticket.get(`/dashboard_resolu_admin`);
};

export const getSuivi_Ticket_Etat_En_Attente_Assignation_Dashboard = (username) => {
  return apisuivi_Ticket.get(`/dashboard_en_attente_assignation/${username}`, (username));
};

export const getSuivi_Ticket_Etat_En_Attente_Assignation_Dashboard_Admin = () => {
  return apisuivi_Ticket.get(`/dashboard_en_attente_assignation_admin`);
};

export const getSuivi_Ticket_Etat_Assigne_Dashboard = (username) => {
  return apisuivi_Ticket.get(`/dashboard_assigne/${username}`, (username));
};

export const getSuivi_Ticket_Etat_Assigne_Dashboard_Admin = () => {
  return apisuivi_Ticket.get(`/dashboard_assigne_admin`);
};

export const getSuivi_Ticket_Superviseur_en_cours_resolution_Admin = () => {
  return apisuivi_Ticket.get(`/dashboard_en_cours_resolution_admin`);
};

export const getSuivi_Ticket_Superviseur_en_cours_resolution = (username) => {
  return apisuivi_Ticket.get(`/bynom_societe_en_cours_resolution/${username}`, (username));
};

export const getSuivi_Ticket_Etat_En_Cours_Resolu_Dashboard = (username) => {
  return apisuivi_Ticket.get(`/dashboard_en_cours_resolution/${username}`, (username));
};

export const getSuivi_Ticket_Superviseur_resolu = (username) => {
  return apisuivi_Ticket.get(`/bynom_societe_resolu/${username}`, (username));
};

export const getSuivi_Ticket_Etat_Resolu_Dashboard = (username) => {
  return apisuivi_Ticket.get(`/dashboard_resolu/${username}`, (username));
};

export const getSuivi_Ticket_Superviseur_ferme = (username) => {
  return apisuivi_Ticket.get(`/bynom_societe_ferme/${username}`, (username));
};

export const getSuivi_Ticket_Etat_Ferme_Dashboard = (username) => {
  return apisuivi_Ticket.get(`/dashboard_ferme/${username}`, (username));
};

export const getSuivi_Ticket_Etat_Ferme_Dashboard_Admin = () => {
  return apisuivi_Ticket.get(`/dashboard_ferme_admin`);
};

export const getMostPopularPersonneEnCharge = (username) => {
  return apisuivi_Ticket.get(`/allSuiviTicketByUsername/${username}`, (username));
};

export const getMostPopularPersonneEnChargeByAdmin = () => {
  return apisuivi_Ticket.get(`/allSuiviTicketByAdmin`);
};

export const getChartAdmin = () => {
  return apisuivi_Ticket.get(`/allSuiviTicketChart`);
};

export const getChartUser = (username) => {
  return apisuivi_Ticket.get(`/allSuiviTicketChartUser/${username}`, (username));
};

export const getSuivi_TicketBySocieteName = (name) => {
  return apisuivi_Ticket.get(`/etat_Ticket/${name}`, (name));
};


export const addSuivi_Ticket = (formData) => {
  return apisuivi_Ticket.post('', formData);
};

export const addconfirmation_suivi_ticket = (formData) => {
  return apisuivi_Ticket.post('/confirmation_suivi_ticket', formData);
};

export const addconfirmationUser_suivi_ticket = (formData) => {
  return apisuivi_Ticket.post('/confirmationUser_suivi_ticket', formData);
};

export const addannulationUser_suivi_ticket = (formData) => {
  return apisuivi_Ticket.post('/annulationUser_suivi_ticket', formData);
};

export const updateSuivi_Ticket = (userId, formData) => {
  return apisuivi_Ticket.put(`/${userId}`, (userId,formData));
};

// Export the api instance
export default apisuivi_Ticket;