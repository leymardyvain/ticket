import { Checkbox, Chip, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { getListPersonnelByNomSociete } from "../../api/APIpersonnel";
import { useEffect, useState } from "react";

export default function AssignationUserTable({ data, selected, setSelected }) {

  const [listPersonnel, setListPersonnel] = useState([]);

  const fetchDataGetPersonnelFromSameSociete = async () => {
    try {
      const response = await getListPersonnelByNomSociete();
      setListPersonnel(response.data);
    } catch (error) {
      console.error('Error fetching list personnel by societe:', error);
    }
  };

  useEffect(() => {
    fetchDataGetPersonnelFromSameSociete();
    // console.log(`${item.role_name}`)
  }, [data]);

  const getDynamicAttribution = (roles) => {

    roles.forEach(item => {
      if (item.role_name === 'ROLE_USER') {
        const isPresent = roles.some(elem => elem === item)
        console.log(isPresent)
      }
      return false;
    });
  };

  const handleClick = (event, name) => {
    setSelected(name);
  };

  const getDynamicColorRole = (role) => {

    switch (role) {
      case 'ROLE_USER':
        return "#2087e6ff";
      case 'ROLE_ADMIN':
        return "#cc2900";
      case 'ROLE_SUPERVISEUR':
        return "#d60caaff";
      default:
        return {}; // Default style or no style
    }
  };

  const getDynamicBgColorRole = (role) => {

    switch (role) {
      case 'ROLE_USER':
        return "#e6eaedff";
      case 'ROLE_ADMIN':
        return "#efe6e4ff";
      case 'ROLE_SUPERVISEUR':
        return "#f8f2f7ff";
      default:
        return {}; // Default style or no style
    }
  };

  const getDynamicRoleUser = (role) => {

    switch (role) {
      case 'ROLE_USER':
        return "Utilisateur";
      case 'ROLE_ADMIN':
        return "Administrateur";
      case 'ROLE_SUPERVISEUR':
        return "Superviseur";
      default:
        return {}; // Default style or no style
    }
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Nom</TableCell>
             <TableCell align="left">Societe</TableCell>
            <TableCell align="left">Role(s)</TableCell>
            <TableCell>Selectionner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listPersonnel.map((row, index) => (
            <TableRow
              key={row.id_personnel}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.nom_personnel}</TableCell>
              <TableCell align="left">{row.departement.societe.nom_societe}</TableCell>
              <TableCell align="left">{row.user.roles.map((role, index) => (

                <Chip sx={{ color: `${getDynamicColorRole(role.role_name)}`, margin: 0.2, fontWeight: 'bold', bgcolor: `${getDynamicBgColorRole(role.role_name)}` }} key={index}
                  size='small' label={getDynamicRoleUser(role.role_name)} />

              ))}</TableCell>
              <TableCell>
                <Checkbox
                  onClick={(event) => handleClick(event, row.nom_personnel)}
                  checked={isSelected(row.nom_personnel)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}