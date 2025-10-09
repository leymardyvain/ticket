import { jwtDecode } from "jwt-decode";



const UserRoles = (token) => {

  try {

    const decoded = jwtDecode(token);

    const roles = decoded.roles;
    
    return roles;

  } catch (error) {

    return {}; // If token is invalid, treat it as expired
  }
};

export default UserRoles;