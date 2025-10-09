import { Button, Chip, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Tooltip } from '@mui/material'
import { IconAccessible, IconArrowAutofitContent, IconBan, IconChecklist, IconCircleCheck, IconCirclePlus, IconClock, IconDirections, IconDoor, IconEye, IconPlaystationX, IconSettingsAutomation } from '@tabler/icons-react';
import React, { useState } from 'react'
import MainCard from 'ui-component/cards/MainCard';
import { getSuivi_Ticket } from '../../api/APIsuiviTicket';
import { getCountFichier } from '../../api/APIfichier';
import ProtectedView from '../pages/protect/ProtectedView';
import { format } from "date-fns";
import DisplayDialog from './DisplayDialog';
import DisplayUserDialog from './DisplayUserDialog';
import ConfirmationDialog from './ConfirmationDialog';
import ConfirmationUserDialog from './ConfirmationUserDialog';
import AnnulationUserDialog from './AnnulationUserDialog';

function ListTicket({ handlePage }) {

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [suivi, setSuivi] = useState([]);

    const username = ProtectedView();

    const [openDisplay, setOpenDislplay] = useState(false);

    const [openConfirmation, setOpenConfirmation] = useState(false);

    const [openAnnulation, setOpenAnnulation] = useState(false);

    const [isConfirm, setIsConfirm] = useState(false);

    const [selectedSuivi, setSelectedSuivi] = useState({});

    const fetchDataSuivi_Ticket = async () => {
        try {
            const response = await getSuivi_Ticket(username);
            setSuivi(response.data);
            console.log('suivi ', response.data);
        } catch (error) {
            console.error('Error fetching suivi ticket:', error);
        }
    };

    const Displaydetails = (row) => {
        setSelectedSuivi(() => row);
        setOpenDislplay(true);
    };

    const Displayconfirmation = (row) => {
        setSelectedSuivi(() => row);
        setOpenConfirmation(true);
    };

    const DisplayAnnulation = (row) => {
        setSelectedSuivi(() => row);
        setOpenAnnulation(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        fetchDataSuivi_Ticket();
    }, [isConfirm]);

    const [order, setOrder] = React.useState('asc');

    const [orderBy, setOrderBy] = React.useState('nom_ville');

    const [filterText, setFilterText] = React.useState("");

    const filteredTicket = suivi.filter(vil =>
        vil.ticket.numero_ticket.toLowerCase().includes(filterText.toLowerCase()) ||
        vil.ticket.description.toLowerCase().includes(filterText.toLowerCase()) ||
        vil.ticket.type_Ticket.nom_type_Ticket.toLowerCase().includes(filterText.toLowerCase()) ||
        vil.personnel_en_charge.nom_personnel.toLowerCase().includes(filterText.toLowerCase())
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
        console.log("check ", num);
        try {
            const response = await getCountFichier(num);
        }
        catch (er) {
            console.log("une erreur est arrivée lors de quantage du nombre de fichier", er);
        }
    };

    const sortedData = stableSort(filteredTicket, getComparator(order, orderBy));

    return (
        <Grid container spacing={2}>
            <Grid container direction="row" size={12}>
                <Button
                    variant="contained"
                    onClick={handlePage}
                    style={{ backgroundColor: "#793198", color: "#fafafaff" }}
                    startIcon={<IconCirclePlus />}>
                    Ajouter un ticket
                </Button>
            </Grid>
            <Grid size={12}>
                <MainCard title="Liste tickets">
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
                                        <TableCell align="left">Date creation</TableCell>
                                        <TableCell align="left">Assigner à</TableCell>
                                        <TableCell align="left">Niveau</TableCell>
                                        <TableCell align="left">Type</TableCell>
                                        <TableCell align="left">Statut</TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) =>
                                            <TableRow
                                                hover
                                                key={row.id_suivi_Ticket}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">{row.id_suivi_Ticket}</TableCell>
                                                <TableCell align="left">{row.ticket.numero_ticket}</TableCell>
                                                <TableCell align="left">{row.ticket.description}</TableCell>
                                                <TableCell align="left">{format(row.ticket.date_creation_ticket, "dd-MM-yyyy HH:mm")}</TableCell>
                                                <TableCell align="left">{row.personnel_en_charge !== null ? row.personnel_en_charge.nom_personnel : "N/A"}</TableCell>
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
                                                    {row.etat_Ticket.nom_etat_Ticket === "Résolu" && <Tooltip title="Confirmer résolution">
                                                        <IconButton aria-label="fermer"
                                                            size="large"
                                                            sx={{ bgcolor: '#f0f1f5ff', color: "#1c992eff", marginRight: "2px" }}
                                                            onClick={() => Displayconfirmation(row)}>
                                                            <IconDoor fontSize="inherit" style={{ strokeWidth: "2" }} />
                                                        </IconButton>
                                                    </Tooltip>}
                                                    {row.etat_Ticket.nom_etat_Ticket === "Résolu" && <Tooltip title="Problème non résolu">
                                                        <IconButton aria-label="fermer"
                                                            size="large"
                                                            sx={{ bgcolor: '#f0f1f5ff', color: "#b12d21ff", marginRight: "2px" }}
                                                            onClick={() => DisplayAnnulation(row)}>
                                                            <IconBan fontSize="inherit" style={{ strokeWidth: "2" }} />
                                                        </IconButton>
                                                    </Tooltip>}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={suivi.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </MainCard>
            </Grid>
            <DisplayUserDialog open={openDisplay} setOpen={setOpenDislplay} data={selectedSuivi} />
            <ConfirmationUserDialog open={openConfirmation} setOpen={setOpenConfirmation} selectedSuivi={selectedSuivi} setIsConfirm={setIsConfirm} />
            <AnnulationUserDialog open={openAnnulation} setOpen={setOpenAnnulation} selectedSuivi={selectedSuivi} setIsConfirm={setIsConfirm} />
        </Grid >
    )
}

export default ListTicket