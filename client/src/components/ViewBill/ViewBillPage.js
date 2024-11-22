import React, { useState, useEffect } from 'react';
import { Box, Alert, Autocomplete, IconButton, Collapse, Typography, FormControl, MenuItem, TextField, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import axios from 'axios';

const ViewBillPage = () => {

    const [billNumber, setBillNumber] = useState('');
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [dateRange, setDateRange] = useState('6 months');
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [notification, setNotification] = useState('');
    const [stats , setStats] = useState({})


    const dateRanges = ['6 months', '3 months', '1 month', '12 months'];

    const getConsumers = async () => {
        const customerRes = await axios.get("http://localhost:8080/customers", {
        });
        setCustomers(customerRes.data.data);
    };

    useEffect(() => {
        getConsumers()
    }, []);

    const handleCustomerChange = async (newValue) => {
        setSelectedCustomer(newValue);
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date)) {
            return 'Invalid Date';
        }
        const day = String(date.getDate()).padStart(2, '0'); // Get the day, and pad with leading zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-indexed, so +1), and pad with leading zero
        const year = date.getFullYear(); // Get the full year

        return `${day}/${month}/${year}`;
    }

    const fetchBillsByNumber = async () => {
        try {
            setBills([])
            setNotification('')
            const response = await axios.post(`http://localhost:8080/bills/billNo`,
                { "billNo": billNumber });

            setSelectedBill(response.data.data);
        } catch (error) {
            setSelectedBill(null);
            setNotification(`Error fetching bill by number: ${billNumber}`);
        }
    };

    const fetchBillsByCustomerAndDate = async () => {
        try {
            setSelectedBill(null);
            const response = await axios.post('http://localhost:8080/bills/customer', {
                "customerId": selectedCustomer._id, "dateRange": dateRange
            })
            setBills(response.data.data)
            setStats(response.data.stats)
            setNotification('')
        } catch (error) {
            setNotification('Error fetching bills :: ' + error?.response?.data.error);
            setBills([])
            setStats({})

        }
    };


    const totalSumBillAmount = () => {
        return bills.reduce((total, item) => {
            return total + (item.totalAmount);
        }, 0);
    };


    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <div className="page-wrapper">
                <div className="content">
                    <Typography mb={4} mt={3} variant="h4" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bolder' }} className="page-title">View Bill</Typography>
                    <Grid container spacing={5}>
                        {/* Filter by Customer and Date */}
                        <Grid item xs={8} md={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h6">Filter by Customer and Date</Typography>

                                <FormControl fullWidth margin="normal">
                                    <Autocomplete
                                        id="customer-select"
                                        options={customers}
                                        autoHighlight
                                        getOptionLabel={(option) => option.name + " : " + option.area}
                                        value={selectedCustomer}
                                        onChange={(event, newValue) => {
                                            handleCustomerChange(newValue)
                                        }}
                                        isOptionEqualToValue={(option, value) => option._id === value._id}
                                        renderOption={(props, option) => {
                                            const { key, ...optionProps } = props;
                                            return (
                                                <Box
                                                    key={key}
                                                    component="li"
                                                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                    {...optionProps}
                                                >
                                                    {option.name} {" : "} {option.area}
                                                </Box>
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Choose customer"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>

                                <TextField
                                    select
                                    label="Date Range"
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

                                <Button variant="contained" onClick={fetchBillsByCustomerAndDate} sx={{ mt: 2 }}>
                                    Search
                                </Button>
                            </Paper>
                        </Grid>
                        {/* Search by Bill Number */}
                        <Grid item xs={4} md={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h6">Search by Bill Number</Typography>
                                <TextField
                                    label="Bill Number"
                                    value={billNumber}
                                    onChange={(e) => setBillNumber(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button variant="contained" onClick={fetchBillsByNumber}>
                                    Search
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>

                    {notification ? (
                        <Alert severity="error">
                            {notification}
                        </Alert>
                    ) : null}

                    {/* Bill Details */}
                    {selectedBill && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6">Bill Details</Typography>
                            <Table>
                                <TableHead>


                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={2}><strong>Customer Name</strong></TableCell>
                                        <TableCell colSpan={2}><strong>Bill Number</strong></TableCell>
                                        <TableCell colSpan={2}><strong>Purchase Date</strong></TableCell>
                                        <TableCell colSpan={2}><strong>Total Quantity</strong></TableCell>
                                        <TableCell colSpan={2}><strong>Total Bill</strong></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2}>{selectedBill.customerName}</TableCell>
                                        <TableCell colSpan={2}>{selectedBill.billNo}</TableCell>
                                        <TableCell colSpan={2}><strong>{formatDate(selectedBill.purchaseDate)}</strong></TableCell>
                                        <TableCell colSpan={2}>{selectedBill.totalQuantity}</TableCell>
                                        <TableCell colSpan={2}>{selectedBill.totalAmount}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Item Total</TableCell>
                                    </TableRow>
                                    {selectedBill.billItem.map((item, index) => (
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
                    )}

                    {/* Display Bills by Customer and Date */}
                    {bills.length > 0 && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6">Bills List</Typography>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
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
                            <Grid container justifyContent="space-between" sx={{ marginTop: 2, marginRight: 5 }}>

                                <Grid item>
                                    <TextField
                                        label="Total Bill Amount"
                                        value={totalSumBillAmount()}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Total Almirah"
                                        value={stats.totalAlmirah}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Total Dressing"
                                        value={stats.totalDressing}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item>
                                    <TextField
                                        label="Total Table"
                                        value={stats.totalTable}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                                


                            </Grid>
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
            <TableRow sx={{ mb: 4, p: 2 }} >
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
