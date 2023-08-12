import mongoose from "mongoose";
 
const employeeSchema = new mongoose.Schema({

    
       del_status: {
        type: String,
        enum: {
          values: ["Live", "Deleted"],
          message: "Value is not matched",
        },
        default: "Live",
      },
});
export const Employee = mongoose.model("Employee", employeeSchema);