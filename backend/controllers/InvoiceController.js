const Customer = require("../models/customer.js");
const Invoice = require("../models/invoice.js");
const Bill = require("../models/bill.js");

const getBillSummaryByCustomer = async (req, res) => {
  const customerId = req.params.id;

  let customer = await Customer.findById(customerId);
  if (customer === null) {
    return res.status(400).json({
      message: "error",
      errors: ["Invalid Customer"],
    });
  }

  const latestBill = await Bill.findOne({
    customerId: customerId,
    status: "ON_GOING",
  });
  console.log(latestBill);

  if (latestBill === null) {
    return res.status(400).json({
      message: "error",
      errors: ["No Bills Found"],
    });
  }

  const invoice = await Invoice.findOne({
    customerId: customerId,
    billId: latestBill._id,
    status: "ON_GOING",
  });

  if (invoice === null) {
    return res.status(400).json({
      message: "error",
      errors: ["Invalid invoice"],
    });
  } else {
    return res.status(200).json({
      message: "success",
      body: invoice,
    });
  }
};

const saveInvoice = async (customerId, oldBillId, bill) => {
  if (oldBillId !== null) {
    const lastInvoice = await Invoice.findOne({
      customerId: customerId,
      billId: oldBillId,
      status: "ON_GOING",
    });

    if (invoice === null) {
      const invoice = new Invoice({
        billId: bill._id,
        customerId: customerId,
        totalBillAmount: bill.totalBillAmount,
        dueAmount: bill.totalBillAmount,
        paymentAmount: 0,
        carryForwardAmount: 0,
        status: "ON_GOING",
      });

      await invoice.save();
    } else {
      let dueAmount = lastInvoice.dueAmount;
      lastInvoice.status = "CARRY_FORWARD";
      lastInvoice.dueAmount = 0;
      lastInvoice.carryForwardAmount = dueAmount;

      await Invoice.updateOne({ _id: lastInvoice._id }, { $set: lastInvoice });
      return;
    }
  } else {
    const invoice = new Invoice({
      billId: bill._id,
      customerId: customerId,
      totalBillAmount: bill.totalBillAmount,
      dueAmount: bill.totalBillAmount,
      paymentAmount: 0,
      carryForwardAmount: 0,
      status: "ON_GOING",
    });

    await invoice.save();
  }
};

const updatePaymentInInvoice = async (customerId, billId, paymentAmount) => {
  const invoice = await Invoice.findOne({
    customerId: customerId,
    billId: billId,
    status: "ON_GOING",
  });

  if (invoice === null) {
    return;
  }

  const dueAmount = lastInvoice.dueAmount;
  const totalPaymentAmount = lastInvoice.paymentAmount;

  lastInvoice.dueAmount = dueAmount - paymentAmount;
  lastInvoice.paymentAmount = totalPaymentAmount + paymentAmount;

  await Invoice.updateOne({ _id: lastInvoice._id }, { $set: lastInvoice });
};

module.exports = {
  getBillSummaryByCustomer,
  saveInvoice,
  updatePaymentInInvoice,
};
