import { Grid, Stack, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import React from 'react'

function StepOneForm({ handleChange, formData, isError }) {

    return (
        <Grid container spacing={2}>
            <Grid size={8}>
                <MainCard>
                    <Stack spacing={2}>
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

                    </Stack>
                </MainCard>
            </Grid>
        </Grid>
    )
}

export default StepOneForm