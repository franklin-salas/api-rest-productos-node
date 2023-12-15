const { response } = require("express");
const  fs  = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      msg: "No se subio el archivo.",
    });
  }

  try {
    const nombre = await subirArchivo(req.files, "");

    res.json({
      nombre,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

 

  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo =  await Usuario.findById(id);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `No se encuentra el id del modelo ${coleccion}` });
      break;
    case "productos":
      modelo =  await Producto.findById(id);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `No se encuentra el id del modelo ${coleccion}` });
      break;

    default:
      return res.status(500).json({ msg: `No se encuentra eL MODELO` });
  }

  if(modelo.img){
     const pathName = path.join(__dirname,"../uploads",coleccion,modelo.img);
     if (fs.existsSync(pathName)) {
      
          fs.unlinkSync(pathName);
      
     }
  }
  const archivo = await subirArchivo(req.files, coleccion);
  modelo.img = archivo;
  await modelo.save();

  res.json({
    modelo,
  });
};


const mostrarImagen = async(req, res = response) => {
  const { id, coleccion } = req.params;
  const pathNoImage = path.join(__dirname,"../assets/no-image.jpg");

 

  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo =  await Usuario.findById(id);
      if (!modelo)
        // return res
        //   .status(400)
        //   .json({ msg: `No se encuentra el id del modelo ${coleccion}` });
        return res.status(400).sendFile(pathNoImage);
      
        break;
    case "productos":
      modelo =  await Producto.findById(id);
      if (!modelo)
        // return res
        //   .status(400)
        //   .json({ msg: `No se encuentra el id del modelo ${coleccion}` });
        return res.status(400).sendFile(pathNoImage);
        break;

    default:
      return res.status(500).json({ msg: `No se encuentra eL MODELO` });
  }

  if(modelo.img){
     const pathName = path.join(__dirname,"../uploads",coleccion,modelo.img);
     if (fs.existsSync(pathName)) {
         return res.sendFile(pathName);
      
     }
  }
  return res.sendFile(pathNoImage);
  
}

const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

 

  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo =  await Usuario.findById(id);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `No se encuentra el id del modelo ${coleccion}` });
      break;
    case "productos":
      modelo =  await Producto.findById(id);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `No se encuentra el id del modelo ${coleccion}` });
      break;

    default:
      return res.status(500).json({ msg: `No se encuentra eL MODELO` });
  }

  if(modelo.img){
    const array = modelo.img.split('/');
    const nombre = array[array.length-1];
    const [public_id] = nombre.split('.');

    cloudinary.uploader.destroy(public_id);
  }

  const {tempFilePath} = req.files.archivo;
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;
  await modelo.save();

  res.json({
    modelo,
  });
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  actualizarImagenCloudinary ,
  mostrarImagen
};
