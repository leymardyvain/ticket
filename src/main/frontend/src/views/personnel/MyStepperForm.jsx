import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Alert, AlertTitle } from '@mui/material';

// Import your individual form components for each step
import StepThreeForm from './StepThreeForm';
import StepPersonnelInfo from './StepPersonnelInfo';
import { getVille } from '../../api/APIville';
import StepRoleInfo from './StepRoleInfo';
import StepAccessInfo from './StepAccessInfo';
import StepDetailsInfo from './StepDetailsInfo';
import { getRole } from '../../api/APIrole';
import { addUser } from '../../api/APIuser';

const MyStepperForm = ({ setIsPersonnelAdded, setIsAddedPersonnel }) => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Step 1: Personnel Info', 'Step 2: Role', 'Step 3: Access', 'Step 4: Confirmation'];

    const [formData, setFormData] = React.useState({
        Id_personnel: '',
        nom_personnel: '',
        departement: '',
        roles: [],
        user: {
            id: '',
            name: '',
            username: 'test',
            password: 'test'
        },
        is_delete: false
    });

    const [departement, setDepartement] = useState({});

    const [selectedroles, setSelectedroles] = React.useState([]);

    const [ville, setVille] = useState([]);

    const [roles, setRoles] = React.useState([]);

    const [message, setMessage] = useState("");

    const [severity, setSeverity] = useState("success");

    const [typeSeverity, setTypeSeverity] = useState("Succes");

    const [open, setOpen] = useState(false);

    const [isUsernameExist, setIsUsernameExist] = useState(false);

    const fetchDataVille = async () => {
        try {
            const response = await getVille();
            setVille(response.data);
        } catch (error) {
            console.error('Error fetching ville:', error);
        }
    };

    const fetchDataRoles = async () => {
        try {
            const response = await getRole();
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    React.useEffect(() => {
        fetchDataVille();
        fetchDataRoles();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const [isError, setIsError] = useState(false);

    const validateDepartement = () => {

        if (Object.keys(departement).length === 0) {
            return false;
        }
        return true;
    };

    const validateRole = () => {
        if (selectedroles.length === 0) {
            return false;
        }
        return true;
    };

    const handleNext = () => {
        // Add validation logic here before advancing*
        if (validateDepartement()) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        else if (validateRole()) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        else {
            setOpen(true);
            setMessage("Vous devez définir un departement / un type d'utilisateur /accès pour ce personnel !");
        }

        if (activeStep === steps.length - 1) {

            if (formData.roles.length === 0) {
                setMessage('Vous devez selectionner un type utilisateur');
                setActiveStep((prevActiveStep) => prevActiveStep - 1);
                setOpen(true);
            }
            else if (formData.user.username === "" || formData.user.password === "") {
                setMessage('Vous devez renseigner un accès utilisateur');
                setActiveStep((prevActiveStep) => prevActiveStep - 1);
                setOpen(true);
            }
            else {
                addUser(formData).then(response => {
                    setIsPersonnelAdded(true);
                    setSeverity('success');
                    setTypeSeverity('Succes');
                    setMessage('Toutes les étapes ont été validées,  personnel ajouté avec succès.');
                })
                    .catch(error => {
                        setSeverity('error');
                        setTypeSeverity('Erreur');
                        setMessage(error.response.data);
                        setIsUsernameExist(true);
                        setActiveStep((prevActiveStep) => prevActiveStep - 2);
                    });
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <StepPersonnelInfo handleChange={handleChange}
                    formData={formData}
                    setFormData={setFormData}
                    isError={isError}
                    ville={ville}
                    setDepartement={setDepartement}
                    setOpen={setOpen}
                    open={open}
                    setIsUsernameExist={setIsUsernameExist}
                    message={message} />;
            case 1:
                return <StepRoleInfo roles={roles} 
                selectedroles={selectedroles} 
                setSelectedroles={setSelectedroles} 
                formData={formData} 
                setIsUsernameExist={setIsUsernameExist}
                setFormData={setFormData} />;
            case 2:
                return <StepAccessInfo formData={formData} 
                setFormData={setFormData} 
                severity={severity}
                typeSeverity={typeSeverity}
                message={message}
                setIsUsernameExist={setIsUsernameExist}
                isUsernameExist={isUsernameExist}
                isError={isError} />;
            case 3:
                return <StepDetailsInfo formData={formData}
                    setFormData={setFormData}
                    selectedroles={selectedroles}
                    setOpen={setOpen}
                    open={open}
                    message={message} />;
            case 4:
                return <StepThreeForm />;
            default:
                return 'Unknown step';
        }
    };

    return (
        <Box sx={{ width: '100%' }}>

            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{ mt: 2 }}>
                {activeStep === steps.length ? (
                    <div>
                        <Alert severity={severity}>
                            <AlertTitle>{typeSeverity}</AlertTitle>
                            {message}
                        </Alert>
                    </div>
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </Box>
                    </div>
                )}
            </Box>

        </Box>
    );
};

export default MyStepperForm;