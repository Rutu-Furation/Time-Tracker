import mongoose from "mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const addressSchema = new mongoose.Schema({
  streetName: {
    type: String,
    //required: false,
  },
  landMark: {
    type: String,
    //required: true,
  },
  city: {
    type: String,
    //required: true,
  },
  pinCode: {
    type: String,
    //required: true,
  },

  state: {
    type: String,
    //required: true,
  },
  country: {
    type: String,
    //required: true,
  },
});

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    maxlength: [50, "Maximum 50 characters are permitted"],
    minLength: [3, "employeeId should have more than 3 characters"],
    required: [true, "Please enter employeeId"],
    trim: true,
  },
  fullName: {
    type: String,
    maxlength: [50, "Maximum 50 characters are permitted"],
    minLength: [3, "fullName should have more than 3 characters"],
    required: [true, "Please enter fullName"],
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
  contactNumber: {
    type: Number,
    required: false,
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
  role: {
    type: String,
    maxlength: [50, "Maximum 50 charcters are permitted"],
    minLength: [3, "role  should have more than 3 character"],
    required: [true, "please enter role "],
    trim: true,
  },
  joiningDate: {
    type: Date,
    required: [true, "please enter joiningDate "],
  },
  profilePicture: {
    type: String,
    required: false,
  },
  attendanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendance",
    required: [false, "Please enter attendance"],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: [false, "Please enter projectId"],
  },
  delStatus: {
    type: String,
    enum: {
      values: ["Live", "Deleted"],
      message: "Value is not matched",
    },
    default: "Live",
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date
});

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
employeeSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

employeeSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

// generate the token for reset password
employeeSchema.methods.getResetPasswordToken = function () {
  const resetToken =  crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken
}







export const Employee = mongoose.model("Employee", employeeSchema);
