const { google } = require('googleapis');

// Configurar el cliente OAuth2
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:5000/oauth2callback'
);

/**
 * Callback de OAuth2: Intercambia el código por tokens
 */
const oauth2Callback = async (req, res) => {
    try {
        const { code } = req.query; // Obtener el código de autorización desde la URL

        // Intercambiar el código por tokens
        const { tokens } = await oauth2Client.getToken(code);

        // Configurar las credenciales en el cliente OAuth2
        oauth2Client.setCredentials(tokens);

        // Aquí puedes guardar los tokens en la sesión o base de datos
        console.log('Tokens obtenidos:', tokens);

        // Redirigir al usuario al dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error al procesar el código de autorización:', error);
        res.status(500).send('Error en la autenticación');
    }
};

module.exports = { oauth2Callback };
