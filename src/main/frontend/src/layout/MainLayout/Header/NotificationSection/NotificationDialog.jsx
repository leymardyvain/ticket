import { Alert, AlertTitle, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { IconMessage, IconMessages, IconPlaystationX } from "@tabler/icons-react";
import { format } from "date-fns";
import ProtectedAccessAdmin from "../../../../views/pages/protect/ProtectedAccessAdmin";
import MainCard from 'ui-component/cards/MainCard';
import { updateNotificationTicket } from "../../../../api/APInotification";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const customColor = (code) => {
    switch (code) {
        case 'EAA':
            return '#2087e6ff';
        case 'AS':
            return '#2087e6ff';
        case 'ECR':
            return '#90188aff';
        case 'RE':
            return '#1eae3bff';
        case 'FE':
            return '#cc522dff';
    }
}

const customBgColor = (code) => {
    switch (code) {
        case 'EAA':
            return '#d3e3f3ff';
        case 'AS':
            return '#d3e3f3ff';
        case 'ECR':
            return '#f3d0f2ff';
        case 'RE':
            return '#c3efccff';
        case 'FE':
            return '#efd7cfff';
    }
}

// styles
const CardWrapper = styled(MainCard)(({ bgcolor }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${bgcolor} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${bgcolor} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

export default function NotificationDialog({ open, setOpen, data, setListNotification, setClose }) {

    const handleClose = async () => {

        processUpdateNotification();
        setOpen(false);
        setClose(false);
       await setListNotification([]);
    };

    const processUpdateNotification = async () => {
        await data.forEach(item => {
            updateNotificationTicket(item.id_notification, item);
        });
    };

    const theme = useTheme();

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
                    {"Mes notifications"}
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


                    <Grid container spacing={2} >
                        {data.map((item) => (

                            <Grid size={12} key={item.id_notification}>
                                <CardWrapper border={false} content={false} bgcolor={customColor(item.code)}>
                                    <Box sx={{ p: 2 }}>
                                        <List sx={{ py: 0 }}>
                                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            ...theme.typography.commonAvatar,
                                                            ...theme.typography.largeAvatar,
                                                            bgcolor: `${customBgColor(item.code)}`,
                                                            color: `${customColor(item.code)}`
                                                        }}
                                                    >
                                                        <IconMessage fontSize="inherit" />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    sx={{ py: 0, mt: 0.45, mb: 0.45 }}
                                                    primary={<Typography variant="h4">{item.suivi_Ticket.ticket.personnel.nom_personnel} - {item.suivi_Ticket.ticket.personnel.departement.nom_departement}</Typography>}
                                                    secondary={
                                                        <Typography variant="subtitle2" sx={{ color: 'grey.500', mt: 0.5 }}>
                                                            {item.message}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </CardWrapper>

                            </Grid>

                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}