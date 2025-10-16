import { Box, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React, { useEffect, useState } from 'react'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
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

function StepRoleInfo({ roles, selectedroles, setSelectedroles, formData, setFormData, setIsUsernameExist }) {

    const theme = useTheme();

    const [isChecked, setIsChecked] = useState(false);

    function getStyles(name, selectedroles, theme) {
        return {
            fontWeight: selectedroles.includes(name)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        };
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedroles(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        const recupFormData = { ...formData, roles: selectedroles };
        setFormData(recupFormData);
        setIsChecked(!isChecked);
    };

    const addSelectedRoles = () => {
        const recupListSelectedRoles = ({ ...formData, roles: selectedroles });
        setFormData(recupListSelectedRoles);
        setIsUsernameExist(false);
    };

    useEffect(() => {
        addSelectedRoles();
    }, [isChecked]);


    return (
        <MainCard title="Type utilisateur">
            <Grid container spacing={2}>
                <Grid size={8}>
                    <MainCard>
                        <FormGroup>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-chip-label">Type utilisateur</InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            fullWidth
                                            size='small'
                                            value={selectedroles}
                                            onChange={handleChange}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={getDynamiNameRole(value)} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {roles.map((role, index) => (
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
                            </Grid>
                        </FormGroup>
                    </MainCard>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default StepRoleInfo