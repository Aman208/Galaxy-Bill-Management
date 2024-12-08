const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var uniqueValidator = require("mongoose-unique-validator");

const BillSchema = new Schema(
  {
    billNo: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Please provide customer id"],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: [true, "Please provide quantity"],
    },
    totalBillAmount: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: [true, "Please provide purchase date"],
    },
    transportAmount: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    returnAmount: {
      type: Number,
      default: 0,
    },
    lastBillDueAmount: {
      type: Number,
      default: 0,
      required: true,
    },
    status: {
      type: String,
      enum: ["CARRY_FORWARD", "ON_GOING" , "ADVANCE_PAYMENT"],
      default: "ON_GOING",
    },
  },
  {
    timestamps: true,
  }
);

BillSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

const Bill = mongoose.model("Bill", BillSchema);

module.exports = Bill;
