import mongoose from "mongoose";

const timeTrackerSchema = new mongoose.Schema({
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: false,
  },
  Date: { type: String, required: false },
  Start_time: { type: String, required: false },
  End_time: { type: String, required: false },
  Duration: { type: String, required: false },
  Project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: false,
  },
  Description: { type: String, required: false },
  Break: { type: String, required: false },
  Status: { type: Boolean, default: false, required: false },
});
export const Employee = mongoose.model("timeTracker", timeTrackerSchema);
