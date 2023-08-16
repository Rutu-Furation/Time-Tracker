import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  Client_name: { type: String, required: false },
  Project_name: { type: String, required: false },
  Email: { type: String, required: false },
  Phone: { type: Number, required: false },
  Address: {
    StreetName: { type: String, required: false },
    landmark: { type: String, required: false },
    City: { type: String, required: false },
    Pincode: { type: Number, required: false },
    State: { type: String, required: false },
    country: { type: String, required: false },
  },
  Client_type: { type: Boolean, default: false },
  Account_status: { type: Boolean, default: true, required: false },
});
export const Employee = mongoose.model("Client", clientSchema);
