import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  full_name: { type: String, required: false },
  Email: { type: String, required: false },
  password: { type: String, required: false },
  Contact_number: { type: String, required: false },
  Address: {
    street: { type: String, required: false },
    landmark: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    pincode: { type: String, required: false },
    country: { type: String, required: false },
  },
  //   { type: String, required: false },
  Department: { type: String, required: false },
  Designation: { type: String, required: false },
  Joining_date: { type: String, required: false },
  Profile_picture: { type: String, required: false },
  //   Attendance: { type: String, required: false }, // to be discuss later
  //   Project: ,
});
export const Employee = mongoose.model("Employee", employeeSchema);
