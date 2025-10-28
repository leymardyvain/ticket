import { Alert, AlertTitle, Grid, Stack, TextField, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React from 'react'

function StepAccessInfo({ setFormData, formData, isError, isUsernameExist, severity, typeSeverity, message, setIsUsernameExist }) {
    const [usernameForm, setUsernameForm] = React.useState("");

    const [passwordForm, setPasswordForm] = React.useState("");

    const handleChangeUsernameForm = (event) => {
        setUsernameForm(event.target.value);
        const recupwithusername = ({ ...formData, user: { ...formData.user, username: event.target.value } });
        const recupwithname = ({ ...recupwithusername, user: { ...recupwithusername.user, name: recupwithusername.nom_personnel } });
        setFormData(recupwithname);
        setIsUsernameExist(false);
    };

    const handleChangePasswordForm = (event) => {
        setPasswordForm(event.target.value);
        const recupwithpassword = ({ ...formData, user: { ...formData.user, password: event.target.value } });
        setFormData(recupwithpassword);
    };

    return (
        <MainCard title="Accès utilisateur">
            <Grid container spacing={2}>
                {isUsernameExist && <Grid size={12}>
                    <Alert severity={severity}>
                        <AlertTitle>{typeSeverity}</AlertTitle>
                        {message}
                    </Alert>
                </Grid>}
                <Grid size={{ xs: 12, md: 8 }}>
                    <MainCard>
                        <Stack spacing={3}>
                            <TextField
                                label="Username"
                                id="UsernameForm"
                                size="small"
                                color='secondary'
                                name="usernameForm"
                                value={usernameForm}
                                onChange={handleChangeUsernameForm}
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
                            <TextField
                                label="Mot de passe"
                                id="PasswordForm"
                                size="small"
                                color='secondary'
                                type='password'
                                name="passwordForm"
                                value={passwordForm}
                                onChange={handleChangePasswordForm}
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
                        </Stack>
                    </MainCard>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default StepAccessInfo