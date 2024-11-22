import React from 'react';
import { Button, Stack } from '@mui/material';

const Buttons = ({ onDownload, onPrint }) => (
    <Stack direction="row" spacing={2} justifyContent="center" marginTop="20px">
        <Button variant="contained" color="primary" onClick={onPrint}>
            Print
        </Button>
        <Button variant="contained" color="secondary" onClick={onDownload}>
            Download as PDF
        </Button>
    </Stack>
);

export default Buttons;
