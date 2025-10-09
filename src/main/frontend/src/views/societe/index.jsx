// material-ui
import { Alert, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { addSociete } from '../../api/APIsociete';
import ListSociete from './ListSociete';
import { getVille } from '../../api/APIville';

function Societe() {

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [color, setColor] = useState("success");
  
  const [isAddedSociete, setIsAddedSociete] = useState(false);
  const [isSocieteAdded, setIsSocieteAdded] = useState(false);

  const [ville, setVille] = useState([]);

  const [formData, setFormData] = React.useState({
    Id_societe: '',
    nom_societe: '',
    ville: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handlesubmit = async () => {

    if (formData.nom_societe === '') {

      setIsError(true);
      setOpen(true);
      setSeverity("error");
      setColor("red");
      setMessage("Une erreur est survevue")
    }
    else {
      await addSociete(formData).then(() => {
        setMessage("Societe ajoutée avec succès !");
        setOpen(true);
        setSeverity("success");
        setColor("green");
        setFormData({
          nom_societe: '',
          ville:''
        });
        setIsError(false);
        setIsSocieteAdded(true);
        setIsAddedSociete(false);
      }).catch((error) => {
        setMessage(error.response.data);
      });
    }
  };


  const fetchDataVille = async () => {
    try {
      const response = await getVille();
      setVille(response.data);
    } catch (error) {
      console.error('Error fetching ville:', error);
    }
  };

  React.useEffect(() => {
    fetchDataVille();
  }, []);

  /*const SocieteAdded = () => {
    setIsAddedSociete(true);
  };*/

  return (
    <>
      <Stack spacing={2}>

        {isAddedSociete && <MainCard title="Nouvelle Societe">

          <Stack spacing={2}>
            <Grid size={8}>
              <TextField
                label="Nom societe"
                id="outlined-size-small01"
                size="small"
                color='secondary'
                name="nom_societe"
                value={formData.nom_societe}
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
                <InputLabel id="demo-simple-select-standard-label">choisissez une ville</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard-label"
                  defaultValue=''
                  name="ville"
                  size="small"
                  value={formData.ville}
                  onChange={handleChange}
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
                      value={ville}>
                      {ville.nom_ville}
                    </MenuItem>
                  )}

                </Select>
              </FormControl>

            </Grid>

            <Grid size={3}>

              <Button
                onClick={handlesubmit}
                variant="contained"
                style={{ backgroundColor: "#d2cbc5ff", color: "#793198" }}>
                Enregistrer
              </Button>

            </Grid>
          </Stack>

        </MainCard>
        }
        <MainCard title="Liste Societe">
          <ListSociete SocieteAdded={setIsAddedSociete} isSocieteAdded={isSocieteAdded} />
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

export default Societe