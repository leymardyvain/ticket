import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import ProtectedView from '../../pages/protect/ProtectedView';
import { getAllTicket, getAllUserTicketByUsername } from '../../../api/APITicket';
import TotalTicket from './TotalTicket';
import ProtectedAccessUser from '../../pages/protect/ProtectedAccessUser';
import ProtectedAccessAdmin from '../../pages/protect/ProtectedAccessAdmin';
import ProtectedAccessSuperviseur from '../../pages/protect/ProtectedAccessSuperviseur';
import GetUserRoles from '../../pages/protect/GetUserRoles';
import { getChartAdmin, getChartUser, getMostPopularPersonneEnCharge, getMostPopularPersonneEnChargeByAdmin, getNombreActivities, getSuivi_Ticket_Etat_Assigne_Dashboard, getSuivi_Ticket_Etat_Assigne_Dashboard_Admin, getSuivi_Ticket_Etat_En_Attente_Assignation_Dashboard, getSuivi_Ticket_Etat_En_Attente_Assignation_Dashboard_Admin, getSuivi_Ticket_Etat_En_Cours_Resolu_Dashboard, getSuivi_Ticket_Etat_Ferme_Dashboard, getSuivi_Ticket_Etat_Ferme_Dashboard_Admin, getSuivi_Ticket_Superviseur_en_cours_resolution_Admin, getSuivi_Ticket_Superviseur_resolu_Dashboard, getSuivi_Ticket_Superviseur_resolu_Dashboard_Admin } from '../../../api/APIsuiviTicket';
import TotalTicketEnAttenteAssignation from './TotalTicketEnAttenteAssignation';
import TotalTicketAssigne from './TotalTicketAssigne';
import TotalTicketEnCoursResolution from './TotalTicketEnCoursResolution';
import TotalTicketResolu from './TotalTicketResolu';
import TotalTicketFerme from '../../../ui-component/cards/TotalTicketFerme';
import PopularPersonnelEnCharge from './PopularPersonnelEnCharge';
import BarChartActiviteAnnuelle from './BarChartActiviteAnnuelle';
import { getHistoriqueByPersonnel } from '../../../api/APIhistorique';
import TotalActivities from '../../../ui-component/cards/TotalActivities';

