const { response, request } = require("express");
const Categoria = require("../models/categoria");


const categoriaGet = async (req = request, resp = response) => {
  const id = req.params.id;
  const categoria = await Categoria.findById(id)
              .populate('usuario','nombre');
  resp.json({
    categoria 
  });
};
const categoriasGet = async (req = request, resp = response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };


  const [total , categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
    .populate('usuario','nombre')
    .skip(Number(desde))
    .limit(Number(limit))
  ])


  resp.json({
    total,
    categorias,
  });
};

const categoriaPost = async (req, resp = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return resp.status(400).json({
      msg: `la Categoria ${nombre} , ya existe.`,
    });
  }

  const data = {
    nombre,
    usuario: req.usuario._id,
  };
  const categoria = new Categoria(data);
  await categoria.save();
  resp.status(201).json({
    msg: " post API - controllers",
    categoria,
  });
}
const categoriaPut =  async(req = request,  resp = response)=> {
  const id = req.params.id;
  const {_id,estado, usuario , ...data} = req.body;
      data.nombre = data.nombre.toUpperCase();
      data.usuario = req.usuario._id;
  const categoria = await Categoria.findByIdAndUpdate(id, data,{new:true});

  resp.json({
      msg: ' put API - controllers',
      categoria
 
  });
}

const categoriaDelete = async(req = request,  resp = response)=> {
  const {id} = req.params;
  const categoriaBorrada = await Categoria.findByIdAndUpdate(  id,{estado:false}, {new:true});

  resp.json(categoriaBorrada);


}





module.exports = {
  categoriasGet,
  categoriaGet,
  categoriaPost,
  categoriaPut,
  categoriaDelete
};
