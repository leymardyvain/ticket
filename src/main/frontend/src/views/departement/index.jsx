// material-ui
import { Alert, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { addDepartement } from '../../api/APIdepartement';
import ListDepartement from './ListDepartement';
import { getSociete } from '../../api/APIsociete';

function Departement() {

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [color, setColor] = useState("success");
  
  const [isAddedDepartement, setIsAddedDepartement] = useState(false);
  const [isDepartementAdded, setIsDepartementAdded] = useState(false);

  const [societe, setSociete] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [formData, setFormData] = React.useState({
    Id_departement: '',
    nom_departement: '',
    societe: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handlesubmit = async () => {

    if (formData.nom_departement === '') {

      setIsError(true);
      setOpen(true);
      setSeverity("error");
      setColor("red");
      setMessage("Une erreur est survevue")
    }
    else {
      await addDepartement(formData).then(() => {
        setMessage("Departement ajoutée avec succès !");
        setOpen(true);
        setSeverity("success");
        setColor("green");
        setFormData({
          nom_departement: '',
          societe: ''
        });
        setIsError(false);
        setIsDepartementAdded(true);
        setIsAddedDepartement(false);
      }).catch((error) => {
        setMessage(error.response.data);
      });
    }
  };


  const fetchDataSociete = async () => {
    try {
      const response = await getSociete();
      setSociete(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching societe:', error);
    }
  };

  React.useEffect(() => {
    fetchDataSociete();
  }, [isLoaded]);

  /*const DepartementAdded = () => {
    setIsAddedDepartement(true);
  };*/

  return (
    <>
      <Stack spacing={2}>

        {isAddedDepartement && <MainCard title="Nouveau Departement">

          <Stack spacing={2}>
            <Grid size={8}>
              <TextField
                label="Nom departement"
                id="outlined-size-small01"
                size="small"
                color='secondary'
                name="nom_departement"
                value={formData.nom_departement}
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
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-standard-label">choisissez une societe</InputLabel>
               <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard-label"
                  defaultValue=''
                  name="societe"
                  size="small"
                  value={formData.societe}
                  onChange={handleChange}
                  label="societe"
                  fullWidth
                  required
                >

                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {societe && societe.map((societe, index) =>
                    <MenuItem
                      key={index}
                      value={societe}>
                      {societe.nom_societe}
                    </MenuItem>
                  )}

                </Select> 
              </FormControl>

            </Grid>

            <Grid size={3}>

              <Button
                onClick={handlesubmit}
                variant="contained"
                style={{ backgroundColor: "#D0C5D2", color: "#793198" }}>
                Enregistrer
              </Button>

            </Grid>
          </Stack>

        </MainCard>
        }
        <MainCard title="Liste Departement">
          <ListDepartement DepartementAdded={setIsAddedDepartement} isDepartementAdded={isDepartementAdded} />
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

export default Departement