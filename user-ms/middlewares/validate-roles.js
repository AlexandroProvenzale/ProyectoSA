const { request, response } = require("express");


const isAdminRole = async( req = request, res = response, next ) => {

    if ( !req.user ) {
        return response.status(500).json({
            msg: 'Trying to verify admin role withoun validating token first'
        });
    }
    
    const { role, name } = req.user;

    if ( role != 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${name} is not administrator - Cannot do this action`
        });
    }

    next();
}

const hasRole = ( ...roles ) => {

    return ( req = request, res = response, next ) => {

        if ( !req.user ) {
            return response.status(500).json({
                msg: 'Trying to verify admin role withoun validating token first'
            });
        }

        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `Service requires one of these roles: ${ roles }`
            });
        }
        console.log( roles );

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
};