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
router.get("/get-all-verified-users", authController.protect, userController.getAllVerifiedUsers);
router.get("/get-users", authController.protect, userController.getUsers);
router.get("/get-requests", authController.protect, userController.getRequests);
router.get("/get-friends", authController.protect, userController.getFriends);

router.post("/start-audio-call", authController.protect, userController.startAudioCall);
router.post("/start-video-call", authController.protect, userController.startVideoCall);


module.exports = router;