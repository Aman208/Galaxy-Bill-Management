import React from 'react';
import { Box, Typography } from '@mui/material';

const CompanyDetails = () => (
    <Box id="invoice" sx={{ paddingLeft: 1, paddingRight: 1, backgroundColor: '#f9f9f9', border: 3 }}>

        <Box display="flex" justifyContent="space-between" alignItems="center" >
            {/* Left Side - Company PAN and Details */}
            <Box>
                <Typography variant="subtitle2"><strong>PAN No:</strong> HULPK6650Q</Typography>
            </Box>

            {/* Center - Tax Invoice */}
            <Box textAlign="center">
                <Typography variant="subtitle1" sx={{ textDecoration: 'underline' }}><strong>TAX INVOICE</strong></Typography>
            </Box>

            {/* Right Side - Mobile Number */}
            <Box textAlign="right">
                <Typography variant="body1"><strong>Mob Number: +91 9122738951 </strong></Typography>
                <Typography variant="body1"><strong> +91 9122520335</strong></Typography>
            </Box>
        </Box>

        {/* Centered Company Details */}
        <Box textAlign="center" >
            <Typography variant="h6"><strong>Maa Gayatri Enterprises</strong></Typography>
            <Typography variant="subtitle2">Office: G.T Road Chauparan, Near SBI Bank Dist: Hazaribagh (Jharkhand)</Typography>
            <Typography variant="subtitle2"></Typography>
        </Box>
    </Box>
);

export default CompanyDetails;






