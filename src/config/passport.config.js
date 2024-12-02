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
new GoogleStrategy(
    {
        clientID: "TU_CLIENT_ID",
        clientSecret: "TU_CLIENT_SECRET",
        callbackURL: process.env.NODE_ENV === 'production'
            ? "https://articulacion.onrender.com/auth/google/callback"
            : "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log('Perfil de usuario:', profile);
        done(null, profile);
    }
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
