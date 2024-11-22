import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import CustomerTable from '../MUITable/CustomerTable';

import {
    Box,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Select, MenuItem, FormControl, InputLabel, Typography
} from "@mui/material";
import InvoiceForm from '../Invoice/CompanyDetails';
import Invoice from '../Invoice/Invoice';

const districts = {
    "Giridih": ['Isri', 'Giridih Town', 'Bagodar', 'Berni',"Ramba","chaidawapar", "Saria", "Raj Dhanbad", "Jamua", "Peitadh", "Madhuban", "Badakar", "Ahilyapur" , "Tundi"],
    "Hazaribagh": ['Chouparan','Banaso' ,'Bishnugarh', 'Bishnugarh Nawada', "Barhi", "Hazaribagh Town", "Daru", "Meru", "Jumra", "Charhi", "Karyatpur Barhi", "Karyatpur Hzb"],
    "Chatra": ['Itkhori', 'Chatra Town', 'Kanhachatti', "Pitij" , "Karma"],
    "Devghar": ['Devghar', "Devipur"],
    "Dhanbad": ['Katras' , 'Topchachi'],
    "Bokaro": ['Telo', "Gomaoh" , "Pordagh", "Navadih"],
    "Koderma": ["Koderma", "Tilaiya"],
    "Bihar": ['Rajgir', "Amarpur"],
    "Daltengunj" : ["Chandwa"]
};


const AddCustomerDialog = ({ open, onClose, onAddCustomer }) => {
    const [customerName, setCustomerName] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [areas, setAreas] = useState([]);
    const [customerType, setCustomerType] = useState('');


    const handleDistrictChange = (event) => {
        const district = event.target.value;
        setSelectedDistrict(district);
        setAreas(districts[district] || []);
        setSelectedArea(''); // Reset the selected area when district changes
    };

    const handleAdd = () => {
        onAddCustomer({ customerName, selectedArea, selectedDistrict, customerType });
        setCustomerName('');
        setSelectedDistrict('');
        setSelectedArea('');
        setCustomerType('');
        onClose();
    };



    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To add a new customer, please enter their name, email address, district, area, and customer type.
                </DialogContentText>
                <Box mb={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </Box>

                <Box mb={2}>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>District</InputLabel>
                        <Select
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                        >
                            {Object.keys(districts).map((district) => (
                                <MenuItem key={district} value={district}>
                                    {district}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <FormControl fullWidth margin="dense" disabled={!selectedDistrict}>
                        <InputLabel>Area</InputLabel>
                        <Select
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                        >
                            {areas.map((area) => (
                                <MenuItem key={area} value={area}>
                                    {area}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Customer Type</InputLabel>
                        <Select
                            value={customerType}
                            onChange={(e) => setCustomerType(e.target.value)}
                        >
                            <MenuItem value="Dealer">Dealer</MenuItem>
                            <MenuItem value="Premium Retailer">Premium Retailer</MenuItem>
                            <MenuItem value="Normal Retailer">Normal Retailer</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAdd} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

function CustomerList() {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };



    const onAddCustomer = async (customer) => {

        let response = await axios.post(`http://localhost:8080/customers`, {
            "name": customer.customerName,
            "area": customer.selectedArea,
            "district": customer.selectedDistrict,
            "customerType": customer.customerType
        });

        if (response.data.message == "success") {
            let respCustomer = response.data.data;
            setCustomers([respCustomer, ...customers]);
            setFilteredCustomers([respCustomer, ...customers]);

        }
    };


    const getCustomer = async () => {

        let response = await axios.get(`http://localhost:8080/customers`);

        if (response.data.message == "success") {
            let respCustomer = response.data.data;
            setCustomers(respCustomer);
            setFilteredCustomers(respCustomer);

        }
    };

    useEffect(() => {
        getCustomer()
    }, []
    );

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = customers.filter(customer =>
            customer.name.toLowerCase().includes(query)
        );
        setFilteredCustomers(filtered);
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

            <div className="page-wrapper">
                <div className="content">
                    <Typography mb={4} mt={3} variant="h4" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bolder' }} className="page-title">Customer</Typography>
                    <div>
                        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                            Add Customer
                        </Button>
                        <AddCustomerDialog
                            open={dialogOpen}
                            onClose={handleDialogClose}
                            onAddCustomer={onAddCustomer}
                        />
                    </div>
                    <Box mb={3} mt={4}>
                        <TextField
                            label="Search by name"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Box>

                    <CustomerTable customerList={filteredCustomers} />
                </div>
            </div>
        </Box>
    )
}

export default CustomerList;
