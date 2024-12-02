const {Router} = require('express')
const router = Router()

const {
    get,
    acciones,
    salientes,
    entrantes,
    getPorEscuelaClave
} = require('../controllers/estudiante.controller')

router
    .get('/', get)
    .get('/acciones', acciones)
    //.get('/salientes', salientes)
    .get('/salientes/:claveEscuela?', getPorEscuelaClave)
    .get('/entrantes', entrantes)

module.exports = router