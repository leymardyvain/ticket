import { Alert, Box, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, OutlinedInput, Select, Snackbar, Stack, TextField, Typography, useTheme } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useEffect, useState } from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react';

function StepDetailsInfo({ formData, setFormData, selectedroles, setOpen, open, message }) {

    const theme = useTheme();

    const addSelectedRoles = () => {
        const recupListSelectedRoles = ({ ...formData, roles: selectedroles });
        setFormData(recupListSelectedRoles);
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    const getDynamiNameRole = (role) => {

        switch (role) {
            case 'ROLE_USER':
                return "Utilisateur";
            case 'ROLE_ADMIN':
                return "Administrateur";
            case 'ROLE_SUPERVISEUR':
                return "Superviseur";
            default:
                return {}; // Default style or no style
        }

    };


    function getStyles(name, selectedroles, theme) {
        return {
            fontWeight: selectedroles.includes(name)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        };
    }

    /*useEffect(() => {
        addSelectedRoles();
        console.log('dans detail ', formData.roles)
    }, []);*/

    return (
        <MainCard title="Details informations saisies">
            <Grid container spacing={3}>
                <Grid size={6}>
                    <TextField label="Nom personnel" fullWidth size='small' value={formData.nom_personnel}></TextField>
                </Grid>
                <Grid size={6}>
                    <TextField label="Nom departement" fullWidth size='small' value={formData.departement.nom_departement}></TextField>
                </Grid>
                <Grid size={6}>
                    Type utilisateur
                    <FormControl fullWidth>

                        <Select
                            labelId="detail"
                            id="detail-multiple-chip"
                            multiple
                            fullWidth
                            inputProps={{ readOnly: true }}
                            size='small'
                            value={formData.roles}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={getDynamiNameRole(value)} />
                                    ))}
                                </Box>
                            )}
                        >
                            {formData.roles.map((role, index) => (
                                <MenuItem
                                    key={index}
                                    value={role.role_name}
                                    style={getStyles(role.role_name, selectedroles, theme)}
                                >
                                    {getDynamiNameRole(role.role_name)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={6}>
                    <Stack spacing={3}>
                        <TextField label="Username" fullWidth size='small' value={formData.user.username}></TextField>
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            // ... other TextField props like value, onChange
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <IconEyeOff /> : <IconEye />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth size='small' value={formData.user.password}></TextField>
                    </Stack>
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

export default StepDetailsInfo