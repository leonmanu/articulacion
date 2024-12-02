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

const postArray = async (arrayJson, emailUsuario) => {
    console.log("Servicio POST llamado con datos:", arrayJson);

    if (!arrayJson || !Array.isArray(arrayJson) || arrayJson.length === 0) {
        throw new Error('No hay datos válidos para procesar.');
    }

    const fechaActual = new Date().toISOString();

    // Modificar cada objeto en el array agregando las propiedades 'fecha' y 'usuario'
    const arrayModificado = arrayJson.map(registro => {
        // Aquí estamos agregando las propiedades 'fecha' y 'usuario' a cada objeto
        return {
            ...registro, // Copiamos las propiedades existentes del objeto
            fecha: fechaActual,  // Agregamos la propiedad 'fecha' con la fecha actual
            usuario: emailUsuario, // Agregamos la propiedad 'usuario' con el correo del usuario
            estado: 1
        }
    })

    try {
        const resultado = await traspasoSheet.postArray(arrayModificado);

        if (!resultado.value) {
            console.warn("Errores detectados:", errores);
            throw new Error(resultado.message);
        }

        console.log("Todos los registros se guardaron correctamente.");
    } catch (error) {
        console.error("Error en el servicio POST:", error.message);
        throw error;
    }
}




module.exports = {
    get, postArray
}