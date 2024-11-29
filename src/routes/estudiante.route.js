const {Router} = require('express')
const router = Router()

const {
    get
} = require('../controllers/estudiante.controller')

router
    .get('/', get)

module.exports = router