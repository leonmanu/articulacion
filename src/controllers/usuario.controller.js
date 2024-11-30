const req = require('express/lib/request')
const usuarioService = require('../services/usuario.service')
const escuelaService = require('../services/escuela.service')

const get =  async (req, res) => {
    const registros = await escuelaService.get()
    
    res.render("pages/escuela/escuelaList", {escuelas: registros})
}

const usuarioAnalisis = async (req, res) => {
   //console.log("usuairo.controller / siEsisteUsuario / req.session.user.hd: " + req.session.user.email)
    const email = req.session.user.email
    const hd = req.session.user.hd

    const resultado = await usuarioService.getSiExiste(email)
    console.log("resultado; ", resultado)
    if(resultado){
        res.redirect("/docente/cargo")
    } else {
        res.redirect("/usuario/alta")
    }
}

const post = (req, res) => {
    const obj = req.body
    const resultado = usuarioService.post(obj)
    res.redirect("/")
}

const formAlta =  async (req, res) => {
    const claveEscuelas = await escuelaService.getColumna('clave')
    const user = req.session.user
    res.render('pages/usuario/formAlta', {user, claveEscuelas})
}

module.exports = {
    get,
    post,
    usuarioAnalisis,
    formAlta,
}