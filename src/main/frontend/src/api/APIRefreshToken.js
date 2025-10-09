import axios from 'axios';
import { getRefreshToken } from './refreshconfig';
import { development, production } from 'api/connexion';

let rurl = process.env.NODE_ENV ==="development" ? development() : production() ;

const apirefreshtoken = axios.create({
   baseURL: `${rurl}/token/refreshtoken`, // our API base URL
});

// Request interceptor for adding the bearer token
apirefreshtoken.interceptors.request.use(
  (config) => {
    const refreshtoken = getRefreshToken(); // Assuming you store the token in localStorage
    if (refreshtoken) {
      config.headers.Authorization = `Bearer ${refreshtoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the apirefreshtoken instance
export default apirefreshtoken;