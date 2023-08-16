import mongoose from "mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const validateEmail = function (email:string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}


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
      designation: {
        type: String,
        maxlength: [50, "Maximum 50 charcters are permitted"],
        minLength: [3, "designation  should have more than 3 character"],
        required: [true, "please enter designation "],
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

employeeSchema.pre("save",async function(next){
  if(this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
employeeSchema.methods.matchPassword = async function (password:string) {
  return await bcrypt.compare(password, this.password);
};

employeeSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

export const Employee = mongoose.model("Employee", employeeSchema);
