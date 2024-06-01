const router = require("express").Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post(
  "/generate-zego-token",
  authController.protect,
  userController.generateZegoToken
);
router.get("/get-call-logs", authController.protect, userController.getCallLogs);  // this is the get-call-logs route where the user will send the request to get the call logs and the userController.getCallLogs will handle the request
router.get("/get-me", authController.protect, userController.getMe);  // this is the get-me route where the user will send the request to get the user details and the userController.getMe will handle the request
router.patch("/update-me", authController.protect, userController.updateMe);  // this is the update-me route where the user will send the request to update the user details and the userController.updateMe will handle the request
router.get("/get-all-verified-users", authController.protect, userController.getAllVerifiedUsers);  // this is the get-all-verified-users route where the user will send the request to get all the verified users and the userController.getAllVerifiedUsers will handle the request
router.get("/get-users", authController.protect, userController.getUsers);  // this is the get-users route where the user will send the request to get the users and the userController.getUsers will handle the request
router.get("/get-requests", authController.protect, userController.getRequests);  // this is the get-requests route where the user will send the request to get the requests and the userController.getRequests will handle the request
router.get("/get-friends", authController.protect, userController.getFriends);  // this is the get-friends route where the user will send the request to get the friends and the userController.getFriends will handle the request

router.post("/start-audio-call", authController.protect, userController.startAudioCall);  // this is the start-audio-call route where the user will send the request to start the audio call and the userController.startAudioCall will handle the request
router.post("/start-video-call", authController.protect, userController.startVideoCall);


module.exports = router;