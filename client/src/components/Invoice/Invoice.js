import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import InvoiceDetails from './InvoiceDetails';
import BillTable from './BillTable';
import PaymentHistory from './PaymentHistory';
import BalanceSummary from './BalanceSummary';
import Buttons from './Buttons';
import { Box } from '@mui/material';
import CompanyDetails from './CompanyDetails';
import './Invoice.css';


const Invoice = () => {
    const [items, setItems] = useState([
        { description: 'Item 1', quantity: 2, rate: 8100, amount: 200 },
        { description: 'Item 2', quantity: 3, rate: 2100, amount: 300 },
        { description: 'Item 3', quantity: 5, rate: 1100, amount: 200 },
        { description: 'Item 4', quantity: 8, rate: 9100, amount: 300 },
        { description: 'Item 6', quantity: 5, rate: 1100, amount: 200 },
        { description: 'Item 5', quantity: 8, rate: 9100, amount: 300 },
    ]);

    const [initialPayments] = useState([
        { date: '2024-10-01', amountPaid: 200, method: 'Bank Transfer' , person: "Aman Keshri"},
        { date: '2024-10-15', amountPaid: 300, method: 'Credit Card'  , person: "Gopal Keshri"},
        { date: '2024-11-01', amountPaid: 500, method: 'Bank Transfer' , person: "Aman Keshri"},
        { date: '2024-10-15', amountPaid: 300, method: 'Credit Card'  , person: "Gopal Keshri"},
        { date: '2024-11-01', amountPaid: 500, method: 'Bank Transfer' , person: "Aman Keshri"},
        { date: '2024-10-15', amountPaid: 300, method: 'Credit Card'  , person: "Gopal Keshri"},
    ]);

    const addItem = () => {
        setItems([...items, { description: '', quantity: 0, rate: 0, amount: 0 }]);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
        setItems(updatedItems);
    };

    const totalAmount = items.reduce((total, item) => total + item.amount, 0);
    const totalPaid = initialPayments.reduce((total, payment) => total + payment.amountPaid, 0);
    const balanceDue = totalAmount - totalPaid;

    const downloadPDF = () => {
        const element = document.getElementById('invoice');
        html2pdf(element, {
            filename: 'invoice-receipt.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2},
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            margin : 0.1
        });
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <div className="page-wrapper">
                <div className="content">
                    <div id="invoice">
                        <CompanyDetails />
                        <InvoiceDetails invoiceNumber="12345" date="2024-10-26" amountPaid="500.00" method="Credit Card" />
                        <BillTable items={items} addItem={addItem} />
                        <PaymentHistory initialPayments={initialPayments} />
                        <BalanceSummary totalAmount={totalAmount} balanceDue={balanceDue} />
                        <Buttons onDownload={downloadPDF} onPrint={() => window.print()} />
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default Invoice;
