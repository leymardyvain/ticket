import { Autocomplete, Button, Chip, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { getListPersonnelAssignateur, getListPersonnelEnCharge, getPersonnel, getPersonnelByNomPersonnel, getPersonnelByUsernameRapport } from '../../api/APIpersonnel';
import { getEtat_Ticket } from '../../api/APIetat_Ticket';
import { getType_Ticket } from '../../api/APITypeTicket';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from "date-fns";
import 'dayjs/locale/fr'; // Import the French locale from dayjs
import ListSuiviRapport from '../ticket/ListAllTicketRecherche';
import { getRapport } from '../../api/APIsuiviTicket';
import GetUserRoles from '../pages/protect/GetUserRoles';
import ProtectedAccessSuperviseur from '../pages/protect/ProtectedAccessSuperviseur';
import ProtectedAccessAdmin from '../pages/protect/ProtectedAccessAdmin';
import ProtectedAccessUser from '../pages/protect/ProtectedAccessUser';
import ProtectedView from '../pages/protect/ProtectedView';
import { getNiveau_criticite } from '../../api/APITypeNiveau';


function Rapport() {

    const [isclick, setIsclick] = useState(false);

    const [isAdded, setIsAdded] = useState(false);

    const [listRapport, setListRapport] = useState([]);

    const [personnel, setPersonnel] = useState([]);

    const [personnel_en_charge, setPersonnel_en_charge] = useState([]);

    const [personnel_assignateur, setPersonnel_assignateur] = useState([]);

    const [etat_Ticket, setEtat_Ticket] = useState([]);

    const [niveau_criticite, setNiveau_criticite] = useState([]);

    const [type_Ticket, setType_Ticket] = useState([]);

    const [selectedPersonnel, setSelectedPersonnel] = useState(null);

    const [selectedPersonnelAssignateur, setSelectedPersonnelAssignateur] = useState(null);

    const [selectedPersonnelEnCharge, setSelectedPersonnelEnCharge] = useState(null);

    const [selectedEtat_Ticket, setSelectedEtat_Ticket] = useState(null);

    const [selectedType_Ticket, setSelectedType_Ticket] = useState(null);

    const [selectedNiveau_Criticite, setSelectedNiveau_Criticite] = useState(null);

    const [datedebut, setDatedebut] = useState(null);

    const [datefin, setDatefin] = useState(null);

    const superviseur = ProtectedAccessSuperviseur();
    const admin = ProtectedAccessAdmin();
    const user = ProtectedAccessUser();


    const fetchDataPersonnel = async () => {
        try {
            const response = await getPersonnel();
            setPersonnel(response.data);
        } catch (error) {
            console.error('Error fetching personnel:', error);
        }
    };

    const fetchDataPersonnelAssignateur = async () => {
        try {
            const response = await getListPersonnelAssignateur();
            setPersonnel_assignateur(response.data);
        } catch (error) {
            console.error('Error fetching personnel assignateur:', error);
        }
    };

    const fetchDataPersonnelEnCharge = async () => {
        try {
            const response = await getListPersonnelEnCharge();
            setPersonnel_en_charge(response.data);
        } catch (error) {
            console.error('Error fetching personnel en charge:', error);
        }
    };

    const fetchDataEtat_Ticket = async () => {
        try {
            const response = await getEtat_Ticket();
            setEtat_Ticket(response.data);
        } catch (error) {
            console.error('Error fetching etat ticket:', error);
        }
    };

    const fetchDataType_Ticket = async () => {
        try {
            const response = await getType_Ticket();
            setType_Ticket(response.data);
        } catch (error) {
            console.error('Error fetching type ticket:', error);
        }
    };

    const fetchDataNiveau_Criticite = async () => {
        try {
            const response = await getNiveau_criticite();
            setNiveau_criticite(response.data);
        } catch (error) {
            console.error('Error fetching niveau criticite ticket:', error);
        }
    };

    const handleChangePersonnel = (event, newPersonnel) => {
        setSelectedPersonnel(newPersonnel);
        setIsAdded(true);
    };

    const handleChangePersonnelAssignateur = (event, newPersonnel) => {
        setSelectedPersonnelAssignateur(newPersonnel);
        setIsAdded(true);
    };


    const handleChangePersonnelEnCharge = (event, newPersonnel) => {
        setSelectedPersonnelEnCharge(newPersonnel);
        setIsAdded(true);
    };

    const handleChangeEtat_Ticket = (event, newEtat) => {
        setSelectedEtat_Ticket(newEtat);
        setIsAdded(true);
    };

    const handleChangeType_Ticket = (event, newType) => {
        setSelectedType_Ticket(newType);
        setIsAdded(true);
    };

    const handleChangeNiveau_Criticite = (event, newType) => {
        setSelectedNiveau_Criticite(newType);
        setIsAdded(true);
    };

    const handleDateDebut = (datedebut) => {

        if (datedebut !== null) {
            const formatDate = format(datedebut, 'dd-MM-yyyy');
            setDatedebut(formatDate);
            setIsAdded(true);
        }
        else {
            setDatedebut(null);
        }
    };

    const handleDateFin = (datefin) => {
        if (datefin !== null) {
            const formatDate = format(datefin, 'dd-MM-yyyy');
            setDatefin(formatDate);
            setIsAdded(true);
        }
        else {
            setDatefin(null);
        }

    };

    useEffect(() => {
        fetchDataPersonnel();
        fetchDataPersonnelAssignateur();
        fetchDataPersonnelEnCharge();
        fetchDataEtat_Ticket();
        fetchDataType_Ticket();
        fetchDataNiveau_Criticite();
    }, []);

    const handleSubmitClient = async (event) => {
        event.preventDefault();
        try {

            let personnel = null;

            if (user) {
                const response = await getPersonnelByUsernameRapport(ProtectedView());
                personnel = response.data.nom_personnel;
            }

            if (admin || superviseur) {
                personnel = selectedPersonnel !== null ? selectedPersonnel.nom_personnel : null;
            }

            const recup_etat = selectedEtat_Ticket !== null ? selectedEtat_Ticket.nom_etat_Ticket : null;
            const recup_type = selectedType_Ticket !== null ? selectedType_Ticket.nom_type_Ticket : null;
            const recup_niveau = selectedNiveau_Criticite !== null ? selectedNiveau_Criticite.nom_niveau_criticite : null;
            const recup_personnel_en_charge = selectedPersonnelEnCharge !== null ? selectedPersonnelEnCharge.nom_personnel : null;
            const recup_personnel_assignateur = selectedPersonnelAssignateur !== null ? selectedPersonnelAssignateur.nom_personnel : null;

            const response = await getRapport(personnel, recup_etat, recup_type, recup_niveau, recup_personnel_en_charge, recup_personnel_assignateur
                , datedebut, datefin);
            setListRapport(response.data);
            setIsclick(true);
        }
        catch (error) {
            console.error('Error fetching ticket rapport:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmitClient}>

                <MainCard title="Nouveau Rapport">
                    <Stack spacing={2}>
                        <Grid container spacing={2}>
                            {(admin || superviseur) && <Grid size={6}>
                                <Autocomplete
                                    options={personnel}
                                    getOptionLabel={(option) => option.nom_personnel} // Use the 'title' property as the label
                                    value={selectedPersonnel}
                                    fullWidth
                                    onChange={handleChangePersonnel}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Selectionnez un personnel" />
                                    )}
                                />
                            </Grid>}
                            <Grid size={6}>
                                <Autocomplete
                                    options={etat_Ticket}
                                    getOptionLabel={(option) => option.nom_etat_Ticket} // Use the 'title' property as the label
                                    value={selectedEtat_Ticket}
                                    fullWidth
                                    onChange={handleChangeEtat_Ticket}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Selectionnez un etat" />
                                    )}
                                />
                            </Grid>
                            <Grid size={6}>
                                <Autocomplete
                                    options={type_Ticket}
                                    getOptionLabel={(option) => option.nom_type_Ticket} // Use the 'title' property as the label
                                    value={selectedType_Ticket}
                                    fullWidth
                                    onChange={handleChangeType_Ticket}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Selectionnez un type" />
                                    )}
                                />
                            </Grid>
                            <Grid size={6}>
                                <Autocomplete
                                    options={niveau_criticite}
                                    getOptionLabel={(option) => option.nom_niveau_criticite} // Use the 'title' property as the label
                                    value={selectedNiveau_Criticite}
                                    fullWidth
                                    onChange={handleChangeNiveau_Criticite}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Selectionnez un niveau" />
                                    )}
                                />
                            </Grid>
                            <Grid size={3}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
                                    <DatePicker
                                        label="A partir du :"
                                        inputFormat="DD/MM/YYYY"
                                        onChange={date => handleDateDebut(date)}
                                        slotProps={{ TextField: { variant: 'outlined' } }}
                                        fullWidth
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid size={3}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
                                    <DatePicker
                                        label="Au :"
                                        inputFormat="DD/MM/YYYY"
                                        onChange={date => handleDateFin(date)}
                                        fullWidth
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid size={6}>
                                <Autocomplete
                                    options={personnel_assignateur}
                                    getOptionLabel={(option) => option.nom_personnel} // Use the 'title' property as the label
                                    value={selectedPersonnelAssignateur}
                                    fullWidth
                                    onChange={handleChangePersonnelAssignateur}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Selectionnez un personnel Assignateur" />
                                    )}
                                />
                            </Grid>
                            <Grid size={6}>
                                <Autocomplete
                                    options={personnel_en_charge}
                                    getOptionLabel={(option) => option.nom_personnel} // Use the 'title' property as the label
                                    value={selectedPersonnelEnCharge}
                                    fullWidth
                                    onChange={handleChangePersonnelEnCharge}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Selectionnez un personnel en charge" />
                                    )}
                                />
                            </Grid>

                        </Grid>

                        <Grid size={3}>

                            <Button
                                type='submit'
                                variant="contained"
                                style={{ backgroundColor: "#D0C5D2", color: "#793198" }}>
                                Afficher
                            </Button>

                        </Grid>

                        <Grid size={12}>

                            {isAdded && <Divider>
                                {selectedPersonnel && <Chip style={{ backgroundColor: '#0f9b6fff', fontWeight: 'bold', margin: '1px', color: 'white' }} label={selectedPersonnel !== null ? selectedPersonnel.nom_personnel : ""} size='large' />}
                                {selectedPersonnelAssignateur && <Chip style={{ backgroundColor: '#0f9b47ff', fontWeight: 'bold', margin: '1px', color: 'white' }} label={selectedPersonnelAssignateur !== null ? selectedPersonnelAssignateur.nom_personnel : ""} size='large' />}
                                {selectedPersonnelEnCharge && <Chip style={{ backgroundColor: '#0f9b9bff', fontWeight: 'bold', margin: '1px', color: 'white' }} label={selectedPersonnelEnCharge !== null ? selectedPersonnelEnCharge.nom_personnel : ""} size='large' />}
                                {selectedEtat_Ticket && <Chip style={{ backgroundColor: '#ab2626ff', fontWeight: 'bold', margin: '1px', color: 'white' }} label={selectedEtat_Ticket !== null ? selectedEtat_Ticket.nom_etat_Ticket : ""} size='large' />}
                                {selectedType_Ticket && <Chip style={{ backgroundColor: '#335ee8ff', fontWeight: 'bold', margin: '1px', color: 'white' }} label={selectedType_Ticket !== null ? selectedType_Ticket.nom_type_Ticket : ""} size='large' />}
                            </Divider>}

                        </Grid>

                        <Grid size={12}>
                            {isclick && <ListSuiviRapport suivi={listRapport} />}
                        </Grid>

                      {/*  {selectedPersonnelEnCharge && <Divider>
                            {selectedPersonnelEnCharge && <Chip style={{ backgroundColor: '#0f9b9bff', fontWeight: 'bold', margin: '1px', color: 'white' }} label={selectedPersonnelEnCharge !== null ? selectedPersonnelEnCharge.nom_personnel : ""} size='large' />}
                        </Divider>}

                        <Grid size={4}>
                            <Stack spacing={2}>
                                <TextField
                                    hiddenLabel
                                    size="small"
                                />
                                <Typography variant="h5" component="h2">
                                    Nombre ticket en cours de résolution :
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Nombre ticket Résolu :
                                </Typography>
                            </Stack>
                        </Grid> */}
                    </Stack>
                </MainCard >

            </form>
        </>
    )
}

export default Rapport