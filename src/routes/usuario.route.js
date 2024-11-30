const {Router} = require('express')
const router = Router()

const {
    get,
    usuarioAnalisis,
    formAlta,
    post
} = require('../controllers/usuario.controller')

router
    .get('/', get)
    .get('/usuarioAnalisis', usuarioAnalisis)
    .get('/alta', formAlta)
    .post('/alta', post)

module.exports = router