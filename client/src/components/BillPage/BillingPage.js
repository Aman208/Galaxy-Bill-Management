import React, { useState, useEffect } from 'react';
import { Box, Alert, Typography, Autocomplete, FormControl, InputLabel, Select, MenuItem, TextField, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import './Billing.css';



const BillingPage = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [pricing, setPricing] = useState({});
    const [billItems, setBillItems] = useState([]);
    const [billDate, setBillDate] = useState('');
    const [billNo, setBillNo] = useState('');
    const [productPricingMap, setProductPricingMap] = useState(new Map())
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState('');


    const getProductsAndConsumers = async () => {
        const productRes = await axios.get("http://localhost:8080/products", {
        });
        const customerRes = await axios.get("http://localhost:8080/customers", {
        });
        setProducts(productRes.data.data);
        setCustomers(customerRes.data.data);
    };

    useEffect(() => {
        getProductsAndConsumers()
    }, []);

    const createProductPricingMap = async (customerPricingList) => {
        const productPriceMap = new Map();
        products.forEach(item => {
            productPriceMap.set(item._id, item.defaultPrice);
        });
        customerPricingList.forEach(item => {
            productPriceMap.set(item.productId, item.price);
        });
        await setProductPricingMap(productPriceMap)
    }

    const handleCustomerChange = async (newValue) => {
        setSelectedCustomer(newValue);
        let name = '';
        try {
            await axios.get(`http://localhost:8080/customers/${newValue._id}`)
                .then(response => {
                    setPricing(response.data.pricing)
                    createProductPricingMap(response.data.pricing)
                    name = response.data.data.name
                }
                );
            setNotification(`Successfully fetch ${newValue.name} customer product and pricing`)
        } catch (err) {
            setNotification("failed to fetch customer product and pricing")
        }
        // setBillDate('');
        setBillItems([]);
        // setBillNo('')
    };


    const handleProductChange = (event) => {

        const productId = event.target.value;
        if (!selectedProducts.includes(productId)) {
            setSelectedProducts([...selectedProducts, productId]);
            setBillItems([...billItems, { productId, quantity: 1, price: productPricingMap.get(productId) || 0 }]);
        }
    };

    const handleQuantityChange = (index, event) => {
        const newBillItems = [...billItems];
        newBillItems[index].quantity = event.target.value;
        setBillItems(newBillItems);
    };

    const removeProduct = (index, event) => {
        const newBillItems = [...billItems];
        newBillItems.splice(index, 1);
        setBillItems(newBillItems);
        const newSelectedProducts  = [...selectedProducts]
        newSelectedProducts.splice(index , 1);
        setSelectedProducts(newSelectedProducts);

    };

    const handlePriceChange = (index, event) => {
        const newBillItems = [...billItems];
        newBillItems[index].price = event.target.value;
        setBillItems(newBillItems);
    };

    function incrementString(input) {
    
        const match = input.match(/^([a-zA-Z]*)(\d+)([a-zA-Z]*)$/);
        if (!match) {
            return input;
        }
    
        const prefix = match[1];
        const numericPart = match[2];
        const suffix = match[3];
        const incrementedNumber = parseInt(numericPart, 10) + 1;
        return prefix + incrementedNumber + suffix;
    }

    const calculateTotal = () => {
        return billItems.reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0);
    };

    const handleSaveBill = async () => {

        const billData = {
            "customerId": selectedCustomer._id,
            "billNo": billNo,
            "purchaseDate": billDate,
            "billItems": billItems,
        };
        try {
            await axios.post('http://localhost:8080/bills/', billData)
            setNotification("Bill Saved");
        } catch (err) {
            setNotification('Failed to save bill data');
        } finally {
            setBillItems([]);
            setSelectedProducts([]);
            setBillNo(incrementString(billNo))
            setSelectedCustomer(null)
        }
    };


    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

            <div className="page-wrapper">
                <div className="content">
                    <Typography mb={4} mt={3} variant="h4" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bolder' }} className="page-title">Generate Bill</Typography>
                    {/* <FormControl fullWidth margin="normal">
                        <InputLabel>Select Customer</InputLabel>
                        <Select
                            value={selectedCustomer}
                            onChange={handleCustomerChange}
                        >
                            {customers.map(customer => (
                                <MenuItem key={customer._id} value={customer._id}>
                                    {customer.name} {":"} {customer.area}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            id="customer-select"
                            options={customers}
                            
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



                    {selectedCustomer && (
                        <>
                            <Grid container spacing={2} marginTop={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Bill Date"
                                        type="date"
                                        value={billDate}
                                        onChange={(event) => setBillDate(event.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Bill No"
                                        value={billNo}
                                        onChange={(event) => setBillNo(event.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    )}

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Select Product</InputLabel>
                        <Select
                            value=""
                            onChange={handleProductChange}
                            disabled={!selectedCustomer}
                        >
                            <MenuItem disabled key={"Almirah"} value={"Almirah"}>
                                {"Almirah"}
                            </MenuItem>
                            {products.map(product => product.productType == 'Almirah' ? (
                                <MenuItem key={product._id} value={product._id}>
                                    {product.name}
                                </MenuItem>
                            ) : null)}
                            <MenuItem disabled key={"Dressing"} value={"Dressing"}>
                                {"Dressing"}
                            </MenuItem>
                            {products.map(product => product.productType == 'Dressing' ? (
                                <MenuItem key={product._id} value={product._id}>
                                    {product.name}
                                </MenuItem>
                            ) : null)}
                            <MenuItem disabled key={"Table"} value={"Table"}>
                                {"Table"}
                            </MenuItem>
                            {products.map(product => product.productType == 'Table' ? (
                                <MenuItem key={product._id} value={product._id}>
                                    {product.name}
                                </MenuItem>
                            ) : null)}
                        </Select>
                    </FormControl>


                    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell size='large'>Product</TableCell>
                                    <TableCell size='large'>Price</TableCell>
                                    <TableCell size='large'>Quantity</TableCell>
                                    <TableCell size='large'>Item Total</TableCell>
                                    <TableCell size='large'>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {billItems.map((item, index) => {
                                    const product = products.find(p => p._id === item.productId);
                                    return (
                                        <TableRow key={item.productId}>
                                            <TableCell  >{product?.name}</TableCell>
                                            <TableCell  >
                                                <TextField
                                                
                                                    type="number"
                                                    inputProps={{ step: 50 }}
                                                    value={item.price || product?.defaultPrice}
                                                    onChange={(event) => handlePriceChange(index, event)}
                                                />

                                            </TableCell>
                                            <TableCell >
                                                <TextField
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(event) => handleQuantityChange(index, event)}
                                                />
                                            </TableCell>
                                            <TableCell >{item.quantity * (item.price !== 0 ? item.price : product?.defaultPrice)}</TableCell>
                                            <TableCell  onClick={(event) => removeProduct(index, event)} ><Button variant="contained" startIcon={<CancelIcon />}>
                                                Remove
                                            </Button></TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveBill}
                                disabled={!selectedCustomer || billItems.length === 0}
                            >
                                Save Bill
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => window.print()}
                                disabled={!selectedCustomer || billItems.length === 0}
                            >
                                Print Bill
                            </Button>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Total"
                                value={calculateTotal()}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>

                    {notification ? (
                        <Alert severity="error">
                            {notification}
                        </Alert>
                    ) : null}


                </div>
            </div>
        </Box>

    );
};



export default BillingPage;
