import React, { useState, useEffect } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import { IconPlaystationX } from '@tabler/icons-react';

function AutoClosingAlert({ message }) {
    
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the timer when the component unmounts or before the effect runs again
    return () => {
      clearTimeout(timer);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Collapse in={open}>
      <Alert
        severity="success"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <IconPlaystationX />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
}

export default AutoClosingAlert;