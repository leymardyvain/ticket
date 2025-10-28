import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';

// project imports
import { DASHBOARD_PATH } from 'config';
//import Logo from 'ui-component/Logo';
import Logo from 'assets/images/Logo1.png'
import MyLogoHeader from '../../../ui-component/MyLogoHeader';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection() {
  return (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="theme-logo">
      <MyLogoHeader />
    </Link>
  );
}
