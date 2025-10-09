import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { getCountFichier, getDownloadFileName, getFichierByIDTicket } from "../../api/APIfichier";
import { IconCircleX, IconDownload, IconEye, IconPlaystationX } from "@tabler/icons-react";
import { development, production } from 'api/connexion';
import { format } from "date-fns";
import { getSolutionBySuiviTicket } from "../../api/APIsolution";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DisplaySolutionDialog({ open, setOpen, data }) {

    const [listeSolution, setListeSolution] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    const fetchDataSolutionTicket = async () => {
        try {
          /*  const response = await getSolutionBySuiviTicket(data?.id_suivi_Ticket);
            setListeSolution(response.data); */
            if (data?.id_suivi_Ticket) {
                console.log('id solution ',data?.id_suivi_Ticket )
                const response = await getSolutionBySuiviTicket(data?.id_suivi_Ticket);
                setListeSolution(response.data);
            }
        } catch (error) {
            console.error('Error fetching solution:', error);
        }
    };

    React.useEffect(() => {
        fetchDataSolutionTicket();
    }, [open]);

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title02"
                open={open}
                maxWidth='lg'
                fullWidth
            >

                <DialogTitle id="alert-dialog-title">
                    {"Solution proposée"}
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <IconPlaystationX />

                </IconButton>

                <DialogContent dividers>

                    {listeSolution.length > 0 ?
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">ID</TableCell>
                                        <TableCell align="left">Type equipement</TableCell>
                                        <TableCell align="left">Marque equipement</TableCell>
                                        <TableCell align="left">Autre equipement</TableCell>
                                        <TableCell align="left">Description solution</TableCell>
                                        <TableCell align="left">Remarque</TableCell>
                                        <TableCell align="left">Localisation</TableCell>
                                        <TableCell align="left">Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listeSolution.map((row) => (
                                        <TableRow key={row.id_solution}>
                                            <TableCell align="left">{row.id_solution}</TableCell>
                                            <TableCell align="left">{row.type_equipement !== " " ? row.type_equipement : "N/A"}</TableCell>
                                            <TableCell align="left">{row.marque_equipement !== " " ? row.marque_equipement : "N/A"}</TableCell>
                                            <TableCell align="left">{row.autre_equipement !== " " ? row.autre_equipement : "N/A"}</TableCell>
                                            <TableCell align="left">{row.description_solution !== " " ? row.description_solution : "N/A"}</TableCell>
                                            <TableCell align="left">{row.remarque !== " " ? row.remarque : "N/A"}</TableCell>
                                            <TableCell align="left">{row.localisation !== " " ? row.localisation : "N/A"}</TableCell>
                                            <TableCell align="left">{format(row.date_solution, "dd-MM-yyyy HH:mm")}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                   : <Typography sx={{color:'red'}} component="span" variant="body2">Aucune solution pour ce ticket</Typography> }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}