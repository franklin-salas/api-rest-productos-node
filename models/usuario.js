const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true,'El Correo, es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'La contraseña es obligatorio']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE'],
        default: 'USER_ROLE'
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false,
    },

});

//sobeescribe el json de usuario
usuarioSchema.methods.toJSON = function() {
    const {__v,password,_id, ...usuario} = this.toObject();
    usuario.uid =_id 
    return usuario;
}
module.exports = model('Usuario', usuarioSchema);