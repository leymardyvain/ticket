import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {

  try {
    
    const decoded = jwtDecode(token);
    
    const currentTime = Date.now() / 1000; // Convert to seconds

   return decoded.exp < currentTime; // True if expired

  } catch (error) {

    return true; // If token is invalid, treat it as expired
  }
};

export default isTokenExpired;