const path = require("path");
const { v4: uuid } = require("uuid");

const subirArchivo = (files , carpeta ='') => {

  return new Promise((resolve , reject) => {
    const { archivo } = files;

  const nombreCortado = archivo.name.split(".");
  const extension = nombreCortado[nombreCortado.length - 1];

  //validar extension

  const extensionesValidas = ["jpg", "png", "gif"];
  if (!extensionesValidas.includes(extension)) {
   return reject(`la extension ${extension} no es valida: ${extensionesValidas}`);
    // return res.status(400).json({
    //   msg: `la extension ${extension} no es valida: ${extensionesValidas}`,
    // });
  }


  const nombreuuid = uuid() + "." + extension;

    uploadPath = path.join( __dirname + "/../uploads/" ,carpeta,nombreuuid);

    archivo.mv(uploadPath,(err) =>{
      if (err) {
        reject(err)
        // return res.status(500).json({ msg:err});
      }

      resolve(nombreuuid);
      // res.json({ msg:"File uploaded to " + uploadPath});
    });
  }  
  
)
}

module.exports = {
  subirArchivo
}