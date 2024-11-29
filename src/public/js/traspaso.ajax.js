$(window).on("load", function () {
    // Manejar el cambio en cualquier input dentro de la tabla
    $("table > tbody > tr input").change(function (event) {
        event.preventDefault();

        // Obtener la fila actual
        var tbl_row = $(this).closest('tr');

        // Resaltar fila modificada
        tbl_row.addClass('fst-italic');
        tbl_row.find(".change").html('true'); // Marcar como modificada
        tbl_row.find(".estudiante").addClass('text-success'); // Resaltar estudiante

        // Activar botón de guardar
        $('#btn-guardar').prop('disabled', false).addClass('btn-outline-success');
    });

    // Al presionar el botón editar
    $('#btn-editar').click(function (event) {
        event.preventDefault();

        $('#btn-editar').addClass('d-none');
        $('#btn-guardar').removeClass('d-none');
        $('.form-control').removeAttr('disabled');
    });

    // Al presionar el botón guardar
    $('#btn-guardar').click(function (event) {
        event.preventDefault();

        // Variable para acumular datos de filas modificadas
        let datosModificados = [];

        // Recorrer filas modificadas
        $("table > tbody > tr").each(function () {
            var tbl_row = $(this);

            // Verificar si la fila fue modificada
            if (tbl_row.find(".change").html() === 'true') {
                let fila = {
                    rn: tbl_row.find("td:nth-child(2)").text().trim(), // Valor oculto RN
                    id: tbl_row.find("td:nth-child(3)").text().trim(), // ID
                    escuelaOrigen: tbl_row.find("td:nth-child(4)").text().trim(), // Clave Escuela
                    curso: tbl_row.find("td:nth-child(5)").text().trim(), // Clave Curso
                    fechaInscripcion: tbl_row.find("td:nth-child(6)").text().trim(), // Fecha Inscripción
                    estadoInscripcion: tbl_row.find("td:nth-child(7)").text().trim(), // Estado Inscripción
                    estudiante: tbl_row.find("td:nth-child(8)").text().trim(), // Nombre Estudiante
                    dni: tbl_row.find("td:nth-child(9)").text().trim(), // Documento
                    escuela: tbl_row.find("td:nth-child(10) input").val() // Valor del input asociado al datalist
                };

                datosModificados.push(fila);
            }
        })
        $.ajax({
            url: '/traspaso/post',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({ datosModificados }), // Asegurarte de que los datos son un objeto JSON
            dataType: 'json', // Esperamos una respuesta en JSON
            success: function (response) {
                console.log("Respuesta del servidor:", response);
                alert(response.message); // Mensaje enviado desde el backend
                // Aquí reinicia el estado de las filas si es necesario
            },
            error: function (xhr, status, error) {
                console.error("Error al guardar:", error);
                alert("Error al guardar los datos: " + error);
            }
        });
        
        

        // Mostrar los datos modificados como JSON en un alert
        //alert(JSON.stringify(datosModificados, null, 4)); // Formateado para lectura

        // Opcional: Resetear el estado de las filas
        
    });
});
