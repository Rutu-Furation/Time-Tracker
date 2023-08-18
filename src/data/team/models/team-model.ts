import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  Team_name: { type: String, required: false },
  ProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: false,
  },
  Member: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: false,
    },
  ],
  Manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: false,
  },
  Team_lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: false,
  },
});
export const Employee = mongoose.model("Team", teamSchema);
