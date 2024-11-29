const traspasoSheet = require('../database/traspaso.sheet')
const utilidadesService = require('./utilidades.service')

const get = async () => {
    try {
        const registros = await traspasoSheet.get();

        if (!registros.length) {
            console.warn("No se encontraron registros.")
            return []
        }
        
        const registrosJson = utilidadesService.convertToJson(registros)
        return registrosJson

    } catch (error) {
        console.error("Error al procesar los datos:", error.message)
        return []
    }
}

const post = async (arrayJson) => {
    console.log("traspaso.service -> post: ", arrayJson.length)
    if (!arrayJson || !Array.isArray(arrayJson) || arrayJson.length === 0) {
        return res.status(400).json({ error: 'No hay datos válidos para procesar.' });
    }

    try {
        const resultados = [];
        
        for (const registro of arrayJson) {
            console.log("Procesando registro:", registro);

            // Aquí debería ser el formato correcto de fila, cada 'registro' es una fila
            const resultado = await traspasoSheet.post(registro); // Llamamos a la función que maneja el servicio
            resultados.push(resultado); // Acumulamos el resultado de cada inserción
        }

        return resultados
    } catch (error) {
        console.error("Error al procesar registros:", error);
        res.status(500).json({ error: 'Error al guardar los registros' });
    }
}

module.exports = {
    get, post
}