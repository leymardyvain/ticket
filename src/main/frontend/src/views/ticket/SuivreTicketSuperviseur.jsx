import { Box, Tabs, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import ListAssignation from './ListAssignationTicket';
import ListSuiviSuperviseur from './ListAllTicketSuperviseur';

function SuivreTicketSuperviseur() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography component={'span'}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <MainCard>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Ticket à assigner" {...a11yProps(0)} />
                        <Tab label="Suivre les tickets " {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ListAssignation />
                </TabPanel>
                <TabPanel value={value} index={1}>
                   <ListSuiviSuperviseur />
                </TabPanel>
            </Box>
        </MainCard>
    );
}

export default SuivreTicketSuperviseur