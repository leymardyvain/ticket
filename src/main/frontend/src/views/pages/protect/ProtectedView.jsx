import { getToken } from "api/tokconfig";
import isSameUser from "./isSameUser"


const ProtectedView = () => {

  const token = getToken();

  return isSameUser(token);

};

export default ProtectedView;