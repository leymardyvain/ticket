import { Box, Tabs, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import SuivreMesConfirmations from './SuivreMesAssignation';
import SuivreMesResolutions from './SuivreMesResolutions';
import SuivreMesResolus from './SuivreMesResolus';
import SuivreMesFermes from './SuivreMesTicketsFermes';

function SuivreTicket() {

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
                        <Tab label="Mes confirmations" {...a11yProps(0)} />
                        <Tab label="Mes ticket à suivre " {...a11yProps(1)} />
                        <Tab label="Mes tickets résolus" {...a11yProps(2)} />
                        <Tab label="Mes tickets fermés" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <SuivreMesConfirmations />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SuivreMesResolutions />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SuivreMesResolus />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <SuivreMesFermes />
                </TabPanel>
            </Box>
        </MainCard>
    );
}

export default SuivreTicket