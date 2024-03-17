const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN);

        console.log('Connected to Mongo');

    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to Mongo');
    }

}

module.exports = {
    dbConnection
}