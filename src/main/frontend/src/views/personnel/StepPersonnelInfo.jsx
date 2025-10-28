import { Alert, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useState } from 'react'
import { getSocieteByVille } from '../../api/APIsociete';
import { getDepartementBySocieteName } from '../../api/APIdepartement';

function StepPersonnelInfo({ handleChange, setFormData, formData, isError, ville, setDepartement, setOpen, open, message, setIsUsernameExist }) {

    const [selectedVille, setSelectedVille] = useState("");

    const [selectedSociete, setSelectedSociete] = useState("");

    const [selectedDepartement, setSelectedDepartement] = useState({});

    const [listeSociete, setListeSociete] = useState([]);

    const [listeDepartement, setListeDepartement] = useState([]);

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    const handleChangeVille = async (event) => {
        setSelectedVille(event.target.value);
        setSelectedSociete("");
        setSelectedDepartement("");
        const recupville = event.target.value;
        try {
            const response = await getSocieteByVille(recupville);
            setListeSociete(response.data);
        } catch (error) {
            console.error('Error fetching societe:', error);
        }
    }

    const handleChangeSociete = async (event) => {
        setSelectedSociete(event.target.value);
        const recupsociete = event.target.value;
        try {
            const response = await getDepartementBySocieteName(recupsociete);
            setListeDepartement(response.data);
        } catch (error) {
            console.error('Error fetching departement:', error);
        }
    }

    const handleChangeDepartement = (e) => {
        setSelectedDepartement(e.target.value);
        setDepartement(e.target.value);
        setFormData({ ...formData, departement: e.target.value })
        setIsUsernameExist(false);
    };

    return (
        <MainCard title="Information utilisateur">
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <MainCard>
                        <Stack spacing={3}>
                            <TextField
                                label="Nom personnel"
                                id="outlined-size-small01"
                                size="small"
                                color='secondary'
                                name="nom_personnel"
                                value={formData.nom_personnel}
                                onChange={handleChange}
                                fullWidth
                                error={isError}
                                helperText={isError ? 'Ce champs doit être renseigné' : ''}
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'red', // Custom border color when error
                                    },
                                    '& .MuiInputLabel-root.Mui-error': {
                                        color: 'red', // Custom label color when error
                                    },
                                }}
                            />
                            {formData.nom_personnel && <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Ville</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard-label"
                                    defaultValue=''
                                    name="ville"
                                    size="small"
                                    value={selectedVille}
                                    onChange={handleChangeVille}
                                    label="ville"
                                    fullWidth
                                    required
                                >

                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>

                                    {ville && ville.map((ville, index) =>
                                        <MenuItem
                                            key={index}
                                            value={ville.nom_ville}>
                                            {ville.nom_ville}
                                        </MenuItem>
                                    )}

                                </Select>
                            </FormControl>}

                            {selectedVille && <FormControl fullWidth>
                                <InputLabel id="id-societe">Societe</InputLabel>
                                <Select
                                    labelId="id-societe"
                                    id="id-societe"
                                    defaultValue=''
                                    size="small"
                                    name='societe'
                                    value={selectedSociete}
                                    onChange={handleChangeSociete}
                                    label="Societe"
                                    fullWidth
                                    required
                                >

                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>

                                    {listeSociete && listeSociete.map((societe, index) =>
                                        <MenuItem
                                            key={index}
                                            value={societe.nom_societe}>
                                            {societe.nom_societe}
                                        </MenuItem>
                                    )}

                                </Select>
                            </FormControl>}

                            {selectedSociete && <FormControl fullWidth>
                                <InputLabel id="id-departement">Departement</InputLabel>
                                <Select
                                    labelId="id-departement"
                                    id="id-departement"
                                    defaultValue=''
                                    size="small"
                                    name='departement'
                                    value={selectedDepartement}
                                    onChange={handleChangeDepartement}
                                    label="Departement"
                                    fullWidth
                                    required
                                >

                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>

                                    {listeDepartement && listeDepartement.map((departement, index) =>
                                        <MenuItem
                                            key={index}
                                            value={departement}>
                                            {departement.nom_departement}
                                        </MenuItem>
                                    )}

                                </Select>
                            </FormControl>}

                        </Stack>
                    </MainCard>
                </Grid>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%', color: "#ed6d0cff", bgcolor: "#F9FBE7" }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </Grid>
        </MainCard>
    )
}

export default StepPersonnelInfo