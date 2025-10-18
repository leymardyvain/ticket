import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoutes from '../views/pages/protect/ProtectedRoutes';
import ProtectedAccessSuperviseur from '../views/pages/protect/ProtectedAccessSuperviseur';
import OnlySuperviseur from '../views/pages/protect/OnlySuperviseur';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));

const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));

const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// New page routing
const Wiki = Loadable(lazy(() => import('views/wiki')));
const UnauthorizedPage = Loadable(lazy(() => import('views/ticket/SuivreTicket.jsx')));
const SuivreMesAssignations = Loadable(lazy(() => import('views/ticket/SuivreTicket.jsx')));
const Assignation = Loadable(lazy(() => import('views/ticket/SuivreTicketSuperviseur.jsx')));
const Ticket = Loadable(lazy(() => import('views/ticket')));
const ListTicket = Loadable(lazy(() => import('views/ticket/SuivreTicketUser.jsx')));
const Rapport = Loadable(lazy(() => import('views/rapport')));
const Personnel = Loadable(lazy(() => import('views/personnel')));
const Departement = Loadable(lazy(() => import('views/departement')));
const Societe = Loadable(lazy(() => import('views/societe')));
const Ville = Loadable(lazy(() => import('views/ville')));


// ==============================|| MAIN ROUTING ||============================== //

const superviseur = ProtectedAccessSuperviseur();

const MainRoutes = {
  path: '/',
  element:
    <ProtectedRoutes>
      <MainLayout />
    </ProtectedRoutes>,

  children: [
    {
      path: '/',
      element:
        <ProtectedRoutes>
          <DashboardDefault />
        </ProtectedRoutes>
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <ProtectedRoutes> <DashboardDefault /></ProtectedRoutes>
        }
      ]
    },
    {
      path: 'typography',
      element: <ProtectedRoutes><UtilsTypography /></ProtectedRoutes>
    },
    {
      path: 'color',
      element: <ProtectedRoutes><UtilsColor /></ProtectedRoutes>
    },
    {
      path: 'shadow',
      element: <ProtectedRoutes><UtilsShadow /></ProtectedRoutes>
    },
    {
      path: 'unauthorized',
      element: <ProtectedRoutes><UnauthorizedPage /></ProtectedRoutes>
    },
    {
      path: 'suivre_mes_assignations',
      element: <ProtectedRoutes><SuivreMesAssignations /></ProtectedRoutes>
    },
    {
      path: 'assigner_ticket',
      element: <ProtectedRoutes><Assignation /></ProtectedRoutes>
    },
    {
      path: 'ticket',
      element: <ProtectedRoutes><Ticket /></ProtectedRoutes>
    },
    {
      path: 'list_ticket',
      element: <ProtectedRoutes><ListTicket /></ProtectedRoutes>
    },
    {
      path: 'rapport',
      element: <ProtectedRoutes><Rapport /></ProtectedRoutes>
    },
    {
      path: 'wiki',
      element: <ProtectedRoutes><Wiki /></ProtectedRoutes>
    },
    {
      path: 'personnel',
      element: <ProtectedRoutes><Personnel /></ProtectedRoutes>
    },
    {
      path: 'departement',
      element: <ProtectedRoutes><Departement /></ProtectedRoutes>
    },
    {
      path: 'societe',
      element: <ProtectedRoutes><Societe /></ProtectedRoutes>
    },
    {
      path: 'ville',
      element: <ProtectedRoutes><Ville /></ProtectedRoutes>
    },

  ]
};

export default MainRoutes;
