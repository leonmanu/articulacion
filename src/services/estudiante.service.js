const estudianteSheet = require('../database/estudiante.sheet')
const utilidadesService = require('./utilidades.service')

const get = async () => {
    try {
        const registros = await estudianteSheet.get();

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

module.exports = {
    get,
}