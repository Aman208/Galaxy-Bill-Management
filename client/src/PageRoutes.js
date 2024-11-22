import {Routes, Route} from 'react-router-dom';
import React, { useContext } from 'react';

import LoginPage from './components/Login/Login'

//import SignupPage from './pages/SignupPage';
import SignupPage from './components/SignUp/SignupPage';


import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';



import AddProduct from './components/Product/AddProduct';
import ProductList from "./components/Product/ProductList";
import EditProduct from "./components/Product/EditProduct";
import Product from './components/Product/Product';
import CustomerList from "./components/Customer/CustomerList";
import Customer from './components/Customer/Customer';


import {UserContext} from './Context/UserContext'
import PatientDashboard from './components/dashboard/PatientDashboard';
import DoctorDashboard from './components/dashboard/DoctorDashboard';

import DoctorProfile from './components/Profile/DoctorProfile';
import PricingManager from './components/PriceManager/PricingManager'
import PriceManager from './components/PriceManager/PriceManager';
import Billing from './components/BillPage/Billing';
import BillingPage from './components/BillPage/BillingPage';
import ViewBill from './components/ViewBill/ViewBill';
import ViewBillPage from './components/ViewBill/ViewBillPage';
import AdminBill from './components/AdminBillView/AdminBill';
import AdminBillView from './components/AdminBillView/AdminBillView';
import Invoice from './components/Invoice/Invoice';

const NotFound = () => <h2 style={{margin:'70px'}}>This Path is not available</h2>


export default function PageRoutes(){
    const {currentUser} = useContext(UserContext);
    return (
        <Routes>
            <Route path='/' element= {<Dashboard />} >
                <Route index element= {
                    currentUser.userType == "Admin"?
                        <AdminDashboard />:
                    currentUser.userType == "Doctor"?
                        <DoctorDashboard />:
                    currentUser.userType == "Patient"? 
                        <PatientDashboard />:
                    <div />} 
                />
               


                <Route path='products' element= {   <Product /> } >
                    <Route index element= { <ProductList /> } />
                </Route>



                <Route path='customers' element= { <Customer />} >
                    <Route index element= {<CustomerList />} />
                </Route>


                <Route path='price-manager' element= { <PriceManager />} >
                    <Route index element= {<PricingManager />} />
                </Route>

                <Route path='bill' element= { <Billing />} >
                    <Route index element= {<BillingPage />} />
                </Route>

                <Route path='view-bill' element= { <ViewBill />} >
                    <Route index element= {<ViewBillPage />} />
                </Route>

                <Route path='view-bill-admin' element= { <AdminBill />} >
                    <Route index element= {<AdminBillView />} />
                </Route>

                <Route path='generate-invoice' element= { <Invoice />} >
                    <Route index element= {<Invoice />} />
                </Route>
                

              
             

            </Route>
            <Route path='/login' element= {<LoginPage />} />
            <Route path='/signup' element= {<SignupPage />} />


    
            <Route path='/*' element={<NotFound/>} />

        </Routes>
    )
}