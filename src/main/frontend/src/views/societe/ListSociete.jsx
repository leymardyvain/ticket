import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getSociete, updateSociete } from '../../api/APIsociete';
import { Alert, Box, Button, Snackbar, TableSortLabel, TextField } from '@mui/material';
import { IconCirclePlus, IconCirclePlus2, IconCircleX } from '@tabler/icons-react';
import { update } from 'lodash-es';

export default function ListSociete({ SocieteAdded, isSocieteAdded }) {
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [societe, setSociete] = React.useState([]);

    const [isButtonAddedClicked, setIsButtonAddedClicked] = React.useState(false);

    const [filterText, setFilterText] = React.useState("");

    const [editingRowId, setEditingRowId] = React.useState(null);

    const [openUpdate, setOpenUpdate] = React.useState(false);

    const [severity, setSeverity] = React.useState("success");

    const [color, setColor] = React.useState("success");

    const [message, setMessage] = React.useState("");

    const [isUpdate, setIsUpdate] = React.useState(false);

    const OpenAddedSocieteClicked = () => {
        const open = true;
        SocieteAdded(open);
        setIsButtonAddedClicked(true);
    };
    const closeAddedSocieteClicked = () => {
        const open = false;
        SocieteAdded(open);
        setIsButtonAddedClicked(false);
    };

    const fetchDataSociete = async () => {
        try {
            const response = await getSociete();
            setSociete(response.data);
        } catch (error) {
            console.error('Error fetching societe:', error);
        }
    };

    React.useEffect(() => {
        fetchDataSociete();
        setIsButtonAddedClicked(false);
    }, [isSocieteAdded, isUpdate]);


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
        SocieteAdded(open);
    };

    const filteredSociete = societe.filter(vil =>
        vil.nom_societe.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleEdit = (id) => {
        setEditingRowId(id);
    };

    const handleSave = (id) => {
        setEditingRowId(null);
        const foundItem = societe.find(item => item.id_societe === id);
        try {
            updateSociete(id, foundItem);
            setSeverity("success");
            setMessage("Modification effectuée avec succès");
            setOpenUpdate(true);
            setColor("green");

        }
        catch (err) {
            setSeverity("error");
        }
    };

    const handleChange = (e, id, field) => {

        const updatedRows = filteredSociete.map((row) =>
            row.id_societe === id ? { ...row, [field]: e.target.value } : row
        );

        setSociete(updatedRows);
        setFilterText("");
    };

    const handleCancel = () => {
        setEditingRowId(null);
        setIsUpdate(!isUpdate);
    };

    const handleCloseSnackbarUpdate = () => {
        setOpenUpdate(false);
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('nom_societe');

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

    const sortedData = stableSort(filteredSociete, getComparator(order, orderBy));

    return (
        <>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                <TextField
                    label="Recherchez une societe"
                    size='small'
                    variant="outlined"
                    value={filterText}
                    onChange={handleFilterChange}
                    sx={{ width: '50%' }}
                    margin="normal"
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {!isButtonAddedClicked && <Button onClick={OpenAddedSocieteClicked} variant="contained" startIcon={<IconCirclePlus />}> Ajouter une societe</Button>}
                    {isButtonAddedClicked && <Button onClick={closeAddedSocieteClicked} variant="contained" style={{ backgroundColor: "#d45858ff", color: "#f5f5f5ff" }} startIcon={<IconCircleX />}> Annuler la création</Button>}
                </Box>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">
                                    <TableSortLabel
                                        active={orderBy === 'nom_societe'}
                                        direction={orderBy === 'nom_societe' ? order : 'asc'}
                                        onClick={() => handleSort('nom_societe')}
                                    >
                                        Nom
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="left">
                                    <TableSortLabel
                                        active={orderBy === 'nom_ville'}
                                        direction={orderBy === 'nom_ville' ? order : 'asc'}
                                        onClick={() => handleSort('nom_ville')}
                                    >
                                        Ville
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) =>
                                    <TableRow
                                        hover
                                        key={row.id_societe}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.id_societe}</TableCell>
                                        <TableCell align="left">
                                            {editingRowId === row.id_societe ? (
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    value={row.nom_societe}
                                                    onChange={(e) => handleChange(e, row.id_societe, 'nom_societe')}
                                                />
                                            ) : (
                                                row.nom_societe
                                            )}
                                        </TableCell>
                                        <TableCell align="left">{row.ville.nom_ville}</TableCell>
                                        <TableCell align='right'>
                                            {editingRowId === row.id_societe ? (
                                                <Button onClick={() => handleSave(row.id_societe)} sx={{ color: "#3ca02fff" }}>Sauvegarder</Button>
                                            ) : (
                                                <Button onClick={() => handleEdit(row.id_societe)}>Modifier</Button>
                                            )}
                                            {editingRowId === row.id_societe && <Button onClick={() => handleCancel()} sx={{ color: "#c5553bff" }}>Annuler</Button>}
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={societe.length}
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

        </>
    );
}