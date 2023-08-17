import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    User_id:{type:String,required:false},
    Check_in: { type: String, required: false },
    Check_out: { type: String, required: false },
    Date: { type: String, required: false },
    Duration: { type: String, required: false },
    Status: { type: Boolean, default: false, required: false },
    Remarks: { type: String, required: false },
  },
  { versionKey: false }
);
export const Attendance = mongoose.model("Attendance", attendanceSchema);
