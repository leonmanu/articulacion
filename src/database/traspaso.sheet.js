const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config();

const googleId = '1u--FiGgUcA5Q7Zvd8Nw1TGR6wknUZUJsYxIJNroh4Jc';

const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function get() {
    try {
        const documento = new GoogleSpreadsheet(googleId, serviceAccountAuth)
        
        await documento.loadInfo()
        const sheet = documento.sheetsByTitle['traspaso'] // Seleccionamos la primera hoja
        const rows = await sheet.getRows() // Obtenemos todas las filas
        
        return rows
    } catch (error) {
        console.error("Error al acceder al documento:", error)
    }
}

// Agregar una nueva fila a la hoja
async function post(data) {
    try {
        const documento = new GoogleSpreadsheet(googleId, serviceAccountAuth);
        
        await documento.loadInfo();
        const sheet = documento.sheetsByTitle['traspaso']; // Seleccionamos la hoja por título

        // Agregar una nueva fila
        const newRow = await sheet.addRow(data);

        console.log("Nueva fila agregada:", newRow);
        return newRow;
    } catch (error) {
        console.error("Error al agregar una nueva fila:", error);
    }
}

async function postArray(data) {

    const nerrores = 0

    try {
        const documento = new GoogleSpreadsheet(googleId, serviceAccountAuth);
        await documento.loadInfo();
        const sheet = documento.sheetsByTitle['traspaso'];

        for (const registro of data) {
            try {
                if (!registro || Object.keys(registro).length === 0) {
                    throw new Error("Registro vacío o inválido.");
                }

                // Guardar la fila en la hoja
                await sheet.addRow(registro);
            } catch (error) {
                console.error("Error al procesar registro:")
                return nerrores += 1
            }
        }
    } catch (error) {
        console.error("Error crítico al procesar registros:", error.message);
        return {
            value: false,
            message: error.message
        }
    }

    // Retornar siempre un objeto con resultados y errores
    return {
        value: true,
        message: "listo pero con " + nerrores + "errores."
    }
}






module.exports = { get, post, postArray };
