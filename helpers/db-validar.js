const {Categoria,Role,Usuario, Producto } = require("../models");


const isRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la DB`);
  }
};
const existEmail = async (correo = "") => {
  const existEmail = await Usuario.findOne({ correo });
  if (existEmail) {
    throw new Error(`El correo ${correo} esta registrado en la DB`);
  }
};
const existUsuarioID = async (id = "" ) => {
  const exist = await Usuario.findById(id)
  if (!exist) {
    throw new Error(`El id ${id} no esta registrado en la DB`);
  }
};

const existeCategoriaPorId = async(id = "") => {
  const exist = await Categoria.findById(id)
  if (!exist) {
    throw new Error(`El id ${id} no esta registrado en la DB`);
  }
}
const existeProductoPorId = async(id = "") => {
  const exist = await Producto.findById(id)
  if (!exist) {
    throw new Error(`El id ${id} no esta registrado en la DB`);
  }
}

const coleccionesPermitidas = (coleccion = '' , colecciones = []) =>{

    const incluida = colecciones.includes(coleccion);
    if(!incluida){
      throw new Error(`La coleccion ${coleccion} no esta permitida : ${colecciones}`);
    }
    return true;
}

module.exports = {
  isRoleValido,
  existEmail,
  existUsuarioID,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas
};
