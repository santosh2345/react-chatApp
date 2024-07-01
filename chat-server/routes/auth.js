const router = require("express").Router();

const authController = require("../controllers/authController");



router.post("/login", authController.login);    // this is the login route where the user will send the request to login and the authController.login will handle the request
router.post("/register", authController.register, authController.sendOTP);  // this is the register route where the user will send the request to register and the authController.register will handle the request
router.post("/verify", authController.verifyOTP);   // this is the verify route where the user will send the request to verify the otp and the authController.verifyOTP will handle the request
router.post("/send-otp", authController.sendOTP);   // this is the send-otp route where the user will send the request to send the otp and the authController.sendOTP will handle the request
router.post("/forgot-password", authController.forgotPassword); // this is the forgot-password route where the user will send the request to forgot the password and the authController.forgotPassword will handle the request
router.post("/reset-password", authController.resetPassword);   // this is the reset-password route where the user will send the request to reset the password and the authController.resetPassword will handle the request

// export the router module so that it can be used in the server.js file
module.exports = router;
