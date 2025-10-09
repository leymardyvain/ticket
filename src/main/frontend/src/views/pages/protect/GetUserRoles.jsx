import { getToken } from "api/tokconfig";
import isSameUser from "./isSameUser"
import UserRoles from "./UserRoles";


const GetUserRoles = () => {

  const token = getToken();

  return  UserRoles(token);

};

export default GetUserRoles;