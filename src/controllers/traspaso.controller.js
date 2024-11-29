const req = require('express/lib/request')
const traspasoService = require('../services/traspaso.service')
//const escuelaService = require('../services/escuela.service')

const get =  async (req, res) => {
    const registros = await traspasoService.get()
    //const claveEscuelas = await escuelaService.getColumna('clave')
    
    res.render("pages/traspaso/traspasoList", {registros})
}

const post =  async (req, res) => {
    console.log("entró al controller de traspaso")

    try {
        const arrayJson = req.body.datosModificados
        const resultado = await traspasoService.post(arrayJson)
        
        res.status(201).json({ message: 'Registro agregado correctamente', data: resultado });
    }
    catch (error) {
        console.log("error")
        res.status(500).json({ error: 'Error al agregar el registro' });
    }
}

module.exports = {
    get,
    post
}