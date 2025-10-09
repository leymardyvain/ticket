import { jwtDecode } from "jwt-decode";

const isSameUser = (token) => {

  try {
    
    const decoded = jwtDecode(token);
    
    const uname = decoded.sub;

    return uname;

  } catch (error) {

    return null; 
  }
};

export default isSameUser;