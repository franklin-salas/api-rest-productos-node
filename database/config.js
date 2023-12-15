const mongoose = require('mongoose');
// mongoose.set('returnOriginal', false);
// para retornar el dato actualizado

const dbconnect = async() =>{

    try{
        await mongoose.connect(process.env.DB);
        console.log('Base de datos conectada');
    } catch (error) {
        console.log('Error');
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};

module.exports = dbconnect;