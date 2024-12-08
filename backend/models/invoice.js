const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var uniqueValidator = require("mongoose-unique-validator");

const InvoiceSchema = new Schema(
  {
    billId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bill",
      required: [true, "Please provide bill id"],
      unique: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Please provide customer id"],
    },
    totalBillAmount: {
      type: Number,
      required: true,
    },
    dueAmount: {
      type: Number,
      default: 0,
    },
    paymentAmount: {
      type: Number,
      default: 0,
    },
    carryForwardAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["CARRY_FORWARD", "ON_GOING", "ADVANCE_PAYMENT"],
      default: "ON_GOING",
    },
  },
  {
    timestamps: true,
  }
);

InvoiceSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;
