const validateFields = require('../middlewares/validate-fields');
const validateRoles = require('../middlewares/validate-roles');

module.exports = {
    ...validateFields,
    ...validateRoles
}