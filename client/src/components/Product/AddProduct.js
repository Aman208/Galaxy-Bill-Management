
import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";

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

const AddProductDialog = ({ open, onClose, onAddProduct }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [productType, setProductType] = useState('');
    const [defaultPrice, setDefaultPrice] = useState('');

    const handleAdd = () => {
        onAddProduct({productName , description , productType ,defaultPrice  });
        setProductName('')
        setDescription('');
        setProductType('');
        setDefaultPrice('')
        onClose();
    };

    

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To add a new Product, please enter their name, description,  Product type.
                </DialogContentText>
                <Box mb={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>
                
                <Box mb={2}>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Product Type</InputLabel>
                        <Select
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                        >
                            <MenuItem value="Almirah">Almirah</MenuItem>
                            <MenuItem value="Dressing">Dressing</MenuItem>
                            <MenuItem value="Table">Table</MenuItem>
                            <MenuItem value="Shoe Rack">Shoe Rack</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="DefaultPrice"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={defaultPrice}
                        onChange={(e) => setDefaultPrice(e.target.value)}
                    />
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

export default AddProductDialog;