import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { getCountFichier, getDownloadFileName, getFichierByIDTicket } from "../../api/APIfichier";
import { IconCircleX, IconDownload, IconEye, IconPlaystationX } from "@tabler/icons-react";
import { development, production } from 'api/connexion';
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DisplayDialog({ open, setOpen, data }) {

    const affichageDescriptionNumeroTicket = `Fichier(s) Associé à ${data?.ticket?.numero_ticket}`;

    const [listFichier, setListFichier] = useState([]);

    const [imageUrl, setImageUrl] = useState('');

    const [isSelectedIMG, setIsSelectedIMG] = useState(false);

    const [fichier, setFichier] = useState();

    const handleClose = () => {
        setOpen(false);
        setFichier("");
        setIsSelectedIMG(false);

    };

    const fetchDownloadFile = async (fileName) => {
        try {

            const response = await getDownloadFileName(fileName);
            // Create a Blob from the response data
            const pdfBlob = new Blob([response.data], { type: "application/image" });

            setFichier(pdfBlob);

            console.info('fichier', fichier);

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(pdfBlob);

            // Create a temporary <a> element to trigger the download
            const tempLink = document.createElement("a");

            tempLink.href = url;

            tempLink.setAttribute(
                "download",
                `${fileName}`
            ); // Set the desired filename for the downloaded file

            // Append the <a> element to the body and click it to trigger the download
            document.body.appendChild(tempLink);

            tempLink.click();

            // Clean up the temporary elements and URL
            document.body.removeChild(tempLink);

            window.URL.revokeObjectURL(url);

            // setOpenFichier(true);

        } catch (error) {
            console.error("Error downloading image:", error);
        }
    };

    // Display selected PDF
    const displayPdf = async (filename) => {

        try {
            let rurl = process.env.NODE_ENV === "development" ? development() : production();

            const response = await axios.get(`${rurl}/fichier/display/${filename}`, {
                responseType: 'blob'
            });

            // Create a blob URL for the PDF
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        } catch (error) {
            console.error('Error fetching IMAGE:', error);
        }
    };

    const fetchDataImageData = async () => {
        try {
                        /*  const response = await getSolutionBySuiviTicket(data?.id_suivi_Ticket);
                setListeSolution(response.data);
                console.log('response :', response.data);*/
            if (data?.ticket?.id_ticket) {
                const response = await getFichierByIDTicket(data?.ticket?.id_ticket);
                setListFichier(response.data);
                console.log('response :', response.data);
            }
        } catch (error) {
            console.error('Error fetching ImageData:', error);
        }
    };

    React.useEffect(() => {
        fetchDataImageData();
    }, [open]);

    React.useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    const DisplayPdfFile = (row) => {
        displayPdf(row.name);
        setIsSelectedIMG(true);
    };

    const DisplayFile = (row) => {
        fetchDownloadFile(row.name);
        fetchDataImageData();
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title02"
                open={open}
                maxWidth='md'
                fullWidth
            >

                <DialogTitle id="alert-dialog-title">
                    {"Detail du ticket"}
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <IconPlaystationX />

                </IconButton>

                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField label="Numero Ticket" value={data?.ticket?.numero_ticket} fullWidth />
                        </Grid>
                        <Grid size={6}>
                            <TextField label="Nom demandeur" value={data?.ticket?.personnel?.nom_personnel} fullWidth />
                        </Grid>
                        <Grid size={6}>
                            <TextField label="Departement" value={data?.ticket?.personnel?.departement?.nom_departement} fullWidth />
                        </Grid>
                        <Grid size={6}>
                            <TextField label="Societe" value={data?.ticket?.personnel?.departement?.societe?.nom_societe} fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <TextField label="Description" multiline
                                rows={5} value={data?.ticket?.description} fullWidth />
                        </Grid>
                        <Grid size={6}>
                            <TextField label="Nom Assignateur" value={data?.personnel_assignateur?.nom_personnel} fullWidth />
                        </Grid>
                        <Grid size={6}>
                            <TextField label="Type ticket" value={data?.ticket?.type_Ticket?.nom_type_Ticket} fullWidth />
                        </Grid>
                        <Grid size={6}>
                            <TextField label="Type incident" value={data?.ticket?.niveau_criticite?.nom_niveau_criticite} fullWidth />
                        </Grid>
                    </Grid>

                    {listFichier.length > 0 && <Divider>{data ? <Chip style={{ backgroundColor: '#00b4d8', fontWeight: 'bold', margin: '20px', color: 'white' }} label={affichageDescriptionNumeroTicket} size='large' />
                        : ""}</Divider>}

                    {listFichier.length > 0 &&
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Nom fichier</TableCell>
                                        <TableCell align="right">Type fichier</TableCell>
                                        <TableCell align="right">Fichier</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listFichier.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">{row.type}</TableCell>
                                            <TableCell align="right">
                                                <Tooltip title='Visualiser'>
                                                    <IconButton sx={{ bgcolor: '#f0f1f5ff', color: "#486de7ff", marginRight: "2px" }}
                                                        aria-label="voir"
                                                        onClick={() => DisplayPdfFile(row)}>
                                                        <IconEye />
                                                    </IconButton></Tooltip>
                                                {/*<Tooltip title='Télécharger'><IconButton sx={{ bgcolor: '#f1e9ddff', color: "#dc4921ff" }} aria-label="télécharger" onClick={() => DisplayFile(row)}>
                                                    <IconDownload />
                                                </IconButton></Tooltip>*/}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }

                    {listFichier.length > 0 && <Divider><Chip style={{ backgroundColor: '#00b4d8', fontWeight: 'bold', margin: '20px', color: 'white' }} label="Visualiser document" size='large' /></Divider>}

                    {isSelectedIMG && <div style={{ padding: '20px' }}>

                        <div style={{ display: 'flex' }}>

                            {/* PDF viewer */}
                            <div style={{ width: '100%' }}>

                                {imageUrl && (
                                    <iframe
                                        src={imageUrl}
                                        width="100%"
                                        height="450px"
                                        title="PDF Viewer"
                                        style={{ border: '1px solid #ccc' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}