const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
//const { options } = require("../routes/routes");
require("dotenv").config();

exports.signup = async (userData) => {
  const { firstname, lastname, email, password, confirmPassword, accountType } =
    userData;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !confirmPassword ||
    !accountType
  ) {
    throw new Error("All fields are required for signup");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords don't match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  let approved = accountType === "Manager" ? false : true;

  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    accountType,
    approved,
  });
  await newUser.save();

  return newUser;
};

exports.login = async (loginData, context) => {
  try {
    const { email, password } = loginData;
    if (!email || !password ) {
      throw new Error("Enter both fields");
    }

    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User is not registered");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // if (user.accountType !== accountType) {
    //   throw new Error("Incorrect account type");
    // }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.accountType,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;
      user.id = user._id

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      context.res.cookie("token", token, options);
   
      return user
    } else {
      throw new Error("Login Failure");
    }
  } catch (error) {
    console.error("Login Error:", error);
    throw error; 
  }
};

