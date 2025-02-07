import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      lowercase: true,
      minLength: 3,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      required: [true, "Phone No is required"],
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", schema);

export default Contact;
