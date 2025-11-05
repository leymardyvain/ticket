// Dropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css'; // Assuming you have a CSS file for styling
import { IconButton } from '@mui/material';
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

    return (
        <div className="dropdown" ref={dropdownRef}>
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
            {isOpen && (<div className="dropdown-menu">
                <div className='dropdown-item' onClick={() => Displaydetails(row)}>Voir</div>
                <div className='dropdown-item' style={{ display: row.etat_Ticket.nom_etat_Ticket === "Résolu" ? 'block' : 'none' }} onClick={() => Displayconfirmation(row)}>Confirmer solution</div>
                <div className='dropdown-item' style={{ display: row.etat_Ticket.nom_etat_Ticket === "Résolu" ? 'block' : 'none' }} onClick={() => DisplayAnnulation(row)}>Annuler solution</div>
            </div>
            )}
        </div>
    );
};

export default Dropdown;