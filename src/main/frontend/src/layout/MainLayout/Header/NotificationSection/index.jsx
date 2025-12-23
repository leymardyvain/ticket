import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons-react';
import ProtectedView from '../../../../views/pages/protect/ProtectedView';
import { getHistorique } from '../../../../api/APInotification';
import { Badge } from '@mui/material';
import NotificationDialog from './NotificationDialog';
import notificationSound from 'assets/son/notification1.mp3';
import useSound from 'use-sound';

// notification status options
const status = [
  {
    value: 'all',
    label: 'All Notification'
  },
  {
    value: 'new',
    label: 'New'
  },
  {
    value: 'unread',
    label: 'Unread'
  }
];

// ==============================|| NOTIFICATION ||============================== //

export default function NotificationSection() {

  const theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);

  const [openNotificationDialog, setOpenNotificationDialog] = useState(false);

  const [value, setValue] = useState('');

  const [showAll, setShowAll] = useState(false);

  const [listNotification, setListNotification] = useState([]);

  const username = ProtectedView();

  const audioRef = useRef(new Audio(notificationSound));

  let nbrefois = 1;

  const fetchDataNotificationUser = async () => {
    try {
      const response = await getHistorique(username);
      setListNotification(response.data);
      if (response.data.length > 0) {
        if (nbrefois === 1) {
          audioRef.current.play();
        }

      } else {
        // Optionally, pause or reset the audio when the dialog closes
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Rewind to the beginning
      }
    } catch (error) {
      console.error('Error fetching  all notification:', error);
    }
    nbrefois++;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDataNotificationUser();
    }, 5000); // 5 seconde in milliseconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [openNotificationDialog]); // Empty dependency array ensures this runs once on mount

  /*
    useEffect(() => {
      fetchDataNotificationUser();
    }, [openNotificationDialog]);
  */
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    // let sound = new Audio('assets/son/notification.wav');
    //if (listNotification.length > 0) {
    //sound.play();
    //}
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleChange = (event) => {
    event?.target.value && setValue(event?.target.value);
    console.log('value ', event?.target.value)
  };

  return (
    <>
      <Box sx={{ ml: 2 }}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: 'all .2s ease-in-out',
            bgcolor: 'secondary.light',
            color: 'secondary.dark',
            '&[aria-controls="menu-list-grow"],&:hover': {
              bgcolor: 'secondary.dark',
              color: 'secondary.light'
            },
            width: 66, 
            height: 46
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        > <Badge badgeContent={listNotification.length} color="error" max={10} >
            <IconBell stroke={1.5} size="28px" />
          </Badge>
        </Avatar>
      </Box>
      <Popper
        placement={downMD ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [downMD ? 5 : 0, 20]
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions position={downMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                    <Grid container direction="column" spacing={2}>
                      <Grid size={12}>
                        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 2, px: 2 }}>
                          <Grid>
                            <Stack direction="row" spacing={2}>
                              <Typography variant="subtitle1">{ listNotification.length > 0 ? "Toutes mes notifications" : "Aucune notification" }</Typography>
                              <Chip size="small" label={listNotification.length} sx={{ color: 'background.default', bgcolor: 'warning.dark' }} />
                            </Stack>
                          </Grid>
                          {/*<Grid>
                            <Typography component={Link} to="#" variant="subtitle2" color="primary">
                              Mark as all read
                            </Typography>
                          </Grid>*/}
                        </Grid>
                      </Grid>
                      <Grid size={12}>
                        <Box
                          sx={{
                            height: '100%',
                            maxHeight: 'calc(100vh - 205px)',
                            overflowX: 'hidden',
                            '&::-webkit-scrollbar': { width: 5 }
                          }}
                        >
                          <Grid container direction="column" spacing={2}>
                            { /* <Grid size={12}>
                              <Box sx={{ px: 2, pt: 0.25 }}>
                                <TextField
                                  id="outlined-select-currency-native"
                                  select
                                  fullWidth
                                  value={value}
                                  onChange={handleChange}
                                  slotProps={{ select: { native: true } }}
                                >
                                  {status.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </TextField>
                              </Box>
                            </Grid>*/ }
                            <Grid size={12} sx={{ p: 0 }}>
                              <Divider sx={{ my: 0 }} />
                            </Grid>
                          </Grid>
                          <NotificationList listNotification={listNotification} showAll={showAll} setOpen={setOpenNotificationDialog} />
                          <NotificationDialog open={openNotificationDialog} setOpen={setOpenNotificationDialog} data={listNotification} setListNotification={setListNotification} setClose={setOpen} />
                        </Box>
                      </Grid>
                    </Grid>
                    {/*<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                      { /*<Button size="small" disableElevation>
                        View All
                      </Button>
                      {!showAll && listNotification.length > 1 && (
                        <Button size="small" onClick={() => setShowAll(true)}>Voir plus</Button>
                      )}
                      {showAll && (
                        <Button size="small" onClick={() => setShowAll(false)}>Voir moins</Button>
                      )}
                    </CardActions>
                    */ }
                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                      { /*<Button size="small" disableElevation>
                        View All
                      </Button>*/ }
                      {listNotification.length > 1 && (
                        <Button size="small" onClick={() => setOpenNotificationDialog(true)}>Voir plus</Button>
                      )}
                    </CardActions>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
