import PropTypes from 'prop-types';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { format } from "date-fns";

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto, IconUserCircle } from '@tabler/icons-react';
import User1 from 'assets/images/users/user-round.svg';
import { ListItemButton } from '@mui/material';
import { Link } from 'react-router';

function ListItemWrapper({ children }) {
  const theme = useTheme();

  const getRedirect = (statut) => {

    switch (statut) {
      case 'En attente assignation':
        return "/assigner_ticket";
      case 'Assigné':
        return "/assigner_ticket";
      case 'En cours résolution':
        return "/assigner_ticket";
      case 'Fermé':
        return "/assigner_ticket";
      default:
        return {}; // Default style or no style
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: alpha(theme.palette.grey[200], 0.3)
        }
      }}
    >
      {children}
    </Box>
  );
}

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

export default function NotificationList({ listNotification, showAll, setOpen }) {
  const containerSX = { pl: 7 };

  const displayedItems = showAll ? listNotification : listNotification.slice(0, 1); // Show first 1 or all

  const handleOpenNotificationDialog = () => {
    setOpen(true);
  };

  return (
    <List sx={{ width: '100%', maxWidth: { xs: 300, md: 330 }, py: 0 }}>
      {displayedItems.map((item) => (
        <ListItemButton key={item.id_notification} onClick={handleOpenNotificationDialog}>

          <ListItemWrapper >

            <ListItem
              alignItems="center"
              disablePadding
              secondaryAction={
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography variant="caption">{format(item.date_notification, "dd-MM-yy HH:mm")}</Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar alt="John Doe" src={User1} />
                {/* <IconUserCircle />*/}
              </ListItemAvatar>
              <ListItemText primary={item.suivi_Ticket.ticket.personnel.nom_personnel} />

            </ListItem>
            <Stack spacing={2} sx={containerSX}>
              <Typography variant="subtitle2">{item.message}</Typography>
              {/*<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Chip label="Assigner" color="primary" size="small" sx={{ width: 'min-content' }} />
              </Stack>*/}
            </Stack>

          </ListItemWrapper>

        </ListItemButton>

      ))}
      {/*   <ListItemWrapper>
        <ListItem
          alignItems="center"
          disablePadding
          secondaryAction={
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <Typography variant="caption">2 min ago</Typography>
            </Stack>
          }
        >
          <ListItemAvatar>
            <Avatar
              sx={{
                color: 'success.dark',
                bgcolor: 'success.light'
              }}
            >
              <IconBuildingStore stroke={1.5} size="20px" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Store Verification Done</Typography>} />
        </ListItem>
        <Stack spacing={2} sx={containerSX}>
          <Typography variant="subtitle2">We have successfully received your request.</Typography>
          <Chip label="Unread" color="error" size="small" sx={{ width: 'min-content' }} />
        </Stack>
      </ListItemWrapper> */ }
      {/*   <ListItemWrapper>
        <ListItem
          alignItems="center"
          disablePadding
          secondaryAction={
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <Typography variant="caption">2 min ago</Typography>
            </Stack>
          }
        >
          <ListItemAvatar>
            <Avatar
              sx={{
                color: 'primary.dark',
                bgcolor: 'primary.light'
              }}
            >
              <IconMailbox stroke={1.5} size="20px" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Check Your Mail.</Typography>} />
        </ListItem>
        <Stack spacing={2} sx={containerSX}>
          <Typography variant="subtitle2">All done! Now check your inbox as you&apos;re in for a sweet treat!</Typography>
          <Button variant="contained" endIcon={<IconBrandTelegram stroke={1.5} size={20} />} sx={{ width: 'min-content' }}>
            Mail
          </Button>
        </Stack>
      </ListItemWrapper> */}
      {/* <ListItemWrapper>
        <ListItem
          alignItems="center"
          disablePadding
          secondaryAction={
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <Typography variant="caption">2 min ago</Typography>
            </Stack>
          }
        >
         <ListItemAvatar>
            <Avatar alt="John Doe" src={User1} />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
        </ListItem>
        <Stack spacing={2} sx={containerSX}>
          <Typography component="span" variant="subtitle2">
            Uploaded two file on &nbsp;
            <Typography component="span" variant="h6">
              21 Jan 2020
            </Typography>
          </Typography>
          <Card sx={{ bgcolor: 'secondary.light' }}>
            <Stack direction="row" spacing={2} sx={{ p: 2.5 }}>
              <IconPhoto stroke={1.5} size="20px" />
              <Typography variant="subtitle1">demo.jpg</Typography>
            </Stack>
          </Card>
        </Stack>
      </ListItemWrapper> */}
      { /* <ListItemWrapper>
        <ListItem
          alignItems="center"
          disablePadding
          secondaryAction={
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <Typography variant="caption">2 min ago</Typography>
            </Stack>
          }
        >
          <ListItemAvatar>
            <Avatar alt="John Doe" src={User1} />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
        </ListItem>
        <Stack spacing={2} sx={containerSX}>
          <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
          <Chip label="Confirmation of Account." color="success" size="small" sx={{ width: 'min-content' }} />
        </Stack>
      </ListItemWrapper> */}
    </List>
  );
}

ListItemWrapper.propTypes = { children: PropTypes.node };
