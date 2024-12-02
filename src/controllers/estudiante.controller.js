const req = require('express/lib/request')
const estudianteService = require('../services/estudiante.service')
const escuelaService = require('../services/escuela.service')

const get =  async (req, res) => {
    const registros = await estudianteService.get()
    const claveEscuelas = await escuelaService.getColumna('clave')
    
    res.render("pages/estudiante/estudianteList", {estudiantes: registros, claveEscuelas, user: req.session.user})
}

const acciones =  async (req, res) => {
    
    res.render("pages/estudiante/estudianteAcciones", {user: req.session.user})

}

const salientes =  async (req, res) => {
    const registros = await estudianteService.get()
    const claveEscuelas = await escuelaService.getColumna('clave')
    
    res.render("pages/estudiante/estudianteSalientes", {estudiantes: registros, claveEscuelas, user: req.session.user})
    
}

const entrantes =  async (req, res) => {
    
    res.render("pages/estudiante/estudianteEntrantes", {user: req.session.user})
    
}

module.exports = {
    get,
    acciones,
    salientes,
    entrantes
}