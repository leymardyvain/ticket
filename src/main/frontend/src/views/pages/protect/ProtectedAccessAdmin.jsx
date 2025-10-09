import { getToken } from "api/tokconfig";
import isAdminUser from "./isAdminUser";

const ProtectedAccessAdmin = () => {

  const token = getToken();

  return isAdminUser(token);

};

export default ProtectedAccessAdmin;