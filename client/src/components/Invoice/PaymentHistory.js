import React, { useState } from 'react';
import { Table, TableBody, Box, Typography, TableCell, TableHead, TableRow, TextField, Button, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const PaymentHistory = ({ initialPayments }) => {
    const [payments, setPayments] = useState(initialPayments || []);
    const [newPayment, setNewPayment] = useState({ date: '', amountPaid: '', method: '' });

    // Function to handle input change for new payment
    const handleInputChange = (field, value) => {
        setNewPayment(prev => ({ ...prev, [field]: value }));
    };

    // Add a new payment entry
    const addPayment = () => {
        if (newPayment.date && newPayment.amountPaid && newPayment.method) {
            setPayments([...payments, { ...newPayment, amountPaid: parseFloat(newPayment.amountPaid) }]);
            setNewPayment({ date: '', amountPaid: '', method: '' });
        }
    };

    // Delete a payment entry
    const deletePayment = (index) => {
        setPayments(payments.filter((_, i) => i !== index));
    };

    return (
        <Box sx={{ padding: '4px', border: 3, borderTop: 0 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" >
                <Box textAlign="left">
                    <Typography variant="subtitle1"><strong>Payment Details</strong></Typography>
                </Box>
                <Box textAlign="right">
                    <Button onClick={addPayment} size='small' variant="contained" color="primary" style={{}}>
                        Add Payment
                    </Button>
                </Box>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Serial No.</TableCell>
                        <TableCell>Payment Date</TableCell>
                        <TableCell>Payment To</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell>Amount Paid</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.map((payment, index) => (
                        <TableRow key={index}>
                            <TableCell onClick={() => deletePayment(index)} sx={{ width: '10%' }}>
                                {index+1}.
                            </TableCell>
                            <TableCell sx={{ width: '20%' }}>
                                <TextField
                                    value={payment.date}
                                    variant="outlined"
                                    size="small"
                                />
                            </TableCell>
                            <TableCell sx={{ width: '25%' }}>
                                <TextField
                                    value={payment.person}
                                    variant="outlined"
                                    size="small"
                                />
                            </TableCell>
                            <TableCell sx={{ width: '25%' }} >
                                <TextField
                                    value={payment.method}
                                    variant="outlined"
                                    size="small"
                                />
                            </TableCell>
                            <TableCell sx={{ width: '25%' }} >
                                <TextField
                                    value={payment.amountPaid.toFixed(2)}
                                    variant="outlined"
                                    size="small"
                                />
                            </TableCell>
                        </TableRow>

                    ))}
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell > <Typography variant="subtitle2"><strong>Total Payment</strong></Typography> </TableCell>
                        <TableCell sx={{ width: '25%' }}  >
                            <TextField
                                value={300}
                                variant="outlined"
                                size="small"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>



        </Box>
    );
};

export default PaymentHistory;
