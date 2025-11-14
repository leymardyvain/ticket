// Dropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
//import './Dropdowntest.css'; // Assuming you have a CSS file for styling
import { Box, ClickAwayListener, IconButton } from '@mui/material';
import { IconDotsVertical } from '@tabler/icons-react';

const Dropdown = ({ row, Displaydetails, Displayconfirmation, DisplayAnnulation }) => {

    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const styles = {
        position: 'absolute',
        top: 28,
        right: 0,
        left: 0,
        zIndex: 1,
        border: '1px solid',
        p: 1,
        bgcolor: 'background.paper',
    };

    return (
        <>
            <div className="dialog-overlay" ref={dropdownRef}>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    //  sx={{ marginRight: "2px", borderWidth: 2, borderStyle: 'solid'  }}
                    onClick={toggleDropdown}
                >
                    <IconDotsVertical fontSize="inherit" style={{ strokeWidth: "2" }} />
                </IconButton>
                {isOpen && (<div className="dialog-content">
                    <div className='dropdown-item' onClick={() => Displaydetails(row)}>Voir</div>
                    <div className='dropdown-item' style={{ display: row.etat_Ticket.nom_etat_Ticket === "Résolu" ? 'block' : 'none' }} onClick={() => Displayconfirmation(row)}>Confirmer solution</div>
                    <div className='dropdown-item' style={{ display: row.etat_Ticket.nom_etat_Ticket === "Résolu" ? 'block' : 'none' }} onClick={() => DisplayAnnulation(row)}>Annuler solution</div>
                </div>
                )}
            </div>
            <ClickAwayListener onClickAway={handleClickOutside}>
                <Box sx={{ position: 'relative' }}>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        //  sx={{ marginRight: "2px", borderWidth: 2, borderStyle: 'solid'  }}
                        onClick={toggleDropdown}
                    >
                        <IconDotsVertical fontSize="inherit" style={{ strokeWidth: "2" }} />
                    </IconButton>
                    {isOpen ? (
                        <Box sx={styles}>
                            <div className='dropdown-item' onClick={() => Displaydetails(row)}>Voir</div>
                            <div className='dropdown-item' style={{ display: row.etat_Ticket.nom_etat_Ticket === "Résolu" ? 'block' : 'none' }} onClick={() => Displayconfirmation(row)}>Confirmer solution</div>
                            <div className='dropdown-item' style={{ display: row.etat_Ticket.nom_etat_Ticket === "Résolu" ? 'block' : 'none' }} onClick={() => DisplayAnnulation(row)}>Annuler solution</div>
                        </Box>
                    ) : null}
                </Box>
            </ClickAwayListener>

        </>
    );
};

export default Dropdown;