const {Router} = require('express')
const router = Router()

const {
    get,
    acciones,
    salientes,
    entrantes
} = require('../controllers/estudiante.controller')

router
    .get('/', get)
    .get('/acciones', acciones)
    .get('/salientes', salientes)
    .get('/entrantes', entrantes)

module.exports = router