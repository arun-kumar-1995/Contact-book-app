import mongoose from 'mongoose'
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      lowercase: true,
      minLength: 3,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, 'This email already exists'],
    },
    phone: {
      type: String,
      required: [true, 'Phone No is required'],
      unique: [true, 'This phone number already exists'],
    },
    gender: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Contact = mongoose.model('Contact', schema)

export default Contact
