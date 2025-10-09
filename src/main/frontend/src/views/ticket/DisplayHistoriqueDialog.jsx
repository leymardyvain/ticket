import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { IconAccessible, IconCircleCheck, IconClock, IconPlaystationX, IconSettingsAutomation } from "@tabler/icons-react";
import { getHistoriqueBySuiviTicketID } from "../../api/APIhistorique";
import { format } from "date-fns";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DisplayHistoriqueDialog({ open, setOpen, data }) {

    const handleClose = () => {
        setOpen(false);
    };

    const [listHistorique, setListHistorique] = useState([]);

    const fetchDataListHistorique = async () => {
        try {
           /* const response = await getHistoriqueBySuiviTicketID(data?.id_suivi_Ticket);
            setListHistorique(response.data);
            console.log('response :', response.data); */

            if (data?.id_suivi_Ticket) {
                const response = await getHistoriqueBySuiviTicketID(data?.id_suivi_Ticket);
                setListHistorique(response.data);
            }
        } catch (error) {
            console.error('Error fetching historique:', error);
        }
    };

    React.useEffect(() => {
        fetchDataListHistorique();
    }, [open]);

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

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title02"
                open={open}
                maxWidth='md'
                fullWidth
            >

                <DialogTitle id="alert-dialog-title">
                    {"historique du ticket"}
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
                    {listHistorique.length > 0 &&
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">ID</TableCell>
                                        <TableCell align="left">Description ticket</TableCell>
                                        <TableCell align="left">Date</TableCell>
                                        <TableCell align="left">Etat</TableCell>
                                        <TableCell align="left">Assignateur</TableCell>
                                        <TableCell align="left">Assigné à</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listHistorique.map((row) => (
                                        <TableRow key={row.id_historique}>
                                            <TableCell align="left">{row.id_historique}</TableCell>
                                            <TableCell align="left">{row.suivi_Ticket.ticket.description}</TableCell>
                                            <TableCell align="left">{format(row.date_historique, "dd-MM-yyyy HH:mm")}</TableCell>
                                            <TableCell align='left'>
                                                <Chip icon={getDynamicSuiviIcon(row.historique_etat_ticket)} sx={{ color: `${getDynamicSuivi(row.historique_etat_ticket)}`, margin: 0.2, fontWeight: 'bold', bgcolor: '#f1f8fdff' }}
                                                    size='small' label={row.historique_etat_ticket} />
                                            </TableCell>
                                            <TableCell align="left">{row.personnel_assignateur.nom_personnel}</TableCell>
                                            <TableCell align="left">{row.personnel_en_charge.nom_personnel}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}