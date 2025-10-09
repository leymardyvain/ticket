import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getPersonnel, updatePersonnel } from '../../api/APIpersonnel';
import { Alert, Box, Button, Chip, Snackbar, TableSortLabel, TextField } from '@mui/material';
import { IconCirclePlus, IconCirclePlus2, IconCircleX } from '@tabler/icons-react';
import { update } from 'lodash-es';
import UpdatePasswordAdminDialog from './UpdatePasswordAdminDialog';
import AutoClosingAlert from './AutoClosingAlert';

export default function ListPersonnel({ PersonnelAdded, isPersonnelAdded }) {
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [personnel, setPersonnel] = React.useState([]);

    const [isButtonAddedClicked, setIsButtonAddedClicked] = React.useState(false);

    const [filterText, setFilterText] = React.useState("");

    const [editingRowId, setEditingRowId] = React.useState(null);

    const [openUpdate, setOpenUpdate] = React.useState(false);

    const [severity, setSeverity] = React.useState("success");

    const [color, setColor] = React.useState("success");

    const [message, setMessage] = React.useState("");

    const [isUpdate, setIsUpdate] = React.useState(false);

    const [selectedUser, setSelectedUser] = React.useState({});

    const [openUpdatePassword, setOpenUpdatePassword] = React.useState(false);

    const [affichage, setAffichage] = React.useState("");

    const OpenAddedPersonnelClicked = () => {
        const open = true;
        PersonnelAdded(open);
        setIsButtonAddedClicked(true);
    };
    const closeAddedPersonnelClicked = () => {
        const open = false;
        PersonnelAdded(open);
        setIsButtonAddedClicked(false);
    };

    const fetchDataPersonnel = async () => {
        try {
            const response = await getPersonnel();
            setPersonnel(response.data);
        } catch (error) {
            console.error('Error fetching personnel:', error);
        }
    };

    React.useEffect(() => {
        fetchDataPersonnel();
        setIsButtonAddedClicked(false);
    }, [isPersonnelAdded, isUpdate]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        setIsButtonAddedClicked(false);
        const open = false;
        PersonnelAdded(open);
    };

    const filteredPersonnel = personnel.filter(pers =>
        pers.nom_personnel.toLowerCase().includes(filterText.toLowerCase()) ||
        pers.user.username.toLowerCase().includes(filterText.toLowerCase()) ||
        pers.departement.nom_departement.toLowerCase().includes(filterText.toLowerCase()) ||
        pers.departement.societe.nom_societe.toLowerCase().includes(filterText.toLowerCase()) ||
        pers.departement.societe.ville.nom_ville.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleEdit = (id) => {
        setEditingRowId(id);
    };

    const handleSave = (id) => {
        setEditingRowId(null);
        const foundItem = personnel.find(item => item.id_personnel === id);
        try {
            updatePersonnel(id, foundItem);
            setSeverity("success");
            setMessage("Modification effectuée avec succès");
            setOpenUpdate(true);
            setColor("green");

        }
        catch (err) {
            setSeverity("error");
        }
    };

    const handleChangePassword = (id) => {
        setSelectedUser(personnel.find(item => item.id_personnel === id));
        setOpenUpdatePassword(true);
    };

    const handleCloseUpdatePassword = (id) => {
        setOpenUpdatePassword(false);
        setEditingRowId(null);
        setIsUpdate(!isUpdate);
    };

    const handleChange = (e, id, field) => {

        const updatedRows = filteredPersonnel.map((row) =>
            row.id_personnel === id ? { ...row, [field]: e.target.value } : row
        );

        setPersonnel(updatedRows);
        setFilterText("");
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

    const handleCancel = () => {
        setEditingRowId(null);
        setIsUpdate(!isUpdate);
    };

    const handleCloseSnackbarUpdate = () => {
        setOpenUpdate(false);
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('nom_personnel');

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

    const sortedData = stableSort(filteredPersonnel, getComparator(order, orderBy));

    return (
        <>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                {affichage && <AutoClosingAlert message={affichage} /> }

                <TextField
                    label="Recherchez une personnel"
                    size='small'
                    variant="outlined"
                    value={filterText}
                    onChange={handleFilterChange}
                    sx={{ width: '50%' }}
                    margin="normal"
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {!isButtonAddedClicked && <Button onClick={OpenAddedPersonnelClicked} variant="contained" startIcon={<IconCirclePlus />}> Ajouter une personnel</Button>}
                    {isButtonAddedClicked && <Button onClick={closeAddedPersonnelClicked} variant="contained" style={{ backgroundColor: "#d45858ff", color: "#f5f5f5ff" }} startIcon={<IconCircleX />}> Annuler la création</Button>}
                </Box>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">
                                    <TableSortLabel
                                        active={orderBy === 'nom_personnel'}
                                        direction={orderBy === 'nom_personnel' ? order : 'asc'}
                                        onClick={() => handleSort('nom_personnel')}
                                    >
                                        Nom
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="left">Username</TableCell>
                                <TableCell align="left">role</TableCell>
                                <TableCell align="left">Departement</TableCell>
                                <TableCell align="left">Societe</TableCell>
                                <TableCell align="left">Ville</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) =>
                                    <TableRow
                                        hover
                                        key={row.id_personnel}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.id_personnel}</TableCell>
                                        <TableCell align="left">
                                            {editingRowId === row.id_personnel ? (
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    value={row.nom_personnel}
                                                    onChange={(e) => handleChange(e, row.id_personnel, 'nom_personnel')}
                                                />
                                            ) : (
                                                row.nom_personnel
                                            )}
                                        </TableCell>
                                        <TableCell align="left">{row.user.username}</TableCell>
                                        <TableCell align="left">{row.user.roles.map((role, index) => (

                                            <Chip sx={{ color: `${getDynamicColorRole(role.role_name)}`, margin: 0.2, fontWeight: 'bold', bgcolor: `${getDynamicBgColorRole(role.role_name)}` }} key={index}
                                                size='small' label={getDynamicRoleUser(role.role_name)} />

                                        ))}</TableCell>
                                        <TableCell align="left">{row.departement.nom_departement}</TableCell>
                                        <TableCell align="left">{row.departement.societe.nom_societe}</TableCell>
                                        <TableCell align="left">{row.departement.societe.ville.nom_ville}</TableCell>
                                        <TableCell align='right'>
                                            {editingRowId === row.id_personnel ? (
                                                <Button onClick={() => handleSave(row.id_personnel)} sx={{ color: "#3ca02fff" }}>Sauvegarder</Button>
                                            ) : (
                                                <Button onClick={() => handleEdit(row.id_personnel)}>Modifier</Button>
                                            )}
                                            {editingRowId === row.id_personnel && <Button onClick={() => handleCancel()} sx={{ color: "#c5553bff" }}>Annuler</Button>}
                                            {editingRowId === row.id_personnel && <Button onClick={() => handleChangePassword(row.id_personnel)} sx={{ color: "#3535b1a3" }}>Mot de passe</Button>}
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={personnel.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Snackbar open={openUpdate} autoHideDuration={3000} onClose={handleCloseSnackbarUpdate}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert
                    onClose={handleCloseSnackbarUpdate}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%', color: `${color}`, bgcolor: "#F9FBE7" }}
                >
                    {message}
                </Alert>
            </Snackbar>

            <UpdatePasswordAdminDialog open={openUpdatePassword} handleClose={handleCloseUpdatePassword} selectedUser={selectedUser} setAffichage={setAffichage} />

        </>
    );
}