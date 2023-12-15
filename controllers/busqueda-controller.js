const { response, request } = require("express");
const {Categoria,Producto, Usuario} = require("../models");
const {ObjectId} = require("mongoose").Types;

const coleccionesPermitidas = ["categoria","usuario","producto","rol"];


const busquedaUsuario = async(argumento = '', resp = response) =>{

    if(ObjectId.isValid(argumento)){
        const usuario = await Usuario.findById(argumento);
         return resp.json(
            {
                results: (usuario)? [usuario]: []
            }
         );
        }
    const regex = new RegExp(argumento, 'i')
    
    const usuarios = await Usuario.find(
         {$or: [{nombre: regex} , {correo: regex}],
        $and: [{estado:true}] });
        return resp.json(
            {
                results: usuarios
            }
         );
        

}
const busquedaProducto = async(argumento = '', resp = response) =>{

    if(ObjectId.isValid(argumento)){
        const producto = await Producto.findById(argumento).populate('categoria','nombre');
         return resp.json(
            {
                results: (producto)? [producto]: []
            }
         );
        }
    const regex = new RegExp(argumento, 'i')
    
    const productos = await Producto.find({nombre: regex, estado:true}).populate('categoria','nombre'); 
        return resp.json(
            {
                results: productos
            }
         );
        

}
const busquedaCategoria = async(argumento = '', resp = response) =>{

    if(ObjectId.isValid(argumento)){
        const categoria = await Categoria.findById(argumento);
         return resp.json(
            {
                results: (categoria)? [categoria]: []
            }
         );
        }
    const regex = new RegExp(argumento, 'i')
    
    const categorias = await Categoria.find({nombre: regex, estado:true});
        return resp.json(
            {
                results: categorias
            }
         );
        

}

const busquedaProductosPorCategoria = async(argumento = '', resp = response) =>{

    if(!ObjectId.isValid(argumento)){
         return resp.status(400).json(
            {
                msg:'No es un id valido'
            }
         );
        }
    const regex = new RegExp(argumento, 'i')
    
    const productos = await Producto.find({categoria: ObjectId(argumento)});
        return resp.json(
            {
                results: productos
            }
         );
        

}
const busqueda = (req = request, resp = response) => {

    const {colecciones,argumento} = req.params;

    if(!coleccionesPermitidas.includes(colecciones))
        return resp.status(400).json({
            msg:`las colecciones permitidas son ${coleccionesPermitidas}`
        });

    
    switch (colecciones) {
        case "categoria":
            busquedaCategoria(argumento, resp)
            break;
        case "usuario":
            busquedaUsuario(argumento, resp)
            break;
        case "producto":
            busquedaProducto(argumento, resp)
            // busquedaProductosPorCategoria(argumento, resp)
            
            break;
    
        default:
            return resp.status(500).json({
                msg: 'Sele olvido hacer esta busqueda'
            });
            break;
    }
    // return;
}


module.exports = {busqueda};

