// material-ui
import { Alert, Button, Divider, Grid, Snackbar, Stack, TextField } from '@mui/material';
import { useState } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { addVille } from '../../api/APIville';
import ListVille from './ListVille';

function Ville() {

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [color, setColor] = useState("success");
  const [isAddedVille, setIsAddedVille] = useState(false);
  const [isVilleAdded, setIsVilleAdded] = useState(false);

  const [formData, setFormData] = useState({
    Id_ville: '',
    nom_ville: '',
    date_creation_ville: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handlesubmit = async () => {

    if (formData.nom_ville === '') {

      setIsError(true);
      setOpen(true);
      setSeverity("error");
      setColor("red");
      setMessage("Une erreur est survevue")
    }
    else {
      await addVille(formData).then(() => {
        setMessage("Ville ajoutée avec succès !");
        setOpen(true);
        setSeverity("success");
        setColor("green");
        setFormData({
          nom_ville: '',
        });
        setIsError(false);
        setIsVilleAdded(true);
        setIsAddedVille(false);
      }).catch((error) => {
        setMessage(error.response.data);
      });
    }
  };

  /*const VilleAdded = () => {
    setIsAddedVille(true);
  };*/

  return (
    <>
      <Stack spacing={2}>

         {isAddedVille && <MainCard title="Nouvelle Ville">

          <Stack spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                label="Nom ville"
                id="outlined-size-small01"
                size="small"
                color='secondary'
                name="nom_ville"
                value={formData.nom_ville}
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
            <Grid size={{ xs: 12, md: 3 }}>

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
        <MainCard title="Liste Ville">
          <ListVille VilleAdded={setIsAddedVille}  isVilleAdded={isVilleAdded} />
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

export default Ville