// import mongoose from "mongoose";

// const attendanceSchema = new mongoose.Schema({
//     User_id:{type:String,required:false},
//     Check-in:{type:String,required:false},
//     Check-out:{type:String,required:false},
//     Date:{type:String,required:false},
//     Status:{type:String,required:false},
//     Remarks:{type:String,required:false},

// });
// export const Employee = mongoose.model("Attendance", attendanceSchema);

import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: false,
  },
  Check_in: { type: String, required: false },
  Check_out: { type: String, required: false },
  Date: { type: String, required: false },
  Status: { type: String, required: false },
  Remarks: { type: String, required: false },
});
export const Employee = mongoose.model("Attendance", attendanceSchema);
