const { Schema, model } = require('mongoose');

const CounterSchema = Schema({
    table_name: {
        type: String
    },
    counter: {
        type: Number,
    }
});

module.exports = model('Counter', CounterSchema);