// ==============================|| DEFAULT DASHBOARD ||============================== //

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);

  const [listSeries, setListSeries] = useState([]);

  const [listMostPopularUser, setListMostPopularUser] = useState([]);

  const [listTicket, setListTicket] = useState([]);

  const [listTicketEnAttenteAssignation, setListTicketEnAttenteAssignation] = useState([]);

  const [listTicketAssigne, setListTicketAssigne] = useState([]);

  const [listTicketEnCoursResolution, setListTicketEnCoursResolution] = useState([]);

  const [listTicketResolu, setListTicketResolu] = useState([]);

  const [listTicketFerme, setListTicketFerme] = useState([]);

  const [nombreActivities, setNombreActivities] = useState([]);

  const [nombreActivitiesAdminSup, setNombreActivitiesAdminSup] = useState(0);

  const username = ProtectedView();

  const recupUSerRole = GetUserRoles();

  let find_superviseur = recupUSerRole.find(rol => rol === 'ROLE_SUPERVISEUR');

  let find_admin = recupUSerRole.find(rol => rol === 'ROLE_ADMIN');

  const fetchDataAllByHistoriquePersonnel = async () => {
    try {
      const response = await getHistoriqueByPersonnel(username);
      setNombreActivities(response.data.length);
    } catch (error) {
      console.error('Error fetching list historique:', error);
    }
  };

  const fetchDataAllByHistoriqueAdminSup = async () => {
    try {
      const response = await getNombreActivities(username);
      setNombreActivitiesAdminSup(response.data);
    } catch (error) {
      console.error('Error fetching list activities admin Sup', error);
    }
  };

  const fetchDataAllChart = async () => {
    try {
      const response = await getChartAdmin();
      console.log('fetch response',response.data );
      setListSeries(response.data);
    } catch (error) {
      console.error('Error fetching chart:', error);
    }
  };

  const fetchDataAllChartUser = async () => {
    try {
      const response = await getChartUser(username);
      setListSeries(response.data);
    } catch (error) {
      console.error('Error fetching chart:', error);
    }
  };

  const fetchDataAllMostPopularPersonnelEnChargeAdmin = async () => {
    try {
      const response = await getMostPopularPersonneEnChargeByAdmin();
      setListMostPopularUser(response.data);
    } catch (error) {
      console.error('Error fetching list most popular Admin:', error);
    }
  };

  const fetchDataAllMostPopularPersonnelEnCharge = async () => {
    try {
      const response = await getMostPopularPersonneEnCharge(username);
      setListMostPopularUser(response.data);
    } catch (error) {
      console.error('Error fetching list most popular:', error);
    }
  };

  const fetchDataAllUserTicketByUser = async () => {
    try {
      const response = await getAllUserTicketByUsername(username);
      setListTicket(response.data);
    } catch (error) {
      console.error('Error fetching list all user ticket:', error);
    }
  };

  const fetchDataAllEtatAttenteAssignationUser = async () => {
    try {
      const response = await getSuivi_Ticket_Etat_En_Attente_Assignation_Dashboard(username);
      setListTicketEnAttenteAssignation(response.data);
    } catch (error) {
      console.error('Error fetching list all user ticket en attente assignation:', error);
    }
  };

  const fetchDataAllAssigeUser = async () => {
    try {
      const response = await getSuivi_Ticket_Etat_Assigne_Dashboard(username);
      setListTicketAssigne(response.data);
    } catch (error) {
      console.error('Error fetching list all user ticket assigne:', error);
    }
  };

  const fetchDataAllEnCoursResolutionUser = async () => {
    try {
      const response = await getSuivi_Ticket_Etat_En_Cours_Resolu_Dashboard(username);
      setListTicketEnCoursResolution(response.data);
    } catch (error) {
      console.error('Error fetching list all user ticket en cours resolution:', error);
    }
  };

  const fetchDataAllResoluUser = async () => {
    try {
      const response = await getSuivi_Ticket_Superviseur_resolu_Dashboard(username);
      setListTicketResolu(response.data);
    } catch (error) {
      console.error('Error fetching list all user ticket resolu:', error);
    }
  };

  const fetchDataAllFermeUser = async () => {
    try {
      const response = await getSuivi_Ticket_Etat_Ferme_Dashboard(username);
      setListTicketFerme(response.data);
    } catch (error) {
      console.error('Error fetching list all user ticket ferme:', error);
    }
  };

  const fetchDataAllFermeAdmin = async () => {
    try {
      const response = await getSuivi_Ticket_Etat_Ferme_Dashboard_Admin();
      setListTicketFerme(response.data);
    } catch (error) {
      console.error('Error fetching list all ticket ferme:', error);
    }
  };

  const fetchDataAllResoluAdmin = async () => {
    try {
      const response = await getSuivi_Ticket_Superviseur_resolu_Dashboard_Admin();
      setListTicketResolu(response.data);
    } catch (error) {
      console.error('Error fetching list all ticket resolu:', error);
    }
  };

  const fetchDataAllEnCoursResolutionAdmin = async () => {
    try {
      const response = await getSuivi_Ticket_Superviseur_en_cours_resolution_Admin()
      setListTicketEnCoursResolution(response.data);
    } catch (error) {
      console.error('Error fetching list all ticket en cours resolution:', error);
    }
  };

  const fetchDataAllAssigeAdmin = async () => {
    try {
      const response = await getSuivi_Ticket_Etat_Assigne_Dashboard_Admin();
      setListTicketAssigne(response.data);
    } catch (error) {
      console.error('Error fetching list all ticket assigne:', error);
    }
  };

  const fetchDataAllEtatAttenteAssignationAdmin = async () => {
    try {
      const response = await getSuivi_Ticket_Etat_En_Attente_Assignation_Dashboard_Admin();
      setListTicketEnAttenteAssignation(response.data);
    } catch (error) {
      console.error('Error fetching list all ticket en attente assignation:', error);
    }
  };

  const fetchDataAllTicket = async () => {
    try {
      const response = await getAllTicket();
      setListTicket(response.data);
    } catch (error) {
      console.error('Error fetching list all ticket:', error);
    }
  };

  useEffect(() => {
    setLoading(false);
    if (find_superviseur || find_admin) {
      fetchDataAllTicket();
      fetchDataAllEtatAttenteAssignationAdmin();
      fetchDataAllAssigeAdmin();
      fetchDataAllEnCoursResolutionAdmin();
      fetchDataAllResoluAdmin();
      fetchDataAllFermeAdmin();
      fetchDataAllMostPopularPersonnelEnChargeAdmin();
      fetchDataAllChart();
      fetchDataAllByHistoriqueAdminSup();
    }
    else {
      fetchDataAllUserTicketByUser();
      fetchDataAllEtatAttenteAssignationUser();
      fetchDataAllAssigeUser();
      fetchDataAllEnCoursResolutionUser();
      fetchDataAllResoluUser();
      fetchDataAllFermeUser();
      fetchDataAllMostPopularPersonnelEnCharge();
      fetchDataAllChartUser();
      fetchDataAllByHistoriquePersonnel();
    }
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalTicket isLoading={isLoading} listTicket={listTicket} />
          </Grid>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalTicketEnAttenteAssignation isLoading={isLoading} listTicket={listTicketEnAttenteAssignation} />
          </Grid>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalTicketAssigne isLoading={isLoading} listTicket={listTicketAssigne} />
          </Grid>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalTicketEnCoursResolution isLoading={isLoading} listTicket={listTicketEnCoursResolution} />
          </Grid>
          <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
            <TotalTicketResolu isLoading={isLoading} listTicket={listTicketResolu} />
          </Grid>
          <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
            <Grid container spacing={gridSpacing}>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalTicketFerme isLoading={isLoading} listTicket={listTicketFerme} />
              </Grid>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalActivities
                  {...{
                    isLoading: isLoading,
                    total: find_admin || find_superviseur ? nombreActivitiesAdminSup  : nombreActivities,
                    label: 'Total activités',
                    icon: <StorefrontTwoToneIcon fontSize="inherit" />
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, md: 8 }}>
            <BarChartActiviteAnnuelle isLoading={isLoading} listSeries={listSeries} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <PopularPersonnelEnCharge isLoading={isLoading} listMostPopularUser={listMostPopularUser} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
