import mongoose from "mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    maxLength: [53, "Name should be under 53 Characters"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [5, "Password must be at least 5 characters"],
    select: false,
  },

  phoneNo: {
    type: Number,
    required: true,
    maxLength: [13, "Phone number should be under 13 Number"],
  },
  address: {
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
      type: Number,
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
  },
  role: {
    type: String,
    required: true,
    maxLength: [50, "Role should be under 50 Characters"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
});

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
adminSchema.methods.matchPassword = async function (password:string) {
  return await bcrypt.compare(password, this.password);
};
adminSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};


export const Admin = mongoose.model("Admin", adminSchema);
