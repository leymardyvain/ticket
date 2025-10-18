// assets
import { IconApps, IconArrowAutofitContent, IconBooks, IconBrandOffice, IconBuildingSkyscraper, IconEye, IconEyeCheck, IconLocation, IconReportAnalytics, IconTicket, IconUserPlus } from '@tabler/icons-react';

// constant
const icons = { IconBooks, IconUserPlus, IconLocation, IconBuildingSkyscraper, IconBrandOffice, IconTicket, IconReportAnalytics, IconEyeCheck, IconArrowAutofitContent };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const My_Menu = {
  id: 'My menu',
  type: 'group',
  children: [
    {
      id: 'SuivreAssigantion',
      title: 'Suivre Assignations',
      type: 'item',
      url: '/suivre_mes_assignations',
      icon: icons.IconEyeCheck,
      breadcrumbs: false
    },
    {
      id: 'AssignationTicket',
      title: 'Assigner Ticket',
      type: 'item',
      url: '/assigner_ticket',
      icon: icons.IconArrowAutofitContent,
      breadcrumbs: false
    },
    {
      id: 'AddTicket',
      title: 'Nouveau Ticket',
      type: 'item',
      url: '/ticket',
      icon: icons.IconTicket,
      breadcrumbs: false
    },
    {
      id: 'Listicket',
      title: 'Mes Tickets',
      type: 'item',
      url: '/list_ticket',
      icon: icons.IconTicket,
      breadcrumbs: false
    },
    {
      id: 'Rapport',
      title: 'Rapport',
      type: 'item',
      url: '/rapport',
      icon: icons.IconReportAnalytics,
      breadcrumbs: false
    },
    {
      id: 'Wiki',
      title: 'Wiki',
      type: 'item',
      url: '/wiki',
      icon: icons.IconBooks,
      breadcrumbs: false
    },
    {
      id: 'Personnel',
      title: 'Personnel',
      type: 'item',
      url: '/personnel',
      icon: icons.IconUserPlus,
      breadcrumbs: false
    },
    {
      id: 'Departement',
      title: 'Departement',
      type: 'item',
      url: '/departement',
      icon: icons.IconBrandOffice,
      breadcrumbs: false
    },
    {
      id: 'Societe',
      title: 'Societe',
      type: 'item',
      url: '/societe',
      icon: icons.IconBuildingSkyscraper,
      breadcrumbs: false
    },
    {
      id: 'Ville',
      title: 'Ville',
      type: 'item',
      url: '/ville',
      icon: icons.IconLocation,
      breadcrumbs: false
    },

  ]
};

export default My_Menu;
