const { response, request } = require("express");
const {Producto} = require("../models");


const productoGet = async (req = request, resp = response) => {
  const id = req.params.id;
  const producto = await Producto.findById(id)
              .populate('usuario','nombre')
              .populate('categoria','nombre')
              ;
 
  resp.json({
    producto 
  });
}
const productosGet = async (req = request, resp = response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };


  const [total , productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
    .populate('usuario','nombre')
    .populate('categoria','nombre')
    .skip(Number(desde))
    .limit(Number(limit))
  ]);


  resp.json({
    total,
    productos,
  });
};

const productoPost = async (req, resp = response) => {

  const {estado , ...datos} = req.body;
   let nombre = req.body.nombre.toUpperCase();

  const productoDB = await Producto.findOne({ nombre });
  if (productoDB) {
    return resp.status(400).json({
      msg: `la Producto ${nombre} , ya existe.`,
    });
  }

  const data = {
    ...datos,
    nombre,
    usuario: req.usuario._id,

  };
 
  const producto = new Producto(data);
  await producto.save();
  resp.status(201).json({
    msg: " post API - controllers",
    producto,
  });
}
const productoPut =  async(req = request,  resp = response)=> {
  const id = req.params.id;
  const {_id,estado, usuario , ...data} = req.body;
    if(data.nombre){
      data.nombre = data.nombre.toUpperCase();
    }
     
      data.usuario = req.usuario._id;
  const producto = await Producto.findByIdAndUpdate(id, data,{new:true});

  resp.json({
      msg: ' put API - controllers',
      producto
 
  });
}

const productoDelete = async(req = request,  resp = response)=> {
  const {id} = req.params;
  const productoBorrada = await Producto.findByIdAndUpdate(  id,{estado:false}, {new:true});

  resp.json(productoBorrada);


}





module.exports = {
  productosGet,
  productoGet,
  productoPost,
  productoPut,
  productoDelete
};
