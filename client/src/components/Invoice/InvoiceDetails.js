import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const InvoiceDetails = () => {
    const [invoiceDetails, setInvoiceDetails] = useState({
        invoiceNumber: '',
        invoiceDate: '',
        transportMode: '',
        vehicleNumber: '',
        ewayBillNumber: '',
        customerDetails: ''
    });

    // Function to handle changes in input fields
    const handleChange = (field, value) => {
        setInvoiceDetails(prevDetails => ({
            ...prevDetails,
            [field]: value
        }));
    };

    return (
        <Box display="flex" justifyContent="space-between" sx={{ width: '100%' }}>
            {/* Left Side - 50% Width for Invoice Details */}
            <Box sx={{ width: '50%', padding: 1, border: 3, borderTop: 0 }}>
                <Typography variant="body1"><strong>Invoice Details</strong></Typography>
                <TextField
                    label="Customer Details"
                    variant="outlined"
                    size="small"
                    value={invoiceDetails.customerDetails}
                    onChange={(e) => handleChange('customerDetails', e.target.value)}
                    fullWidth
                    sx={{ marginTop: 1 }}

                />
                <TextField
                    label="Invoice No."
                    variant="outlined"
                    size="small"
                    value={invoiceDetails.invoiceNumber}
                    onChange={(e) => handleChange('invoiceNumber', e.target.value)}
                    fullWidth

                />
                <TextField
                    label="Invoice Date"
                    type="date"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={invoiceDetails.invoiceDate}
                    onChange={(e) => handleChange('invoiceDate', e.target.value)}
                    fullWidth

                />
            </Box>

            {/* Right Side - 50% Width for Transport Details */}
            <Box sx={{ width: '50%', padding: 1, border: 3, borderTop: 0, borderLeft: 0 }}>
                <Typography variant="body1"><strong>Transport Details</strong></Typography>
                <TextField
                    label="Transport Mode"
                    variant="outlined"
                    size="small"
                    value={invoiceDetails.transportMode}
                    onChange={(e) => handleChange('transportMode', e.target.value)}
                    fullWidth
                    sx={{ marginTop: 1 }}
                />
                <TextField
                    label="Vehicle No"
                    variant="outlined"
                    size="small"
                    value={invoiceDetails.vehicleNumber}
                    onChange={(e) => handleChange('vehicleNumber', e.target.value)}
                    fullWidth

                />
                <TextField
                    label="Eway Bill No"
                    variant="outlined"
                    size="small"
                    value={invoiceDetails.ewayBillNumber}
                    onChange={(e) => handleChange('ewayBillNumber', e.target.value)}
                    fullWidth

                />
            </Box>
        </Box>
    );
};

export default InvoiceDetails;
