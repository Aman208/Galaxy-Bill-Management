import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorDialogueBox from '../MUIDialogueBox/ErrorDialogueBox';
import {Box , TextField , Button , Typography} from '@mui/material';
import ProductTable from '../MUITable/ProductTable';
import AddProductDialog from './AddProduct';


function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
    const [errorList, setErrorList] = useState([]);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogueOpen = () => {
        setErrorDialogueBoxOpen(true)
    };
    const handleDialogueClose = () => {
        setErrorList([]);
        setErrorDialogueBoxOpen(false)
    };


  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };


    const getProducts = async () => {
        const response = await axios.get("http://localhost:8080/products", {
        });
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
    };

    const deleteProduct = async (id) => {

        try {
            await axios.delete(`http://localhost:8080/products/${id}`);
            getProducts();
        } catch (error) {
            setErrorList(error);
            handleDialogueOpen();
        }
    };


    const onAddProduct= async (product) => {

        let response = await axios.post(`http://localhost:8080/products` ,  {
            "name": product.productName,
            "description": product.description,
            "modelType": "static",
            "productType": product.productType,
            "defaultPrice": product.defaultPrice
        });
  
        if (response.data.message == "success") {
            let respProduct= response.data.data;
            setProducts([respProduct,  ...products]);
            setFilteredProducts([respProduct , ...products]);
        }
    };

    useEffect(() => {
        getProducts()
    }, []
    );


    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

            <div className="page-wrapper">
                <div className="content">
                <Typography mb={4} mt={3} variant="h4" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bolder' }} className="page-title">Product</Typography>
                        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                            Add Product
                        </Button>
                            <AddProductDialog
                            open={dialogOpen}
                            onClose={handleDialogClose}
                            onAddProduct={onAddProduct}
                        />
                       
                
                    <Box mb={3} mt={4}>
                        <TextField
                            label="Search by name"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Box>
                    <ProductTable productList={filteredProducts} deleteProduct={deleteProduct} />
                </div>
                <ErrorDialogueBox
                    open={errorDialogueBoxOpen}
                    handleToClose={handleDialogueClose}
                    ErrorTitle="Error: Add product"
                    ErrorList={errorList}
                />
            </div>

        </Box>
    )
}

export default ProductList;
