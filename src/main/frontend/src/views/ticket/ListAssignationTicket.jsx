import { Button, Chip, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from '@mui/material'
import { IconArrowAutofitContent, IconCirclePlus, IconClock, IconClockSearch, IconDirections, IconPlaystationX, IconTransferIn } from '@tabler/icons-react';
import React, { useState } from 'react'
import MainCard from 'ui-component/cards/MainCard';
import { getSuivi_Ticket_Superviseur } from '../../api/APIsuiviTicket';
import { getCountFichier } from '../../api/APIfichier';
import ProtectedView from '../pages/protect/ProtectedView';
import { getPersonnelByUsername } from '../../api/APIpersonnel';
import AssignerDialog from './AssignerDialog';
import { format } from "date-fns";

function ListAssignation() {

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [suivi, setSuivi] = useState([]);

    const [openAssignation, setOpenAssignation] = useState(false);

    const [isAssignation, setIsAssignation] = useState(false);

    const [selectedSuivi, setSelectedSuivi] = useState({});

    const handleCloseDialogAssignation = () => {
        setOpenAssignation(false);
    };

    const fetchDataSuivi_Ticket = async () => {
        try {
            const response = await getSuivi_Ticket_Superviseur();
            setSuivi(response.data);
        } catch (error) {
            console.error('Error fetching suivi ticket:', error);
        }
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
    }, [isAssignation]);

    const [order, setOrder] = React.useState('asc');

    const [orderBy, setOrderBy] = React.useState('nom_ville');

    const [filterText, setFilterText] = React.useState("");

    const filteredTicket = suivi.filter(vil =>
        vil.ticket.numero_ticket.toLowerCase().includes(filterText.toLowerCase()) ||
        vil.ticket.description.toLowerCase().includes(filterText.toLowerCase()) ||
        vil.ticket.type_Ticket.nom_type_Ticket.toLowerCase().includes(filterText.toLowerCase()) ||
        vil.ticket.personnel.nom_personnel.toLowerCase().includes(filterText.toLowerCase()) ||
        vil.ticket.personnel.departement.societe.nom_societe.toLowerCase().includes(filterText.toLowerCase()) ||
        vil.ticket.personnel.departement.nom_departement.toLowerCase().includes(filterText.toLowerCase())
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
            case 'En cours résolution':
                return <IconArrowAutofitContent />;
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
        setOpenAssignation(true);
        setIsAssignation(false);

    };

    const sortedData = stableSort(filteredTicket, getComparator(order, orderBy));

    return (
        <Grid container spacing={2}>

            <Grid size={12}>
                <MainCard title="Liste tickets à assigner">
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
                                        <TableCell align="left">Date</TableCell>
                                        <TableCell align="left">Emetteur</TableCell>
                                        <TableCell align="left">Departement</TableCell>
                                        <TableCell align="left">Societe</TableCell>
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
                                                <TableCell align="left">{row.ticket.personnel.nom_personnel}</TableCell>
                                                <TableCell align="left">{row.ticket.personnel.departement.nom_departement}</TableCell>
                                                <TableCell align="left">{row.ticket.personnel.departement.societe.nom_societe}</TableCell>
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
                                                    <Button size="small"
                                                        endIcon={<IconTransferIn />}
                                                        sx={{ bgcolor: '#9b1fbdff', }}
                                                        variant="contained"
                                                        onClick={() => Displaydetails(row)}>
                                                        Assigner
                                                    </Button>
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
            <AssignerDialog
                openAssignation={openAssignation}
                setIsAssignation={setIsAssignation}
                setOpenAssignation={setOpenAssignation}
                data={selectedSuivi}
                handleCloseDialogAssignation={handleCloseDialogAssignation} />
        </Grid >
    )
}

export default ListAssignation