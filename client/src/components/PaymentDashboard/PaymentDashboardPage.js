import React from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

// Sample static data
const customers = [
  {
    id: 1,
    name: "John Doe",
    totalDue: 15000,
    latestBill: {
      billDate: "2024-11-15",
      payments: [
        { amount: 5000, date: "2024-11-01" },
        { amount: 10000, date: "2024-11-10" },
      ],
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    totalDue: 30000,
    latestBill: {
      billDate: "2024-11-05",
      payments: [
        { amount: 10000, date: "2024-10-25" },
        { amount: 20000, date: "2024-11-01" },
      ],
    },
  },
  {
    id: 3,
    name: "Mark Taylor",
    totalDue: 60000,
    latestBill: {
      billDate: "2024-10-15",
      payments: [
        { amount: 15000, date: "2024-10-01" },
        { amount: 45000, date: "2024-10-05" },
      ],
    },
  },
  {
    id: 1,
    name: "John Doe",
    totalDue: 15000,
    latestBill: {
      billDate: "2024-11-15",
      payments: [
        { amount: 5000, date: "2024-11-01" },
        { amount: 10000, date: "2024-11-10" },
      ],
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    totalDue: 30000,
    latestBill: {
      billDate: "2024-11-05",
      payments: [
        { amount: 10000, date: "2024-10-25" },
        { amount: 20000, date: "2024-11-01" },
      ],
    },
  },
  {
    id: 3,
    name: "Mark Taylor",
    totalDue: 60000,
    latestBill: {
      billDate: "2024-10-15",
      payments: [
        { amount: 15000, date: "2024-10-01" },
        { amount: 45000, date: "2024-10-05" },
      ],
    },
  },
  {
    id: 1,
    name: "John Doe",
    totalDue: 15000,
    latestBill: {
      billDate: "2024-11-15",
      payments: [
        { amount: 5000, date: "2024-11-01" },
        { amount: 10000, date: "2024-11-10" },
      ],
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    totalDue: 30000,
    latestBill: {
      billDate: "2024-11-05",
      payments: [
        { amount: 10000, date: "2024-10-25" },
        { amount: 20000, date: "2024-11-01" },
      ],
    },
  },
  {
    id: 3,
    name: "Mark Taylor",
    totalDue: 60000,
    latestBill: {
      billDate: "2024-10-15",
      payments: [
        { amount: 15000, date: "2024-10-01" },
        { amount: 45000, date: "2024-10-05" },
      ],
    },
  },
  {
    id: 1,
    name: "John Doe",
    totalDue: 15000,
    latestBill: {
      billDate: "2024-11-15",
      payments: [
        { amount: 5000, date: "2024-11-01" },
        { amount: 10000, date: "2024-11-10" },
      ],
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    totalDue: 30000,
    latestBill: {
      billDate: "2024-11-05",
      payments: [
        { amount: 10000, date: "2024-10-25" },
        { amount: 20000, date: "2024-11-01" },
      ],
    },
  },
  {
    id: 3,
    name: "Mark Taylor",
    totalDue: 60000,
    latestBill: {
      billDate: "2024-10-15",
      payments: [
        { amount: 15000, date: "2024-10-01" },
        { amount: 45000, date: "2024-10-05" },
      ],
    },
  },
];

// Utility function to calculate color coding
const getColor = (totalDue, billDate) => {
  const today = new Date();
  const billDateParsed = new Date(billDate);
  const daysDifference = Math.floor(
    (today - billDateParsed) / (1000 * 60 * 60 * 24)
  );

  if (totalDue < 20000) return "#9fd89f";
  if (
    (totalDue >= 20000 && totalDue < 50000 && daysDifference > 10) ||
    totalDue < 50000
  )
    return "#f0e827ad";
  if (totalDue >= 50000 || daysDifference > 30) return "#e59393";

  return "default";
};

const PaymentDashboard = () => {
  const [selectedCustomer, setSelectedCustomer] = React.useState(customers[0]);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3 }}
    >
      <div className="page-wrapper">
        <div className="content">
          <Grid container spacing={2}>
            {/* First Column: Customer List */}
            <Grid item xs={2.5} sx={{ height: "100vh", overflowY: "auto" }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Customer List</Typography>
                  <List>
                    {customers.map((customer) => (
                      <ListItem
                        key={customer.id}
                        button
                        onClick={() => setSelectedCustomer(customer)}
                        sx={{
                          backgroundColor: getColor(
                            customer.totalDue,
                            customer.latestBill.billDate
                          ),
                          marginY: 1,
                          borderRadius: "8px",
                        }}
                      >
                        <ListItemText
                          primary={customer.name}
                          secondary={`Total Due: ₹${customer.totalDue}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Second Column: Customer Details */}
            <Grid
              item
              xs={9.5}
              sx={{
                position: "sticky",
                top: 0,
                height: "100vh",
              }}
            >
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">
                    {selectedCustomer.name}'s Latest Bill
                  </Typography>
                  <Typography>
                    <strong>Bill Date:</strong>{" "}
                    {selectedCustomer.latestBill.billDate}
                  </Typography>
                  <Typography>
                    <strong>Total Due:</strong> ₹{selectedCustomer.totalDue}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                    Payments:
                  </Typography>
                  <List>
                    {selectedCustomer.latestBill.payments.map(
                      (payment, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={`Amount: ₹${payment.amount}`}
                            secondary={`Date: ${payment.date}`}
                          />
                        </ListItem>
                      )
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  );
};

export default PaymentDashboard;
