const {param, body} = require('express-validator');

module.exports.id_param_validator = param('id').isNumeric();

module.exports.create_request_body_validator = [
    body('name').isString(),
    body('age').isInt({min:0, max:100}),
    body('salary').isFloat({min:0.00, max:10000.00}),
    body('email').isEmail(),
    body('password').isStrongPassword({minLength:8, minLowercase:1, minUppercase:1, minNumbers:1, minSymbols:1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10})
]


module.exports.update_request_body_validator = [
    body('name').optional().isString(),
    body('age').optional().isInt({min:0, max:100}),
    body('salary').optional().isFloat({min:0.00, max:10000.00}),
    body('email').optional().isEmail(),
    body('password').optional().isStrongPassword({minLength:8, minLowercase:1, minUppercase:1, minNumbers:1, minSymbols:1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10})
]
