import mongoose from "mongoose";

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
  profile_picture: {
    type: String,
    required: false,
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
