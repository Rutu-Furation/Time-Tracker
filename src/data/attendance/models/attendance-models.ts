import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId:{type:String,required:false},
    checkIn: { type: String, required: false },
    checkOut: { type: String, required: false },
    date: { type: String, required: false },
    duration: { type: String, required: false },
    status: { type: Boolean, default: false, required: false },
    remarks: { type: String, required: false },
  },
  { versionKey: false }
);
export const Attendance = mongoose.model("Attendance", attendanceSchema);
