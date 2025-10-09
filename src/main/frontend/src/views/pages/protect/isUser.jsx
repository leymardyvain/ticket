import { jwtDecode } from "jwt-decode";

const isUser = (token) => {

  try {
    
    const decoded = jwtDecode(token);
    
    const roles = decoded.roles;

    let find = roles.find(rol => rol === 'ROLE_USER');

    if(find){
      return true;
    }

    return false;

  } catch (error) {

    return false; // If token is invalid, treat it as expired
  }
};

export default isUser;