const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "Please enter name of user"],
    },
    address: {
      street: String,
      suite: String,
      city: String,
      zipcode: String,
    },
    phone: {
      type: String,
      required: [true, "Please enter your mobile number"],
      unique: [true, "Number is already exists"],
    },
    website: String,
    company: {
      name: String,
      catchPhrase: String,
      bs: String,
    },
    email: {
      type: String,
      unique: [true, "Email id already exists"],
      required: [true, "Please enter your mail id!"],
    },
    password: {
      type: String,
      required: [true, "Enter a password!"],
      minlength: 10,
      maxlength: 25,
      select: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    isDeleated: {
      type: Boolean,
      default: false,
    },
    age: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

// const userSchema = new mongoose.Schema( {
//     firstName: String,
//     lastName: String,
//     mobile: {
//         type: String,

//         required: true
//     },
//     emailId: String,
//     password: String,
//     gender: {
//         type: String,
//         enum: ["male", "female", "other"]
//     },
//     age: Number,
//     posts: {type: [], deafult: []}
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema)
