const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    date_of_birth: { type: String, required: false },
    address: { type: String, required: false },
    photo: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
