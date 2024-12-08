const express = require("express");
const router = express.Router();

const {
  saveBill,
  getAllBillByCustomerId,
  getAllBillByBillNo,
  getAllBillsPagination
} = require("../controllers/BillController.js");

const {
  getBillSummaryByCustomer
}  = require("../controllers/InvoiceController.js");

const { getAllBills } = require("../controllers/DashboardController.js");

router.post("/bills/customer", getAllBillByCustomerId);
router.post("/bills/billNo", getAllBillByBillNo);
router.post("/bills/all", getAllBillsPagination);
router.post("/bills", saveBill);
router.get("/saveToES", getAllBills);
router.get("/bills/summary/:id", getBillSummaryByCustomer);

module.exports = router;
