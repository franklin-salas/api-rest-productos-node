const {response ,request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const usuarioGet = async(req  = request,  resp = response)=> {
    // const {id ,nombre = 'sin nombre ', apiKey , limit } = req.query
    const {limit = 5 , desde= 0} = req.query;
    const query = {estado:true};
    // const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limit));
    // const total = await Usuario.count(query);
    // mejorar la respuesta el doble de tiempo
    const [total, usuarios] = await Promise.all([
      Usuario.count(query),
      Usuario.find(query).skip(Number(desde)).limit(Number(limit))
    ]);
    resp.json({
        total,
        usuarios
    });
  }

const usuarioPost = async (req,  resp = response)=> {

    
    const {nombre, password,correo,rol} = req.body;
    const usuario = new Usuario({nombre, password,correo,rol});

    // const existEmail = await Usuario.findOne({correo  });
    // if (existEmail) {
    //   return resp.status(400).json({
    //     msg: 'El correo ya esta registrado'
    //   });
    // }

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password,salt);


        await usuario.save();
    resp.json({
        msg: ' post API - controllers',
        usuario
    });
  }

const usuarioPut =  async(req = request,  resp = response)=> {
    const id = req.params.id;
    const {_id,password , google, correo , ...resto} = req.body;
    if(password){
      const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto,{new:true});

    resp.json({
        msg: ' put API - controllers',
        usuario
    });
  }

const usuarioPatch = (req,  resp = response)=> {
    resp.json({
        msg: ' patch API - controllers'
    });
  }

  const usuarioDelete = async(req,  resp = response)=> {

    const id = req.params.id;
    const usuarioAutenticado = req.usuario;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:true},{new:true});

    resp.json({usuario, usuarioAutenticado});
  }

  module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete
  }