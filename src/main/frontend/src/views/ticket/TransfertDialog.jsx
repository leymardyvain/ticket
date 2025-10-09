import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, styled, TextField, Typography } from "@mui/material";
import { IconPlaystationX } from "@tabler/icons-react";
import { Fragment, useState } from "react";
import TransfertUserTable from "./TransfertUserTable";
import { getPersonnelByNomPersonnel, getPersonnelByUsername } from "../../api/APIpersonnel";
import { addHistorique } from "../../api/APIhistorique";
import ProtectedView from '../pages/protect/ProtectedView';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function TransfererDialog({ openTransfert, data, handleCloseDialogTransfert, setIsTransfert, setOpenTransfert, setIsConfirm, isConfirm }) {

    const [selected, setSelected] = useState('');

    const assignateur = ProtectedView();

    const Transfert = async () => {
        const response = await getPersonnelByNomPersonnel(selected);
        const getInfoAssignateur = await getPersonnelByUsername(assignateur);
        const formData = {
            suivi_Ticket: data,
            personnel_en_charge: response.data,
            personnel_assignateur: getInfoAssignateur.data,
        };

        addNewHistorique(formData);
    };

    const handleClose = () => {
        handleCloseDialogTransfert(!openTransfert)
    };

    const addNewHistorique = async (nom) => {
        try {
            await addHistorique(nom).then(() => {
                setIsTransfert(true);
                setOpenTransfert(false);
                setSelected('');
                setIsConfirm(!isConfirm);
            })
        } catch (error) {
            console.error('Error fetching historique:', error);
        }
    }

    return (
        <Fragment>

            <BootstrapDialog
                onClose={handleCloseDialogTransfert}
                aria-labelledby="customized-dialog-title02"
                open={openTransfert}
                maxWidth='md'
                fullWidth
            >

                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold', fontSize: '25px', bgcolor: 'white' }} id="customized-dialog-title02">
                    Transferer un ticket
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleCloseDialogTransfert}
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
                    <DialogContentText id="alert-dialog-description2">
                    </DialogContentText>
                    <TransfertUserTable data={data} setSelected={setSelected} selected={selected} assignateur={assignateur} />
                </DialogContent>
                <DialogActions>

                    <Button
                        onClick={Transfert}
                        variant='contained'
                        sx={{ bgcolor: '#9b1fbdff', }}
                    >Attribuer
                    </Button>

                    <Button onClick={handleClose}
                        color='primary'>Fermer
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Fragment>
    );
}