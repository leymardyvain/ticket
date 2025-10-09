import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import React from "react";
import { addconfirmationUser_suivi_ticket } from "../../api/APIsuiviTicket";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function ConfirmationUserDialog({ open, setOpen, selectedSuivi, setSelectedSuivi, setIsConfirm }) {

    const handleClose = () => {
        setOpen(false);
       // setSelectedSuivi({})
    };

    const confirmationResolution = async () => {

        try {
            await addconfirmationUser_suivi_ticket(selectedSuivi);
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
                    <IconAlertTriangle size={35}
                        strokeWidth={2}
                        color={'#f15121ff'} /> <Typography component="span" variant="body1">Confirmation</Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={1.5}>
                        <Typography component="span" variant="body1">En appuyant sur confirmer, vous approuver que le ticket à été bien résolu</Typography>

                        <Typography sx={{ color: '#e22525ff', fontWeight: 'bold' }} component="span" variant="body2">l'état de ce ticket ne pourra plus être modifié</Typography>

                        <Typography component="span" variant="h6">Voulez vous confirmer ?</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                    <Button onClick={confirmationResolution} > Confirmer</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}