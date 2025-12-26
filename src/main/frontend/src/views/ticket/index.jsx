import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import MainCard from 'ui-component/cards/MainCard';
import { getNiveau_criticite } from '../../api/APITypeNiveau';
import themeStyles from './themeStyles';
import DropzoneComponent from './DropzoneComponent';
import { getType_Ticket } from '../../api/APITypeTicket';
import { addTicket } from '../../api/APITicket';
import ProtectedView from '../pages/protect/ProtectedView';
import { addFichier } from '../../api/APIfichier';
import { IconDirection, IconDirections, IconEyeCheck, IconTextResize } from '@tabler/icons-react';
import ListTicket from './ListTicket';


function Ticket() {

    const [formData, setFormData] = React.useState({
        Id_ticket: '',
        numero_ticket: '',
        description: '',
        niveau_criticite: {},
        type_Ticket: {},
        images: [],
        username: ''

    });

    const [isAdd, setIsAdd] = useState(true);

    const recupUsername = ProtectedView();

    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');

    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed

    const year = currentDate.getFullYear();

    const formattedDate = `${day}${month}${year}`;

    const [generatedString, setGeneratedString] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [selectedNiveau, setSelectedNiveau] = useState({});

    const [selectedType, setSelectedType] = useState({});

    const [niveau_criticite, setNiveau_criticite] = useState([]);

    const [type_Ticket, setType_Ticket] = useState([]);

    const [open, setOpen] = useState(false);

    const [severity, setSeverity] = useState("success");

    const [color, setColor] = useState("success");

    const [message, setMessage] = useState("");

    const [files, setFiles] = useState([]);

    const [isSubmit, setIsSubmit] = useState(false);

    const fetchDataNiveauCriticite = async () => {
        try {
            const response = await getNiveau_criticite();
            setNiveau_criticite(response.data);
            setIsLoading(true);
        } catch (error) {
            console.error('Error fetching niveau criticite:', error);
            setIsLoading(false);
        }
    };

    const fetchDataTypeTicket = async () => {
        try {
            const response = await getType_Ticket();
            setType_Ticket(response.data);
            setIsLoading(true);
        } catch (error) {
            console.error('Error fetching Type Ticket:', error);
            setIsLoading(false);
        }
    };

    const generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmopkrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const handleGenerate = () => {
        const newString = generateRandomString(20); // Generate a 10-character string
        setGeneratedString(newString);
    };

    const numTicket = `${generatedString}${formattedDate}`

    React.useEffect(() => {
        handleGenerate();
    }, [isSubmit]);

    const handleChangeNiveau = (event) => {
        setSelectedNiveau(event.target.value);
    };

    const handleChangeType = (event) => {
        setSelectedType(event.target.value);
    };

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlesubmit = async () => {

        if (formData.description === '' || Object.values(selectedType).length === 0 || Object.values(selectedNiveau).length === 0 ) {

            setOpen(true);
            setSeverity("error");
            setColor("red");
            setMessage("Un des champs est vide !");

        } else {

            setIsSubmit(true);

            const afterNumTicket = { ...formData, numero_ticket: numTicket };
            const afterNiveau = { ...afterNumTicket, niveau_criticite: selectedNiveau };
            const afterType = { ...afterNiveau, type_Ticket: selectedType };
            const afterImages = { ...afterType, images: files }
            const afterUsername = { ...afterImages, username: recupUsername }

            await addTicket(afterUsername).then(() => {
                setOpen(true);
                setSeverity("success");
                setColor("green");
                setMessage("Ticket créé avec succès");
                setFormData({
                    Id_ticket: '',
                    numero_ticket: '',
                    description: '',
                    niveau_criticite: {},
                    type_Ticket: {},
                    images: [],
                    username: '',
                });
                setFiles([]);
                setNiveau_criticite({});
                setType_Ticket({});
            }).catch((error) => {
                setOpen(true);
                setSeverity("error");
                setColor("red");
                setMessage("Une erreur est survenue lors de la création du ticket")
            });

            if (files.length > 0) {
                await handleFileUpload();
            }
        }

        setIsSubmit(false);
    };

    const handleFileUpload = async () => {

        const formDataFile = new FormData();

        files.forEach((file) => {
            formDataFile.append('fichier', file); // 'files' est le nom du champ attendu par le serveur
        });

        formDataFile.append('numeroTicket', numTicket)

        try {
            addFichier(formDataFile);
        } catch (error) {
            console.error('Erreur lors du téléchargement des fichiers:', error);
        }

    };

    const getDynamicNiveauStyle = (niveau) => {
        console.log("niveau ", niveau);
        switch (niveau) {
            case 'Majeur':
                return themeStyles.primary;
            case 'Moyen':
                return themeStyles.secondary;
            case 'Faible':
                return themeStyles.danger;
            default:
                return {}; // Default style or no style
        }
    };

    const handlePage = () => {
        setIsAdd(!isAdd);
    };

    React.useEffect(() => {
        fetchDataNiveauCriticite();
        fetchDataTypeTicket();
    }, [isSubmit]);

    return (
        <>
            {!isAdd && <ListTicket handlePage={handlePage} />}

            {isAdd && <Grid container spacing={2}>
                <Grid container direction="row" size={12}>
                    <Button
                        variant="contained"
                        onClick={handlePage}
                        style={{ backgroundColor: "#793198", color: "#fafafaff" }}
                        startIcon={<IconEyeCheck />}>
                        Suivre mes tickets
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <MainCard title="Nouveau ticket">
                        <Stack spacing={2}>
                            <TextField fullWidth
                                value={numTicket}
                            />
                            <TextField fullWidth
                                label="Description"
                                value={formData.description}
                                name='description'
                                onChange={handleChange}
                                multiline
                                rows={5}
                                placeholder='Veuillez decrire votre besoin...' />
                        </Stack>
                    </MainCard>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={2}>
                        <MainCard title="Type Ticket">
                            <Stack spacing={2}>
                                {isLoading && <FormControl fullWidth>
                                    <InputLabel id="type_ticket">Type</InputLabel>
                                    <Select
                                        labelId="type_ticket"
                                        id="type_ticket"
                                        defaultValue=''
                                        displayEmpty
                                        label="Type"
                                        value={selectedType}
                                        onChange={handleChangeType}

                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {type_Ticket.length > 0 && type_Ticket.map((type, index) =>
                                            <MenuItem
                                                key={index}
                                                value={type}>
                                                {type.nom_type_Ticket}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                }
                            </Stack>
                        </MainCard>
                        <MainCard title="Niveau de criticité">
                            <Stack spacing={2}>
                                {isLoading && <FormControl fullWidth>
                                    <InputLabel id="niveau_criticite">Niveau</InputLabel>
                                    <Select
                                        labelId="niveau_criticite"
                                        id="niveau_criticite"
                                        defaultValue=''
                                        displayEmpty
                                        label="Niveau"
                                        value={selectedNiveau}
                                        onChange={handleChangeNiveau}

                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {niveau_criticite.length > 0 && niveau_criticite.map((niveau, index) =>
                                            <MenuItem
                                                key={index}
                                                value={niveau}>
                                                {niveau.nom_niveau_criticite}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                }
                            </Stack>
                        </MainCard>
                    </Stack>
                </Grid>
                {selectedType.nom_type_Ticket !== "Demande" && <Grid size={12}>
                    <MainCard title="inserez une image">
                        <DropzoneComponent setFiles={setFiles} files={files} />
                    </MainCard>
                </Grid>}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Button
                        onClick={handlesubmit}
                        variant="contained"
                        disabled={isSubmit}
                        style={{ backgroundColor: "#d2cbc5ff", color: "#793198" }}>
                        Enregistrer
                    </Button>
                </Grid>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={severity}
                        variant="filled"
                        sx={{ width: '100%', color: `${color}`, bgcolor: "#FFFFFF" }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </Grid >
            }
        </>
    )
}

export default Ticket