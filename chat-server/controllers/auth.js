// const jwt = require("jsonwebtoken");

// //
// const User = require("../models/User");

// const otpGenerator = require("otp-generator");
// const crypto = require("crypto");
// const { promisify } = require("util");
// const mailService = require("../services/mailer");

// const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

// // Sign up => register - senOTP - verifyOTP

// // Register New user

// exports.register = async (req, res, next) => {
//   const { firstName, lastName, email, password } = req.body;

//   const filteredBody = filterObj(
//     req.body,
//     "firstName",
//     "lastName",
//     "password",
//     "email"
//   );

//   //! check if varified user with the same email exist or not

//   const existing_user = await User.findOne({ email: email });

//   if (!existing_user && existing_user.verified) {
//     res.status(400).json({
//       status: "Error",
//       message: "Email is already in use, Please login.",
//     });
//   } else if (existing_user) {
//     await User.findOneAndUpdate({ email: email }, filteredBody, {
//       new: true,
//       validateModifiedOnly: true,
//     });

//     // generate OTP and send email to the user

//     req.userId = existing_user._id;
//     next(); // control goes to the next part after this middleware
//   } else {
//     // if user record is not available in our database;

//     const new_user = await User.create(filteredBody);

//     // Highlights generate OTP and send email to the user

//     req.userId = new_user._id;

//     next();
//   }
// };

// exports.sendOTP = async (req, res, next) => {
//   const { userId } = req;
//   const new_otp = otpGenerator.generate(6, {
//     upperCaseAlphabets: false,
//     specialChars: false,
//     lowerCaseAlphabets: false,
//   });

//   const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 mins after OTP is sent

//   await User.findByIdOneAndUpdate(userId, {
//     otp: new_otp,
//     otp_expiry_time,
//   });

//   console.log(new_otp)

//   // TODO =>  send OTP to the user through email

//   mailService.sendEmail({
//     from: "santoshgiri2345@gmail.com",
//     to: user.email,
//     subject: "OTP for KuraKani",
//     text: `Your OTP is ${new_otp}. This is valid for 10 minutes.`,
//   });
//   // .then((er ror)=>{
//   //   console.log(first)
//   // }).catch((error)=>{

//   // })

//   res.status(200).json({
//     status: "success",
//     message: "OTP sent Successfully",
//   });
// };

// exports.verifyOTP = async (req, res, next) => {
//   // verify OTP and update user record accordingly

//   const { email, otp } = req.body;
//   const user = User.findOne({ email, otp_expiry_time: { $gt: Date.now() } });

//   if (!user) {
//     res.status(400).json({
//       status: "Error",
//       message: "Email is Invalid or OTP expired",
//     });
//   }
//   if (!(await user.correctOTP(otp, user.otp))) {
//     res.status(400).json({
//       status: "Error",
//       message: "OTP is incorrect",
//     });
//   }

//   // OTP is correct
//   user.verified = true;
//   user.otp = undefined;
//   await user.save({ new: true, validateModifiedOnly: true });

//   const token = signToken(user._id);
//   res.status(200).json({
//     status: "success",
//     message: "OTP verified  successfully",
//     token,
//   });
// };

// exports.login = async (req, res, next) => {
//   //
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400).json({
//       status: "error",
//       message: "Both email and password are required",
//     });
//     return;
//   }

//   const userDoc = await User.find({ email: email }).select("+ password");

//   if (!userDoc || (await userDoc.correctPassword(password, userDoc.password))) {
//     res.status(400).json({
//       status: "Error",
//       message: "Email or Password is incorrect",
//     });
//   }

//   const token = signToken(userDoc._id);
//   res.status(200).json({
//     status: "success",
//     message: "Logged in successfully",
//     token,
//   });
// };

// exports.protect = async (req, res, next) => {
//   // 1) Getting Token (JWT) and check if it's there

//   let token;

//   // 'Bearer kasjjdsfkjsdfi987897'

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   } else {
//     req.status(400).json({
//       status: "Error",
//       message: "You are not logged in! Please log in to get access",
//     });
//     return;
//   }

//   // 2) verification of token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   // 3) Check if user still exist

//   const this_user = await User.findById(decoded.userId);

//   if (!this_user) {
//     res.status(400).json({
//       status: "Error",
//       message: "The user doesn't exist",
//     });
//   }

//   // 4) check if user changed their password after token was issued

//   if (this_user.changedPasswordAfter(decoded.iat)) {
//     res.status(400).json({
//       status: "Error",
//       message: "User recently updated password! Please log in again",
//     });
//   }

//   //
//   req.user = this.user;
//   next();
// };

// // Types of routes  -> Protected (Only logged in  users can access these) & Unprotected

// exports.forgetPassword = async (req, res, next) => {
//   // get the user's email
//   const user = await User.findOne({ email: req.email });
//   if (!user) {
//     res.status(400).json({
//       status: "Error",
//       message: "There's no user with given email address",
//     });
//     return;
//   }

//   // 2) Generate the random reset token
//   const resetToken = user.createPasswordResetToken();
//   const resetURL = `https://kurakani.com/auth/reset-password/?code=${resetToken}`;

//   try {
//     // TODO => send email with the reset URL

//     res.status(200).json({
//       status: "success",
//       message: "Reset password link sent to the Email",
//     });
//   } catch (error) {
//     user.PasswordResetToken = undefined;
//     user.passwordResetExpires = undefined;

//     await user.save({ validateBeforeSave: false });

//     res.status(500).json({
//       status: "Error",
//       message: "There was an error sending an email, please try again later.",
//     });
//   }
// };

// exports.resetPassword = async (req, res, next) => {
//   // get user based on token

//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   // 2) If token has expired or submission  is out of time window

//   if (!user) {
//     res.status(400).json({
//       status: "Error",
//       message: "Token is invalid or Expired",
//     });
//     return;
//   }

//   // 3) Update users Password  and set reset token and expiry to undefined

//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.PasswordResetToken = undefined;
//   user.passwordResetExpires = undefined;

//   await user.save();

//   // 4) Log in the user and send new JWT token

//   // TODO => send an email to users informing about password reseted

//   const token = signToken(user._id);

//   res.status(200).json({
//     status: "success",
//     message: "Password Reseted successfully",
//     token,
//   });
// };
