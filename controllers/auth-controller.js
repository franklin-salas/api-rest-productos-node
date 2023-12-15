const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const generarJWT = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    // existe correo
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/Correo no son correctos - correo",
      });
    }
    // verificar estado
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario/Correo no son correctos - estado:false",
      });
    }

    //verificar contraseña
    const valipassword = bcryptjs.compareSync(password, usuario.password);
    if (!valipassword) {
      return res.status(400).json({
        msg: "Usuario/Correo no son correctos - password",
      });
    }

    //generar JWT

    const token = await generarJWT(usuario.id);

    res.json({
      msg: "ok login",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error comunicarse con el admin",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
        
  try {
    const { nombre, img, correo } = await googleVerify(id_token);
    console.log("ddd" ,nombre, img, correo)

    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: "No mms google :P",
        google: true,
        img,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Usuario bloquedao, comuniquese con el administrador ",
      });
    }
    //generar JWT

    const token = await generarJWT(usuario.id);

    res.json({
      msg: "ok login",
      usuario,
      token,
    });

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "El token no se puedo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
