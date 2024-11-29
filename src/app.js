const express = require('express');
const path = require("path");
const session = require('express-session');
const passport = require('./config/passport.config');
const escuelaRouter = require('./routes/escuela.route');
const traspasoRouter = require('./routes/traspaso.route');
const authRouter = require('./routes/auth.route');
const { oauth2Callback } = require('./controllers/auth.controller');

const app = express();

app
    .use(express.static(__dirname + '/public'))
    .use(express.json())
    .use(
        session({
            secret: 'tu_secreto', // Cambia esto por algo seguro
            resave: false,
            saveUninitialized: false,
        })
    )
    .use(passport.initialize())
    .use(passport.session())
    .set("views", path.join(__dirname, "/views"))
    .set("view engine", "ejs")
    .use(require('./routes/estudiante.route'))
    .use('/escuela', escuelaRouter)
    .use('/traspaso', traspasoRouter)
    .use(authRouter); // Agrega las rutas de autenticación

    app.get('/oauth2callback', oauth2Callback);

module.exports = app;
