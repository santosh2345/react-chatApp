// const User = require("../models/User");
// const { filterObj } = require("../utils/filterObj");

// exports.updateMe = async (req, res, next) => {
//   const { user } = req;
//   filteredBody = filterObj(
//     req.body,
//     "firstName",
//     "lastName",
//     "about",
//     "avatar"
//   );
//   const updated_user = await User.findByIdAndUpdate(user._id, filteredBody, {
//     new: true,
//     validateModifiedOnly: true,
//   });

//   res.status(200).json({
//     status: "Success",
//     data : updated_user,
//     message: "Profile updated successfully",
//   });
// };
