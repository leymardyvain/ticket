import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import MainCard from 'ui-component/cards/MainCard';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { format } from "date-fns";
import { getWiki } from '../../api/APIsolution';
import { IconCalendar, IconIndentIncrease, IconTrekking, IconTrolley, IconUserCircle } from '@tabler/icons-react';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Wiki() {
    const [expanded, setExpanded] = React.useState('panel1');

    const [solution, setSolution] = React.useState([]);

    const [searchItem, setSearchItem] = React.useState("");

    const handleChangeSearchItem = (event) => {
        setSearchItem(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await getWiki(searchItem);
            setSolution(response.data);
        } catch (error) {
            console.error('Error fetching solution:', error);
        }
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <Stack spacing={2}>
                <MainCard title="Mini Wiki">
                    <Stack spacing={2}>
                        <Grid size={12}>

                            <TextField
                                value={searchItem}
                                onChange={handleChangeSearchItem}
                                fullWidth
                                label="Que cherchez vous ?"
                            />
                        </Grid>

                        <Grid size={3}>

                          {searchItem &&  <Button
                                onClick={handleSubmit}
                                variant="contained"
                                style={{ backgroundColor: "#D0C5D2", color: "#793198" }}>
                                Afficher
                            </Button> }
                        </Grid>
                    </Stack>
                </MainCard>
                 <Typography component="h1">{solution.length} élement(s) trouvé(s)</Typography>
                {solution.map((sol) =>
                    <Accordion key={sol.id_solution} expanded={expanded === `panel${sol.id_solution}`} onChange={handleChange(`panel${sol.id_solution}`)}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Stack direction="row" spacing={2}>
                                <Stack spacing={2}>
                                    <Typography component="span"><IconUserCircle /> {sol.suivi_Ticket.ticket.personnel.nom_personnel}</Typography>
                                    <Typography component="span"><IconIndentIncrease /> {sol.suivi_Ticket.ticket.description}</Typography>
                                </Stack>
                                <Stack spacing={2}>
                                    <Typography component="span"><IconCalendar /> {format(sol.date_solution, "dd-MM-yyyy HH:mm")}</Typography>
                                    <Typography component="span"><IconTrekking /> {sol.suivi_Ticket.personnel_en_charge.nom_personnel}</Typography>
                                </Stack>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {sol.description_solution}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )}
            </Stack>
        </div>
    );
}