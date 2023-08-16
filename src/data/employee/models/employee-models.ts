import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
  streetName: {
    type: String,
    required: true,
  },
  landMark: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});



const employeeSchema = new mongoose.Schema({

    full_name: {
        type: String,
        maxlength: [50, "Maximum 50 characters are permitted"],
        minLength: [3, "outlet_code should have more than 3 characters"],
        required: [true, "Please enter full_name"],
        trim: true,
      },
      email: {
        type: String,
        maxlength: [50, "Maximum 50 characters are permitted"],
        minLength: [5, "email should have more than 5 characters"],
        required: [true, "Please enter email"],
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        maxlength: [50, "Maximum 50 characters are permitted"],
        minLength: [5, "password should have more than 5 characters"],
        required: [true, "Please enter password"],
        trim: true,
      },
      contact_number: {
        type: Number,
        required: true,
        maxLength: [13, "Phone number should be under 13 Number"],

      },


      address: addressSchema,
     
      department: {
        type: String,
        maxlength: [50, "Maximum 50 charcters are permitted"],
        minLength: [3, "department  should have more than 3 character"],
        required: [true, "please enter department "],
        trim: true,
      },
      joining_date: {
        type: Date, 
        required: [true, "please enter joining_date "],
       },
      profile_picture: {
        type: String,
        required: false,
      },
      attendance_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
        required: [true, "Please enter attendance"],
      },
      project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: [true, "Please enter project_id"],
      },
      del_status: {
        type: String,
        enum: {
          values: ["Live", "Deleted"],
          message: "Value is not matched",
        },
        default: "Live",
      },
      
    }
);


export const Employee = mongoose.model("Employee", employeeSchema);
