const req = require('express/lib/request')
const estudianteService = require('../services/estudiante.service')
const escuelaService = require('../services/escuela.service')

const get =  async (req, res) => {
    const registros = await estudianteService.get()
    const claveEscuelas = await escuelaService.getColumna('clave')
    
    res.render("pages/estudiante/estudianteList", {estudiantes: registros, claveEscuelas})
}

module.exports = {
    get
}