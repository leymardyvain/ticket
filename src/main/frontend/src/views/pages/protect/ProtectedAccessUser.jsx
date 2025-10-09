import { getToken } from "api/tokconfig";
import isUser from "./isUser";

const ProtectedAccessUser = () => {

  const token = getToken();

  return isUser(token);

};

export default ProtectedAccessUser;