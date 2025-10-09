import { useEffect } from "react";
import { useNavigate } from "react-router";
import apirefreshtoken from "api/APIRefreshToken";

import { getToken } from 'api/tokconfig';
import { getRefreshToken } from 'api/refreshconfig';
import isTokenExpired from "./isTokenExpired";
import encryptAES from "../Encrypt/authEncrypt";

const ProtectedRoutes = ({ children }) => {

  const token = getToken();

  const refreshtoken = getRefreshToken();

  const navigate = useNavigate();

  function checkToken() {

    if (!token || isTokenExpired(token)) {


      if (refreshtoken || !isTokenExpired(refreshtoken)) {
        localStorage.removeItem('[[@^]7893T##5267');
        refreshToken();
      }
      else {
        localStorage.removeItem('[[@^]7893T##5267'); // Clear expired token
        return navigate('/pages/login', { replace: true });;
      }

    }

  }

  useEffect(() => {
    checkToken();
  }, [token])

  return children;
};

const refreshToken = async () => {
  try {
    const response = await apirefreshtoken();
    localStorage.setItem('[[@^]7893T##5267', encryptAES(response.data.access_token));
  }
  catch (error) {

    console.log('error refresh token ', error)

    const originalRequest = error.config;

    if (error.response.status === 500 || error.response.status === 403) {

      originalRequest._retry = true;

      const refreshtoken = getRefreshToken();

      if (!isTokenExpired(refreshtoken)) {

        localStorage.removeItem('[[@^]7893T##5267');

        const responseToken = await apirefreshtoken();

        console.log('responseToken ', responseToken);

        localStorage.setItem('[[@^]7893T##5267', encryptAES(responseToken.data.access_token));

        console.log("refresh ", responseToken.data.refresh_token);
        
        console.log("access ", responseToken.data.access_token);

        const newAccessToken = getToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiprojet(originalRequest);
      }
      else {

        console.log("dans else");

        localStorage.removeItem('[[@^]7893T##5267'); // Clear expired token
        localStorage.removeItem('{{@^]1234R**PMLK');

        return navigate('/pages/login', { replace: true });;
      }

    }
  }

}

export default ProtectedRoutes;