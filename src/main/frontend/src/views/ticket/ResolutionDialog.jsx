import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { getCountFichier, getDownloadFileName, getFichierByIDTicket } from "../../api/APIfichier";
import { IconCircleX, IconDownload, IconEye, IconPlaystationX } from "@tabler/icons-react";
import { development, production } from 'api/connexion';
import axios from "axios";
import { addSolution } from "../../api/APIsolution";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ResolutionDialog({ open, setOpen, data, isConfirm, setIsConfirm, setMessage, setSeverity, setOpenMessage, setColor }) {

    const [selectedEquipement, setSelectedEquipement] = React.useState('Desktop');

    const [descriptionSolution, setDescriptionSolution] = React.useState('');

    const [remarque, setRemarque] = React.useState('');

    const [marqueEquipement, setMarqueEquipement] = React.useState('');

    const [localisation, setLocalisation] = React.useState('');

    const [autreEquipement, setAutreEquipement] = React.useState('');

    const [isAutre, setIsAutre] = React.useState(false);

    const handleChangeSelectEquipement = (event) => {
        setSelectedEquipement(event.target.value);
        setIsAutre(false);
        if (event.target.value === "Autre") {
            setIsAutre(true);
        }
    };

    const handleChangeLocalisation = (event) => {
        setLocalisation(event.target.value);
    };

    const handleChangeDescriptionSolution = (event) => {
        setDescriptionSolution(event.target.value);
    };

    const handleChangeRemarque = (event) => {
        setRemarque(event.target.value);
    };

    const handleChangeAutreEquipement = (event) => {
        setAutreEquipement(event.target.value);
    };

    const handleChangeMarqueEquipement = (event) => {
        setMarqueEquipement(event.target.value);
    };

    const handleAddSolution = async () => {

        const formData = {
            type_equipement: selectedEquipement,
            description_solution: descriptionSolution,
            remarque: remarque,
            marque_equipement: marqueEquipement,
            localisation: localisation,
            autre_equipement: autreEquipement,
            suivi_Ticket: data
        }

        try {

            if ( descriptionSolution !== "") {
                await addSolution(formData);
                setAutreEquipement('');
                setSelectedEquipement('Desktop');
                setLocalisation('');
                setMarqueEquipement('');
                setIsAutre(false);
                setDescriptionSolution('');
                setOpen(false);
                setIsConfirm(!isConfirm);
                setMessage('Solution ajoutée avec succès !');
                setSeverity('success');
                setColor('green');
                setOpenMessage(true);
            }
            else {
                setMessage('Un des champs est vide !');
                setSeverity('error');
                setColor('red');
                setOpenMessage(true);
            }

        }
        catch (er) {
            console.log("error", er);
        }

    };

    const handleClose = () => {
        setOpen(false);
    };

    const getEquipement = (equip) => {

        switch (equip) {
            case 'Majeur':
                return true;
            default:
                return false; // Default style or no style
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
                    {`Solution Proposée pour le ticket N° :  ${data?.ticket?.numero_ticket}`}
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
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Equipement</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedEquipement}
                                    label="SelectedEquipement"
                                    onChange={handleChangeSelectEquipement}
                                    disabled={getEquipement(selectedEquipement)}
                                >
                                    <MenuItem value="Desktop">Desktop</MenuItem>
                                    <MenuItem value="Laptop">Laptop</MenuItem>
                                    <MenuItem value="Imprimante">Imprimante</MenuItem>
                                    <MenuItem value="Scanner">Scanner</MenuItem>
                                    <MenuItem value="Autre">Autre</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        {isAutre && <Grid size={6}>
                            <TextField label="Préciser equipement" value={autreEquipement} fullWidth
                                onChange={handleChangeAutreEquipement} />
                        </Grid>}
                        <Grid size={6}>
                            <TextField label="Marque equipement" value={marqueEquipement} fullWidth
                                onChange={handleChangeMarqueEquipement} />
                        </Grid>
                        <Grid size={6}>
                            <TextField label="Dans quel bureau est situé la plaignante ?" value={localisation} fullWidth
                                onChange={handleChangeLocalisation} />
                        </Grid>

                        <Grid size={12}>
                            <TextField label="Description solution" multiline onChange={handleChangeDescriptionSolution}
                                rows={5} value={descriptionSolution} fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <TextField label="Remarque" multiline onChange={handleChangeRemarque}
                                rows={3} value={remarque} fullWidth />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddSolution}>Ajouter solution</Button>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}