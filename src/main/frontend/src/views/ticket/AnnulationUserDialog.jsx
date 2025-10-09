import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import React from "react";
import { addannulationUser_suivi_ticket } from "../../api/APIsuiviTicket";
import { IconAlertTriangle, IconInfoCircle } from "@tabler/icons-react";

export default function AnnulationUserDialog({ open, setOpen, selectedSuivi, setSelectedSuivi, setIsConfirm }) {

    const handleClose = () => {
        setOpen(false);
        setSelectedSuivi({})
    };

    const annulationResolution = async () => {

        try {
            await addannulationUser_suivi_ticket(selectedSuivi);
            setOpen(false);
            setIsConfirm(true);
        } catch (error) {
            console.error('Error fetching ImageData:', error);
        }

    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <IconInfoCircle size={35}
                        strokeWidth={2}
                        color={'#284297ff'} /> <Typography component="span" variant="body1">Annulation</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Stack spacing={1.5}>
                            <Typography component="span" variant="body2">En appuyant sur confirmer, vous indiquez que l'incident ou la demande n'a pas été traité par {selectedSuivi?.personnel_en_charge?.nom_personnel} </Typography>

                            <Typography sx={{ color: '#e22525ff', fontWeight:'bold' }} component="span" variant="body2">l'état de ce ticket retourne à l'état précédent</Typography>

                            <Typography component="span" variant="h6">Voulez vous confirmer ?</Typography>
                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                    <Button onClick={annulationResolution} > Confirmer</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}