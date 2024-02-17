const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
//const { options } = require("../routes/routes");
require("dotenv").config();

exports.signup = async (userData) => {
  const { firstname, lastname, email, password, confirmPassword, accountType } =
    userData;

  // Check if all required fields are provided
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

  // Check if passwords match
  if (password !== confirmPassword) {
    throw new Error("Passwords don't match");
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if a user with the provided email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Set the 'approved' value based on the accountType
  let approved = accountType === "Manager" ? false : true;

  // Create a new user and save it to the database
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

//login
exports.login = async (loginData, context) => {
  //data fetch
  const { email, password } = loginData;
  //validation on email and password
  if (!email || !password) {
    throw new Error("Enter both fields");
  }

  //check for registered user
  let user = await User.findOne({ email });
  //if not a registered user
  if (!user) {
    throw new Error("User is not registered");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const payload = {
    email: user.email,
    id: user._id,
    role: user.accountType,
  };
  //verify password & generate a JWT token
  if (await bcrypt.compare(password, user.password)) {
    //password match
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    user = user.toObject();
    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    context.res.cookie("token", token, options);
    //console.log("token",token)
    return {
      success: true,
      token,
      loginData,
      message: "User logged in successfully",
    };
  } else {
    //passwsord do not match
    throw new Error("Login Failure");
  }
};
