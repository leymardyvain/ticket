import { Grid } from '@mui/material'
import React from 'react'
import MainCard from 'ui-component/cards/MainCard';

function StepTwoForm() {
    return (
        <Grid container spacing={2}>
            <Grid size={8}>
                <MainCard></MainCard>
            </Grid>
        </Grid>
    )
}

export default StepTwoForm