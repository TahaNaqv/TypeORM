const { param, body } = require("express-validator");

module.exports.idParamValidator = param("id")
  .isNumeric()
  .withMessage("id should be an integer");

module.exports.loginValidator = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(
      "min length: 8, should contain lowercase, uppercase, numbers and symbols"
    ),
];

module.exports.createRequestBodyValidator = [
  body("name").isString().withMessage("Name should be a string"),
  body("age")
    .optional()
    .isInt({ min: 14, max: 50 })
    .withMessage("Age value should be between 18 and 50"),
  body("salary")
    .optional()
    .isFloat({ min: 0.0, max: 10000.0 })
    .withMessage("Salary should be between 0.0 - 10000.0"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(
      "min length: 8, should contain lowercase, uppercase, numbers and symbols"
    ),
];

module.exports.updateRequestBodyValidator = [
  body("name").optional().isString().withMessage("Name should be a string"),
  body("age")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("Age value should be between 18 and 50"),
  body("salary")
    .optional()
    .isFloat({ min: 0.0, max: 10000.0 })
    .withMessage("Salary should be between 0.0 - 10000.0"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("password")
    .optional()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(
      "min length: 8, should contain lowercase, uppercase, numbers and symbols"
    ),
];
