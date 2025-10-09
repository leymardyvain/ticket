import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React from "react";
import { addconfirmation_suivi_ticket } from "../../api/APIsuiviTicket";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function ConfirmationDialog({ open, setOpen, selectedSuivi, setSelectedSuivi, setIsConfirm }) {

    const handleClose = () => {
        setOpen(false);
        //setSelectedSuivi({})
    };

    const confirmation = async () => {

        try {
            await addconfirmation_suivi_ticket(selectedSuivi);
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
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <IconAlertTriangle size={35}
                        strokeWidth={2}
                        color={'#f15121ff'} /> <Typography component="span" variant="body1">Confirmation</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography sx={{ color: '#e22525ff', fontWeight: 'bold' }} component="span" variant="body2">Voulez vous accepter cette assignation ?</Typography><br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                    <Button onClick={confirmation} > Confirmer</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}