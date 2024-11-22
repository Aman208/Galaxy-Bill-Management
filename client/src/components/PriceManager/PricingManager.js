import React, { useState, useEffect } from 'react';
import { Box, Typography, Autocomplete, FormControl, Alert, TextField, Grid, Button } from '@mui/material';
import axios from 'axios';

const PricingManager = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [pricing, setPricing] = useState([]);
    const [productPricingMap, setProductPricingMap] = useState(new Map())
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
        console.log(customerPricingList)
        const productPriceMap = new Map();
        customerPricingList.forEach(item => {
            productPriceMap.set(item.productId, item.price);
        });
        await setProductPricingMap(productPriceMap)
        console.log(productPricingMap)
    }

    const handleCustomerChange = async (newValue) => {
        setSelectedCustomer(newValue);
        try {
            await axios.get(`http://localhost:8080/customers/${newValue._id}`)
            .then(response => {
                setPricing(response.data.pricing)
                createProductPricingMap(response.data.pricing)
            }
            );

            setNotification(`Successfully fetch ${newValue.name}'s pricing information`)
        } catch (err) {
            setNotification(`Error loading pricing information`)
        }
        
    };

    const handlePriceChange = (productId, event) => {
        const newMap = new Map(productPricingMap);
        newMap.set(productId, event.target.value); 
        setProductPricingMap(newMap)
    };

    const handleSave = async () => {
        const customerPricingList = Array.from(productPricingMap, ([productId, price]) => ({
            "customerId": selectedCustomer,
            "productId": productId,
            "price": price,
        }));

        try {
            await axios.post(`http://localhost:8080/pricing/`, customerPricingList)
            setNotification(`Pricing saved successfully ${selectedCustomer.name}'s`)
        }
        catch {
            setNotification(`Error saving pricing information`)
        }
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <div className="page-wrapper">
                <div className="content">
                    <Typography mb={2} mt={2} variant="h5" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bolder' }} className="page-title">Price Manager</Typography>
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

                    {selectedCustomer ? <div>
                        <Typography mb={2} mt={2} variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bolder' }} className="page-title">Dressing</Typography>
                        <Grid container spacing={2} marginTop={2}>
                            {products.map(product => product.productType === "Dressing" ? (
                                <Grid item xs={12} md={6} key={product._id}>
                                    <TextField
                                        fullWidth
                                        label={product.name}
                                        type="number"
                                        value={productPricingMap.get(product._id) || product.defaultPrice || ''}
                                        onChange={(event) => handlePriceChange(product._id, event)}
                                    />
                                </Grid>
                            ) : null)}
                        </Grid>

                        <Typography mb={2} mt={2} variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bolder' }} className="page-title">Almirah</Typography>
                        <Grid container spacing={2} marginTop={2}>

                            {products.map(product => product.productType === "Almirah" ? (
                                <Grid item xs={12} md={6} key={product._id}>
                                    <TextField
                                        fullWidth
                                        label={product.name}
                                        type="number"
                                        value={productPricingMap.get(product._id) || product.defaultPrice || ''}
                                        onChange={(event) => handlePriceChange(product._id, event)}
                                    />
                                </Grid>
                            ) : null)}
                        </Grid>

                        <Typography mb={2} mt={2} variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bolder' }} className="page-title">Computer Table</Typography>
                        <Grid container spacing={2} marginTop={2}>

                            {products.map(product => product.productType === "Table" ? (
                                <Grid item xs={12} md={6} key={product._id}>
                                    <TextField
                                        fullWidth
                                        label={product.name}
                                        type="number"
                                        value={productPricingMap.get(product._id) || product.defaultPrice || ''}
                                        onChange={(event) => handlePriceChange(product._id, event)}
                                    />
                                </Grid>
                            ) : null)}
                        </Grid>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            disabled={!selectedCustomer}
                            sx={{ marginTop: 3 }}
                        >
                            Save Pricing
                        </Button>
                        {notification ? (
                        <Alert severity="info">
                            {notification}
                        </Alert>
                    ) : null}
                    </div> : null}
                </div>
            </div>
        </Box>
    );
};

export default PricingManager;
