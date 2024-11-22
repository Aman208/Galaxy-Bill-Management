import React from 'react';
import { Table, Box, TableBody, Typography, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';

const BillTable = ({ items, addItem, handleItemChange }) => (

    <Box sx={{ padding: 1, border: 3, borderTop: 0 }}>

        <Box display="flex" justifyContent="space-between" alignItems="center" >
            <Box textAlign="left">
                <Typography variant="subtitle1"><strong>Goods Purchase Details</strong></Typography>
            </Box>
            <Box textAlign="right">
                <Button onClick={addItem} size='small' variant="contained" color="primary" style={{}}>
                    Add Item
                </Button>
            </Box>
        </Box>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Amount</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <TextField
                                value={item.description}
                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                variant="outlined"
                                size="small"
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                variant="outlined"
                                size="small"
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                type="number"
                                value={item.rate}
                                onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
                                variant="outlined"
                                size="small"
                            />
                        </TableCell>
                        <TableCell>${item.amount.toFixed(2)}</TableCell>

                    </TableRow>
                ))}
                <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell > <Typography variant="subtitle2"><strong>Total Bill Amount</strong></Typography> </TableCell>
                        <TableCell  >
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

export default BillTable;
