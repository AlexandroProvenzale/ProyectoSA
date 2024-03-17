const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {

    const { limit = 10, from = 0 } = req.query;
    const query = { state: true };


    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number( from ))
        .limit(Number( limit ))
    ]);

    res.json({
        msg: 'get API - controller',
        total,
        users
    });

}

const usersGetAgents = async (req = request, res = response) => {
    const users = await User.find( {role: 'AGENT_ROLE'} );

    res.json({
        users
    })
}

const usersPost = async (req = request, res = response) => {

    const { name, lastName, email, password, role } = req.body;
    const user = new User( { name, lastName, email, password, role } );

    // Encrypt the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Save in db
    await user.save();

    res.json({
        msg: 'post API - controller',
        user
    });

}

const usersPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        // Encrypt the password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest )

    res.json({
        msg: 'put API - controller',
        user
    });

}

const usersDelete = async(req = request, res = response) => {

    const { id } = req.params;

    // Borrado logico
    const user = await User.findByIdAndUpdate( id, { state: false } );

    res.json({
        msg: 'delete API - controller',
        user
    });

}

const usersPatch = (req = request, res = response) => {

    res.json({
        msg: 'patch API - controller'
    });

}

module.exports = {
    usersGet,
    usersGetAgents,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch,
}