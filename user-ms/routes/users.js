const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
    // validateJWT,
    isAdminRole,
    hasRole
} = require('../middlewares');

const { isValidRole, emailExists, userByIDExists } = require('../helpers/db-validators')

const { usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
    usersGetAgents
} = require('../controllers/users');

const router = new Router();

router.get('/', usersGet);

router.get('/agents', usersGetAgents);

router.put('/:id', [
check('id', 'Is not a valid ID').isMongoId(),
check('id').custom( userByIDExists ),
check('role').custom( isValidRole ),
validateFields
], usersPut);

router.post('/', [
check('name', 'Name is required').not().isEmpty(),
check('password', 'Password is required').not().isEmpty(),
check('password', 'Password must contain at least 6 letters').isLength({ min: 6 }),
check('email', 'Email is invalid').isEmail(),
check('email').custom( emailExists ),
// check('role', 'Role is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
check('role').custom( isValidRole ),
validateFields
], usersPost);

router.delete('/:id', [
// validateJWT,
hasRole('ADMIN_ROLE', 'VENTAS_ROLE'),
check('id', 'Is not a valid ID').isMongoId(),
check('id').custom( userByIDExists ),
validateFields
], usersDelete);

router.patch('/', usersPatch);

module.exports = router;