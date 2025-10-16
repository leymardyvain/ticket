// material-ui
import { Alert, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { addPersonnel } from '../../api/APIpersonnel';
import ListPersonnel from './ListPersonnel';
import MyStepperForm from './MyStepperForm';

function Personnel() {

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const [severity, setSeverity] = useState("success");
  const [color, setColor] = useState("success");

  const [isAddedPersonnel, setIsAddedPersonnel] = useState(false);
  const [isPersonnelAdded, setIsPersonnelAdded] = useState(false);

  const [formData, setFormData] = React.useState({
    Id_personnel: '',
    nom_personnel: '',
    departement: '',
    user: '',
    is_delete: false
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handlesubmit = async () => {

    if (formData.nom_personnel === '') {

      setIsError(true);
      setOpen(true);
      setSeverity("error");
      setColor("red");
      setMessage("Une erreur est survevue")
    }
    else {
      await addPersonnel(formData).then(() => {
        setMessage("Personnel ajoutée avec succès !");
        setOpen(true);
        setSeverity("success");
        setColor("green");
        setFormData({
          nom_personnel: '',
          ville: ''
        });
        setIsError(false);
        setIsPersonnelAdded(true);
        setIsAddedPersonnel(false);
      }).catch((error) => {
        setMessage(error.response.data);
      });
    }
  };

  return (
    <>
      <Stack spacing={2}>

        {isAddedPersonnel && <MainCard title="Stepper Personnel">
          <MyStepperForm setIsPersonnelAdded={setIsPersonnelAdded} setIsAddedPersonnel={setIsAddedPersonnel}/>
        </MainCard>}

        <MainCard title="Liste Personnel">
          <ListPersonnel PersonnelAdded={setIsAddedPersonnel} isPersonnelAdded={isPersonnelAdded} />
        </MainCard>

      </Stack>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          variant="filled"
          sx={{ width: '100%', color: `${color}`, bgcolor: "#F9FBE7" }}
        >
          {message}
        </Alert>
      </Snackbar>

    </>

  )
}

export default Personnel