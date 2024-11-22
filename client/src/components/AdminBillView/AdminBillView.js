import React, { useState, useEffect } from 'react';
import { Box, Alert, TablePagination, IconButton, Collapse, Typography, FormControl, MenuItem, TextField, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import axios from 'axios';

const ViewBillPage = () => {

    const [dateRange, setDateRange] = useState('6 months');
    const [bills, setBills] = useState([]);
    const [notification, setNotification] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [totalBills, setTotalBills] = useState(0);


    const dateRanges = ['6 months', '3 months', '1 month', '12 months'];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearch = (event) => {
        setPage(0);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);

    };

    useEffect(() => {
        fetchBillsByPageNo()
    }, [page, rowsPerPage, dateRange]
    );


    const fetchBillsByPageNo = async () => {
        try {
            const response = await axios.post('http://localhost:8080/bills/all', {
                "page": page, limit: rowsPerPage, "dateRange": dateRange
            })
            setBills(response.data.data)
            setPage(response.data.currentPage)
            setRowsPerPage(response.data.limit)
            setTotalBills(response.data.totalBills)
            setNotification('')
        } catch (error) {
            setNotification( error?.response?.data.error);
            setBills([])
        }
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <div className="page-wrapper">
                <div className="content">
                    <Box container >
                        <Paper sx={{ p: 1 }}>
                            <Typography mb={1} mt={1} variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bolder' }} className="page-title">All Bills</Typography>
                            <TextField
                                select
                                label="Filter by Date"
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                fullWidth
                                margin="normal"
                            >
                                {dateRanges.map((range) => (
                                    <MenuItem key={range} value={range}>
                                        {range}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Paper>
                    </Box>


                    {notification ? (
                        <Alert severity="error">
                            {notification}
                        </Alert>
                    ) : null}


                    {bills.length > 0 && (
                        <Box sx={{ mt: 4 }}>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell  >  </TableCell>
                                            <TableCell>Bill Number</TableCell>
                                            <TableCell>Customer Name</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Total Quantity</TableCell>
                                            <TableCell>Total Bill</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bills.map((bill) => (
                                            <BillRow key={bill.billId} bill={bill} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={totalBills}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                sx={{
                                    "& p": {
                                        "marginTop": 'auto',
                                        "marginBottom": 'auto'
                                    }
                                }}
                            />

                        </Box>
                    )}
                </div>
            </div>
        </Box>
    );
};


const BillRow = ({ bill }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ mb: 3, p: 2 }} >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>{bill.billNo}</TableCell>
                <TableCell>{bill.customerName}</TableCell>
                <TableCell>{new Date(bill.purchaseDate).toLocaleDateString()}</TableCell>
                <TableCell>{bill.totalQuantity}</TableCell>
                <TableCell>{bill.totalAmount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Products
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Item Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bill.billItem.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.productName}</TableCell>
                                            <TableCell>{item.itemQuantity}</TableCell>
                                            <TableCell>{item.itemRate}</TableCell>
                                            <TableCell>{item.itemTotal}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};


export default ViewBillPage;
