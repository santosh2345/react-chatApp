

// Filter object by allowed fields and return a new object
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Export the filterObj function to be used in other files
module.exports = filterObj;
