import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: false,
  },
  Check_in: { type: String, required: false },
  Check_out: { type: String, required: false },
  Date: { type: Date, required: false },
  Duration: { type: String, required: false },
  Status: { type: Boolean, required: false },
  Remarks: { type: String, required: false },
});
export const Attendance = mongoose.model("Attendance", attendanceSchema)
