import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';

import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

//Axios 
import { IconButton, Stack } from '@mui/material';
import { updateUserPassword } from 'api/APIAuth';
import { IconPlaystationX } from '@tabler/icons-react';
import ProtectedView from '../pages/protect/ProtectedView';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function UpdatePasswordUserDialog({ open, handleClose }) {

    const [password, setPassword] = useState("");

    const [confirmation, setConfirmation] = useState("");

    const [message, setMessage] = useState("");

    const [textcolor, setTextcolor] = useState("red");

    const [isdisable, setIsdisable] = useState(false);

    const auth = ProtectedView();

    const [formData, setFormData] = useState({
        pwd: '',
        username: auth
    })

    const handleChangepassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangeconfirmation = (e) => {
        setConfirmation(e.target.value);
        check(password, confirmation);
    };

    useEffect(() => {
        check(password, confirmation);
        setFormData({ ...formData, pwd: password });
    }, [password, confirmation]);

    const handleUpdate = (e) => {

        e.preventDefault();

        setFormData({ ...formData, pwd: password });

        console.log('formData ', formData);

        updateUserPassword(formData).then((response) => {
            console.log(response);
            localStorage.removeItem("[[@^]7893T##5267");
            localStorage.removeItem("{{@^]1234R**PMLK");
            window.location.href = "/pages/login";
        }).catch((error) => {
            console.log(error);
        });
    }

    function check(pwd, conf) {

        if (pwd !== conf) {
            setMessage("les mots de passe ne sont pas identiques !");
            setTextcolor("red");
            setIsdisable(false);
        }
        else {
            setMessage("les mots de passe sont identiques !");
            setTextcolor("green");
            setIsdisable(true);
        }
    }

    return (

        <Fragment>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title02"
                open={open}
                maxWidth='sm'
                fullWidth
            >

                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold', fontSize: '22px', bgcolor: 'white' }} id="customized-dialog-title02">
                    Changer votre mot de passe
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

                    <Stack spacing={2}>

                        <Grid size={12}>

                            <TextField
                                id="password-basic"
                                type='password'
                                label="Mot de passe"
                                name="pwd"
                                value={password}
                                onChange={handleChangepassword}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid size={12}>

                            <TextField
                                id="Confirmation-basic"
                                type='password'
                                label="Confirmation"
                                name="confirmation"
                                value={confirmation}
                                onChange={handleChangeconfirmation}
                                required
                                fullWidth
                            />
                            
                        </Grid>
                        <Grid size={12}>
                            {password !== "" ? <span style={{ color: textcolor }}>{message}</span> : ""}
                        </Grid>

                    </Stack>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={handleUpdate}
                        disabled={!isdisable}>
                            Modifier
                    </Button>

                    <Button onClick={handleClose}>Fermer
                    </Button>

                </DialogActions>

            </BootstrapDialog>

        </Fragment>

    );
}