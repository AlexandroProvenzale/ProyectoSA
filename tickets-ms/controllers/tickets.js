const { request, response } = require('express');

const Ticket = require('../models/ticket');
const User = require('../models/user');

const ticketsGet = async(req = request, res = response) => {

    const { limit = 10, from = 0 } = req.query;
    
    const [ total, tickets ] = await Promise.all([
        Ticket.countDocuments(),
        Ticket.find()
            .skip(Number( from ))
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        tickets
    });
}

const ticketsGetByNumber = async(req = request, res = response) => {

    const { ticket_number } = req.params;

    const ticket =  await Ticket.findOne({ ticket_number });

    res.json({
        ticket
    });
}

const ticketsPost = async(req = request, res = response) => {

    const { name, lastName, email, description, problemType, problemPriority } = req.body;
    const ticket = Ticket( { name, lastName, email, description, problemType, problemPriority, assignedAgent: null } );
    
    try {
        await ticket.save()
        res.status(201).json({
            ticket
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const ticketsPostComment = async(req = request, res = response) => {
    
}

const ticketsPut = async(req = request, res = response) => {

    console.log('probando');

    const { ticket_number, agentId } = req.params;

    const { _id, ...rest } = req.body;

    try {
        if (agentId !== 'null') {
            const agent = await User.findOne({ _id: agentId, role: 'AGENT_ROLE'});
            if (!agent) {
                return res.status(400).json({
                    message: 'El usuario no es un agente válido'
                })
            }
            rest.assignedAgent = agentId
        }

        rest.updatedAt = new Date();

        const updatedTicket = await Ticket.findOneAndUpdate(
            { ticket_number },
            rest,
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }

        res.json({
            updatedTicket
        });
    } catch (error) {
        console.error('Error al asignar agente a ticket:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
    
}


module.exports = {
    ticketsGet,
    ticketsGetByNumber,
    ticketsPost,
    ticketsPut,
}