const Customer = require("../models/customer.js");
const Bill = require("../models/bill.js");
const Payment = require("../models/payment.js");

const getPayments = async (req, res) => {
  const customerId = req.params.id;

  if (customerId === null) {
    res.status(500).json({ error: "No customer found for this id" });
    return;
  }

  const customer = await Customer.findById(customerId);
  let recentBill = await Bill.findOne({
    customerId: customerId,
    status: "ON_GOING",
  });

  if (customer === null || recentBill === null) {
    res.status(500).json({ error: "No Payment found" });
    return;
  }

  try {
    let payments = [];
    payments = await Payment.find({
      customerId: customerId,
      billId: recentBill._id,
    }).sort({ paymentDate: -1 });

    let totalPaymentAmount = 0;

    payments.map((payment) => {
      totalPaymentAmount += payment.paymentAmount;
    });

    res.json({
      message: "success",
      data: payments,
      billNo: recentBill.billNo,
      totalBillAmount: recentBill.totalBillAmount,
      totalPaymentAmount: totalPaymentAmount,
      totalCurrentBillDueAmount: recentBill.totalBillAmount - totalPaymentAmount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const recordPayment = async (req, res) => {
  const {
    customerId,
    paymentAmount,
    paymentMethod,
    paymentDescription,
    paymentDate,
  } = req.body;

  const customer = await Customer.findById(customerId);

  if (customer === null) {
    res.status(500).json({ error: "No customer found" });
    return;
  }

  let recentBill = await Bill.findOne({
    customerId: customerId,
    status: "ON_GOING",
  });

  if (recentBill === null) {
    res.status(500).json({ error: "No Bill found ERROR" });
    return;
  }

  const payment = new Payment({
    customerId: customerId,
    paymentAmount: paymentAmount,
    paymentMethod: paymentMethod,
    paymentDescription: paymentDescription,
    paymentDate: paymentDate,
    billId: recentBill._id,
  });

  try {
    await payment.save();
    res.status(201).json({ message: "success", body: payment });
  } catch (error) {
    res.status(400).json({ message: "error", errors: [error.message] });
  }
};

module.exports = {
  getPayments,
  recordPayment,
};
