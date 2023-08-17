import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  Project_name: { type: String, required: false },
  Start_date: { type: String, required: false },
  Status: { type: Boolean, default: false, required: false },
  create_at: { type: Date, required: false },
  Budget: { type: Number, required: false },
  Update_at: { type: String, required: false },
  Description: { type: String, required: false },
  End_Date: { type: String, required: false },
  Project_report: { type: String, required: false }, 
});


export const Employee = mongoose.model("Project", projectSchema);
