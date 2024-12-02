const {Router} = require('express')
const router = Router()

const {
    get, postArray
} = require('../controllers/traspaso.controller')

router
    .get('/', get)
    .post('/postArray', postArray)

module.exports = router