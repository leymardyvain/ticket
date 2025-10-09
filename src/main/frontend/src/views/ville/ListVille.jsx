import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getVille, updateVille } from '../../api/APIville';
import { Alert, Box, Button, Snackbar, TableSortLabel, TextField } from '@mui/material';
import { IconCirclePlus, IconCirclePlus2, IconCircleX } from '@tabler/icons-react';
import { update } from 'lodash-es';

const columns = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'nom', label: 'Nom', minWidth: 100 },
    /*  {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
      },*/
];

/*
function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];
*/

export default function ListVille({ VilleAdded, isVilleAdded }) {
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [ville, setVille] = React.useState([]);

    const [isButtonAddedClicked, setIsButtonAddedClicked] = React.useState(false);

    const [filterText, setFilterText] = React.useState("");

    const [editingRowId, setEditingRowId] = React.useState(null);

    const [openUpdate, setOpenUpdate] = React.useState(false);

    const [severity, setSeverity] = React.useState("success");

    const [color, setColor] = React.useState("success");

    const [message, setMessage] = React.useState("");

    const [isUpdate, setIsUpdate] = React.useState(false);

    const OpenAddedVilleClicked = () => {
        const open = true;
        VilleAdded(open);
        setIsButtonAddedClicked(true);
    };
    const closeAddedVilleClicked = () => {
        const open = false;
        VilleAdded(open);
        setIsButtonAddedClicked(false);
    };

    const fetchDataVille = async () => {
        try {
            const response = await getVille();
            setVille(response.data);
        } catch (error) {
            console.error('Error fetching ville:', error);
        }
    };

    React.useEffect(() => {
        fetchDataVille();
        setIsButtonAddedClicked(false);
    }, [isVilleAdded, isUpdate]);


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
        VilleAdded(open);
    };

    const filteredVille = ville.filter(vil =>
        vil.nom_ville.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleEdit = (id) => {
        setEditingRowId(id);
    };

    const handleSave = (id) => {
        setEditingRowId(null);
        const foundItem = ville.find(item => item.id_ville === id);
        try {
            updateVille(id, foundItem);
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

        const updatedRows = filteredVille.map((row) =>
            row.id_ville === id ? { ...row, [field]: e.target.value } : row
        );

        setVille(updatedRows);
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
    const [orderBy, setOrderBy] = React.useState('nom_ville');

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

    const sortedData = stableSort(filteredVille, getComparator(order, orderBy));

    return (
        <>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                <TextField
                    label="Recherchez une ville"
                    size='small'
                    variant="outlined"
                    value={filterText}
                    onChange={handleFilterChange}
                    sx={{ width: '50%' }}
                    margin="normal"
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {!isButtonAddedClicked && <Button onClick={OpenAddedVilleClicked} variant="contained" startIcon={<IconCirclePlus />}> Ajouter une ville</Button>}
                    {isButtonAddedClicked && <Button onClick={closeAddedVilleClicked} variant="contained" style={{ backgroundColor: "#d45858ff", color: "#f5f5f5ff" }} startIcon={<IconCircleX />}> Annuler la création</Button>}
                </Box>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">
                                    <TableSortLabel
                                        active={orderBy === 'nom_ville'}
                                        direction={orderBy === 'nom_ville' ? order : 'asc'}
                                        onClick={() => handleSort('nom_ville')}
                                    >
                                        Nom
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
                                        key={row.id_ville}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.id_ville}</TableCell>
                                        <TableCell align="left">
                                            {editingRowId === row.id_ville ? (
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    value={row.nom_ville}
                                                    onChange={(e) => handleChange(e, row.id_ville, 'nom_ville')}
                                                />
                                            ) : (
                                                row.nom_ville
                                            )}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {editingRowId === row.id_ville ? (
                                                <Button onClick={() => handleSave(row.id_ville)} sx={{ color: "#3ca02fff" }}>Sauvegarder</Button>
                                            ) : (
                                                <Button onClick={() => handleEdit(row.id_ville)}>Modifier</Button>
                                            )}
                                            {editingRowId === row.id_ville && <Button onClick={() => handleCancel()} sx={{ color: "#c5553bff" }}>Annuler</Button>}
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={ville.length}
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