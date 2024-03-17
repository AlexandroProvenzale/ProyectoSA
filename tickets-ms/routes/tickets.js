const { Router } = require('express');
const { check } = require('express-validator');

const {
    ticketsGet, ticketsPost, ticketsGetByNumber, ticketsPut,
} = require('../controllers/tickets')

const router = new Router();

router.get('/', ticketsGet);
router.get('/:ticket_number', ticketsGetByNumber)
router.put('/:ticket_number/:agentId', ticketsPut)
router.post('/', ticketsPost);

module.exports = router;