import React, { useState, useEffect } from "react";
import {
  Box,
  Alert,
  Typography,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import "./Payment.css";
import PaymentTable from "../MUITable/PaymentTable";

const PaymentPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [payments, setPayments] = useState([]);

  const [billNumber, setBillNumber] = useState("");
  const [totalBillAmount, setTotalBillAmount] = useState(0);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const [totalCurrentBillDueAmount, setTotalCurrentBillDueAmount] = useState(0);

  const [notification, setNotification] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentDescription, setPaymentDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const getConsumers = async () => {
    await axios
      .get("http://localhost:8080/customers")
      .then((customersResponse) => {
        setCustomers(customersResponse.data.data);
      })
      .catch((error) => {
        setNotification("Error while fetching Customer's List");
      });
  };

  const getPayments = async (customerId) => {
    await axios
      .get(`http://localhost:8080/payments/${customerId}`)
      .then((paymentsResponse) => {
        setPayments(paymentsResponse.data.data);
        setBillNumber(paymentsResponse.data.billNo);
        setTotalPaymentAmount(paymentsResponse.data.totalPaymentAmount)
        setTotalCurrentBillDueAmount(paymentsResponse.data.totalCurrentBillDueAmount)
        setTotalBillAmount(paymentsResponse.data.totalBillAmount);
      })
      .catch((err) => {
        setPayments([]);
        setBillNumber('');
        setTotalBillAmount(0);
        setTotalPaymentAmount(0)
        setTotalCurrentBillDueAmount(0)
        setNotification("Error while fetching Customer's Payment List");
      });
  };

  useEffect(() => {
    getConsumers();
  }, []);

  const handleCustomerChange = async (newValue) => {
    setSelectedCustomer(newValue);
    await getPayments(newValue._id);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAddPayment = async () => {
    const savePaymentRequest = {
      customerId: selectedCustomer._id,
      paymentDate: paymentDate,
      paymentAmount: paymentAmount,
      paymentMethod: paymentMethod,
      paymentDescription: paymentDescription,
    };
    try {
      await axios.post("http://localhost:8080/payments/", savePaymentRequest);
      setNotification("Payment Saved");
    } catch (err) {
      setNotification("Failed to save payment data");
    } finally {
      setPaymentAmount(0);
      setPaymentDate("");
      setPaymentDescription("");
      setPaymentMethod("");
      await getPayments(selectedCustomer._id);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="page-wrapper">
        <div className="content">
          <Typography
            mb={2}
            mt={1}
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bolder" }}
          >
            Add Payment
          </Typography>

          <FormControl fullWidth margin="normal">
            <Autocomplete
              id="customer-select"
              options={customers}
              getOptionLabel={(option) => option.name + " : " + option.area}
              value={selectedCustomer}
              onChange={(event, newValue) => {
                handleCustomerChange(newValue);
              }}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box
                    key={key}
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
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
                    autoComplete: "new-password", // disable autocomplete and autofill
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
                    label="Payment Date"
                    type="date"
                    required
                    value={paymentDate}
                    onChange={(event) => setPaymentDate(event.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Payment Amount"
                    value={paymentAmount}
                    onChange={(event) => setPaymentAmount(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Payment Description"
                    type="text"
                    value={paymentDescription}
                    onChange={(event) =>
                      setPaymentDescription(event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="payment-method-label">
                      Payment Method
                    </InputLabel>
                    <Select
                      labelId="payment-method-label"
                      id="payment-method-select"
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                      label="Payment Method"
                    >
                      <MenuItem value="Cash">Cash</MenuItem>
                      <MenuItem value="Cash Credit (CC)">
                        Cash Credit (CC)
                      </MenuItem>
                      <MenuItem value="Current A/C">Current A/C</MenuItem>
                      <MenuItem value="Others A/C">Others A/C</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </>
          )}

          <Grid
            container
            justifyContent="end"
            sx={{ marginTop: 2, marginBottom: 1 }}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPayment}
                disabled={
                  !selectedCustomer ||
                  !paymentAmount ||
                  !paymentDate ||
                  !paymentMethod
                }
              >
                Verify & Add Payment
              </Button>
            </Grid>
          </Grid>
          <Divider />

          <Typography variant="h4">
            <strong>Recent Payment </strong>
          </Typography>

          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Bill No."
                value={billNumber}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Total Bill Amount"
                value={totalBillAmount}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Total Payment"
                value={totalPaymentAmount}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Current Bill Due Amount"
                value={totalCurrentBillDueAmount}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>

          <PaymentTable paymentList={payments} />

          {notification ? <Alert severity="error">{notification}</Alert> : null}
        </div>
      </div>
    </Box>
  );
};

export default PaymentPage;
