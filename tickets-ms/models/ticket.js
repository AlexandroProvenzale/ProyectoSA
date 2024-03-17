const { Schema, model } = require('mongoose');
const Counter = require('./counters');

const TicketSchema = Schema({
    // Numero de ticket
    ticket_number: {
        type: Number,
        unique: true,
        // required: [true, 'Ticket number is required']
    },
    // Estado del ticket
    status: {
        type: String,
        required: true,
        default: 'CREATED',
        enum: ['CREATED', 'ASSIGNED', 'SOLVED', 'CANCELLED', 'DELETED', 'CLOSED']
    },
    // Fecha de creacion
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Fecha de ultima actualizacion
    updatedAt: {
        type: Date,
        default: Date.now
    },
    // Agente asignado al ticket
    assignedAgent: { type: Schema.Types.ObjectId, ref: "User" },
    // Historial de comunicaciones y actualizaciones
    // communications: [{ type: Schema.Types.ObjectId, ref: "Communication" }],
    // Solucion al problema
    // solution: { type: Schema.Types.ObjectId, ref: "Solution" },
    // Nombres
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
    // Descripcion del problema
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    // Tipo de problema (tecnico, facturacion, etc)
    problemType: {
        type: String,
        required: true,
        enum: ['TECHNICAL', 'BILLING']
    },
    // prioridad del problema (baja, media, alta)
    problemPriority: {
        type: String,
        required: true,
        enum: ['LOW', 'MID', 'HIGH']
    },
    // Archivos adjuntos ( capturas de pantalla, registros de errores )
    // attachments: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
});

TicketSchema.pre('save', async function(next) {
    const doc = this;

    if (doc.isNew) {
        await Counter.findOneAndUpdate(
            { table_name: 'ticket' },
            { $inc: { counter: 1 } },
            { upsert: true, new: true }
        ).then((counter) => {
            doc.ticket_number = counter.counter;
            next();
        }).catch((err) => {
            return next(err);
        });
    } else {
        next()
    }
});

TicketSchema.methods.toJSON = function () {
    const { __v, _id,  ...ticket } = this.toObject();
    ticket.uid = _id;
    return ticket;
}

module.exports = model('Ticket', TicketSchema);