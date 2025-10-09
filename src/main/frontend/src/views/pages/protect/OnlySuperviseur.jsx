import { useEffect } from "react";
import { useNavigate } from "react-router";
import ProtectedAccessSuperviseur from "./ProtectedAccessSuperviseur";

const OnlySuperviseur = ({ children }) => {

  const superviseur = ProtectedAccessSuperviseur();
  const navigate = useNavigate();

  function checkRole() {

    if (!superviseur) {
      console.log( 'is superviseur ', superviseur)
      return navigate('/dashboard/default', { replace: true });;
    }

  };

  useEffect(() => {
    checkRole();
  }, [superviseur]);

  return children;

};

export default OnlySuperviseur;