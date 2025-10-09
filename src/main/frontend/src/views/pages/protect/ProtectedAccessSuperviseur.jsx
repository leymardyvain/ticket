import { getToken } from "api/tokconfig";
import isSuperviseurUser from "./isSuperviseurUser";

const ProtectedAccessSuperviseur = () => {

  const token = getToken();

  return isSuperviseurUser(token);

};

export default ProtectedAccessSuperviseur;