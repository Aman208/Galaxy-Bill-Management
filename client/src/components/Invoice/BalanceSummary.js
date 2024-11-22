import React from 'react';
import { Table,Box,Typography, TableBody, TableCell, TableRow } from '@mui/material';
import { BorderTop } from '@mui/icons-material';

const BalanceSummary = ({ totalAmount, balanceDue }) => (
    <Box display="flex" justifyContent="flex-end" mb={3} border={3}  borderTop={0} >
            <Box sx={{ width: '50%', paddingLeft: 2 }}>
    <Table>
        <TableBody>
            <TableRow>
               <TableCell > <Typography variant="subtitle1"><strong>Total Bill Amount</strong></Typography> </TableCell>
                <TableCell><Typography variant="subtitle2"><strong>{totalAmount.toFixed(2)}</strong></Typography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell > <Typography variant="subtitle1"><strong>Total Due </strong></Typography> </TableCell>
                <TableCell><Typography variant="subtitle2"><strong>{balanceDue.toFixed(2)}</strong></Typography></TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </Box>
    </Box>
);

export default BalanceSummary;


