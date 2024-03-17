const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const roleExists = await Role.findOne({ role });
    if ( !roleExists ) {
        throw new Error(`The role ${role} does not exist`);
    }
}

const emailExists = async(email = '') => {
    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        throw new Error(`The email ${email} already exist`);
    }
}

const userByIDExists = async(id = '') => {
    const userExists = await User.findOne({ _id: id });
    if ( !userExists ) {
        throw new Error(`The user does not exist`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userByIDExists,
}