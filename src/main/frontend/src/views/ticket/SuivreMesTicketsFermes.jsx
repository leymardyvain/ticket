import { Button, Checkbox, Chip, Grid, IconButton, Paper, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Tooltip } from "@mui/material";
import { getListPersonnelByNomSociete, getPersonnelByUsername } from "../../api/APIpersonnel";
import React, { useEffect, useState } from "react";
import { getSuivi_Ticket_Superviseur_en_cours_assignation, getSuivi_Ticket_Superviseur_en_cours_resolution, getSuivi_Ticket_Superviseur_ferme, getSuivi_Ticket_Superviseur_resolu } from "../../api/APIsuiviTicket";
import ProtectedView from "../pages/protect/ProtectedView";
import MainCard from 'ui-component/cards/MainCard';
import { IconAbacus, IconAccessible, IconArrowAutofitContent, IconBan, IconCircleCheck, IconClock, IconEye, IconEyeglass, IconPlaystationX, IconSettingsAutomation } from "@tabler/icons-react";
import DisplayDialog from "./DisplayDialog";
import { format } from "date-fns";
import DisplaySolutionDialog from "./DisplaySolutionDialog";

export default function SuivreMesFermes() {

  const [listSuiviPersonnel, setListSuiviPersonnel] = useState([]);

  const [openDisplay, setOpenDislplay] = useState(false);

  const username = ProtectedView();

  const fetchDataGetSuiviPersonnel = async () => {
    try {
      const response = await getSuivi_Ticket_Superviseur_ferme(username);
      setListSuiviPersonnel(response.data);
    } catch (error) {
      console.error('Error fetching list personnel by ferme:', error);
    }
  };

  useEffect(() => {
    fetchDataGetSuiviPersonnel();
  }, []);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [openSolution, setOpenSolution] = useState(false);

  const [selectedSuivi, setSelectedSuivi] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [order, setOrder] = React.useState('asc');

  const [orderBy, setOrderBy] = React.useState('nom_ville');

  const [filterText, setFilterText] = React.useState("");

  const filteredTicket = listSuiviPersonnel.filter(vil =>
    vil.ticket.description.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const getDynamicSuiviIcon = (statut) => {

    switch (statut) {
      case 'En attente assignation':
        return <IconClock />;
      case 'Assigné':
        return <IconAccessible />;
      case 'En cours résolution':
        return <IconSettingsAutomation />;
      case 'Résolu':
        return <IconCircleCheck />;
      case 'Fermé':
        return <IconPlaystationX />;
      default:
        return {}; // Default style or no style
    }
  };

  const getDynamicSuivi = (statut) => {

    switch (statut) {
      case 'En attente assignation':
        return '#2087e6ff';
      case 'Assigné':
        return '#2087e6ff';
      case 'En cours résolution':
        return '#90188aff';
      case 'Résolu':
        return '#1eae3bff';
      case 'Fermé':
        return '#e31212ff';
      default:
        return {}; // Default style or no style
    }
  };

  const getDynamicNiveau = (statut) => {

    switch (statut) {
      case 'Majeur':
        return '#e62720ff';
      case 'Moyen':
        return '#f8d01eff';
      case 'Faible':
        return '#faef8fff';
      default:
        return {}; // Default style or no style
    }
  };

  const getDynamicBgColor = (type) => {

    switch (type) {
      case 'Incident':
        return '#f9eaeaff';
      case 'Demande':
        return '#e2eaf5ff';
      default:
        return {}; // Default style or no style
    }
  };

  const getDynamicColorTypeIncident = (type) => {

    switch (type) {
      case 'Incident':
        return '#e8251eff';
      case 'Demande':
        return '#5591ebff';
      default:
        return {}; // Default style or no style
    }
  };

  async function getNumberFile(num) {
    try {
      const response = await getCountFichier(num);
      console.log("count ", response.data);
    }
    catch (er) {
      console.log("une erreur est arrivée lors de quantage du nombre de fichier", er);
    }
  };

  const Displaydetails = (row) => {
    setSelectedSuivi(() => row);
    setOpenDislplay(true);
  };

  const DisplaySolution= (row) => {
    setSelectedSuivi(() => row);
    setOpenSolution(true);
  };

  const calculateTimeDifference = (startDate, endDate) => {

    const dateObject1 = new Date(startDate);
    const dateObject2 = new Date(endDate);
    const startMs = dateObject1.getTime();
    const endMs = dateObject2.getTime();
    const differenceMs = Math.abs(endMs - startMs); // Use Math.abs for positive difference

    // Convert milliseconds to desired units
    const seconds = Math.floor(differenceMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // You can also get remaining units after extracting larger ones
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    return {
      days,
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
      totalHours: hours,
      totalMinutes: minutes,
      totalSeconds: seconds,
    };
  };

  const sortedData = stableSort(filteredTicket, getComparator(order, orderBy));

  return (
    <Grid container spacing={2}>

      <Grid size={12}>
        <MainCard title="Liste tickets fermés">
          <TextField
            label="Recherchez un ticket par sa description"
            size='small'
            variant="outlined"
            value={filterText}
            onChange={handleFilterChange}
            sx={{ width: '50%' }}
            margin="normal"
          />
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">Numero</TableCell>
                    <TableCell align="left">
                      <TableSortLabel
                        active={orderBy === 'description'}
                        direction={orderBy === 'description' ? order : 'asc'}
                        onClick={() => handleSort('description')} >
                        Description
                      </TableSortLabel></TableCell>
                    <TableCell align="left">Date ticket</TableCell>
                    <TableCell align="left">Date ferméture</TableCell>
                    <TableCell align="left">Niveau</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Statut</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) =>
                      //  const timeDiff = calculateTimeDifference(row.ticket.date_creation_ticket, row.date_suivi_ticket);
                      <TableRow
                        hover
                        key={row.id_suivi_Ticket}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{row.id_suivi_Ticket}</TableCell>
                        <TableCell align="left">{row.ticket.numero_ticket}</TableCell>
                        <TableCell align="left">{row.ticket.description}</TableCell>
                        <TableCell align="left">{format(row.ticket.date_creation_ticket, "dd-MM-yyyy HH:mm")}</TableCell>
                        <TableCell align="left">{format(row.date_suivi_ticket, "dd-MM-yyyy HH:mm")}</TableCell>

                        <TableCell align="left">
                          <Chip sx={{ color: '#0a0a0aff', margin: 0.2, fontWeight: 'bold', bgcolor: `${getDynamicNiveau(row.ticket.niveau_criticite.nom_niveau_criticite)}` }}
                            size='small' label={row.ticket.niveau_criticite.nom_niveau_criticite} />
                        </TableCell>
                        <TableCell align='left'>
                          <Chip sx={{ color: `${getDynamicColorTypeIncident(row.ticket.type_Ticket.nom_type_Ticket)}`, margin: 0.2, fontWeight: 'bold', bgcolor: `${getDynamicBgColor(row.ticket.type_Ticket.nom_type_Ticket)}` }}
                            size='small' label={row.ticket.type_Ticket.nom_type_Ticket} /></TableCell>
                        <TableCell align='left'>
                          <Chip icon={getDynamicSuiviIcon(row.etat_Ticket.nom_etat_Ticket)} sx={{ color: `${getDynamicSuivi(row.etat_Ticket.nom_etat_Ticket)}`, margin: 0.2, fontWeight: 'bold', bgcolor: '#f1f8fdff' }}
                            size='small' label={row.etat_Ticket.nom_etat_Ticket} />
                        </TableCell>
                        <TableCell align='left'>
                          <Tooltip title="Voir">
                            <IconButton aria-label="voir"
                              size="large"
                              sx={{ bgcolor: '#f0f1f5ff', color: "#486de7ff", marginRight: "2px" }}
                              onClick={() => Displaydetails(row)}>
                              <IconEye fontSize="inherit" style={{ strokeWidth: "2" }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Afficher la solution">
                            <IconButton aria-label="afficher"
                              size="large"
                              sx={{ bgcolor: '#e3f5edff', color: "#10a35eff", marginRight: "2px" }}
                              onClick={() => DisplaySolution(row)}>
                              <IconEyeglass fontSize="inherit" style={{ strokeWidth: "2" }} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={listSuiviPersonnel.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </MainCard>
      </Grid>
       <DisplaySolutionDialog open={openSolution} setOpen={setOpenSolution} data={selectedSuivi}  />
      <DisplayDialog open={openDisplay} setOpen={setOpenDislplay} data={selectedSuivi} />
    </Grid >
  );
}