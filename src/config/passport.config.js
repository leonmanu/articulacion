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
            clientID: "TU_CLIENT_ID",
            clientSecret: "TU_CLIENT_SECRET",
            callbackURL: process.env.NODE_ENV === 'production'
                ? "https://articulacion.onrender.com/oauth2callback"
                : "http://localhost:5000/oauth2callback",
            passReqToCallback: true
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('AccessToken:', accessToken);
            console.log('RefreshToken:', refreshToken);
            console.log('Perfil completo:', profile);
            if (!profile) {
                return done(new Error('Perfil no encontrado'));
            }
            done(null, profile);
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
