const {Router} = require('express')
const router = Router()

const {
    get, post
} = require('../controllers/traspaso.controller')

router
    .get('/', get)
    .post('/post', post)

module.exports = router