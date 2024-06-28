const router = require("express").Router(); // this is the router of the express
const authRoute = require("./auth");    // this is the auth route where all the auth routes are defined
const userRoute = require("./user");    // this is the user route where all the user routes are defined

router.use("/auth", authRoute); // this will use the auth route and all the routes are defined in the auth route  
router.use("/user", userRoute); // this will use the user route and all the routes are defined in the user route

module.exports = router;    // this will export the router



