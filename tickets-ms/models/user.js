

const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    // Apellidos
    lastName: {
        type: String,
        required: [true, 'Lastname is required']
    },
    // Email
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    // img: {
    //     type: String,
    // },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['ADMIN_ROLE', 'AGENT_ROLE', 'CLIENT_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);