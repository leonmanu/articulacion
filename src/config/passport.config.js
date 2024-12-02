const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require('fs');

// Carga las credenciales desde client_secret.json
const credentials = JSON.parse(fs.readFileSync('./src/json/client_secret.json'));


// Extrae los valores necesarios
const CLIENT_ID = credentials.web.client_id;
const CLIENT_SECRET = credentials.web.client_secret;
const CALLBACK_URL = credentials.web.redirect_uris[0];

// Configura la estrategia de Google
passport.use(
    new GoogleStrategy(
        {
            clientID: "158320560302-uijgnhspve6ntibrgkcn5gg9juuuvvmk.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: process.env.NODE_ENV === 'production'
            ? "https://articulacion.onrender.com/oauth2callback"
            : "http://localhost:5000/oauth2callback",
            passReqToCallback : true
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('Perfil de usuario:', profile);
            // Aquí puedes verificar si el usuario ya existe en tu base de datos
            done(null, profile); // Puedes reemplazar profile con un objeto de usuario
        }
    )
);

// Serialización de usuario
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialización de usuario
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
