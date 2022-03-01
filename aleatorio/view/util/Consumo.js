function ws_post(url, dato, metodocallback) {
    $.ajax({
        type: 'POST',
        url: url,
        data: dato,
        beforeSend: function () {

        },
        complete: function (data) {
        },
        success: function (data) {
            var respuesta = (data !== "" ? data : "");
            if (metodocallback !== null) {
                metodocallback(respuesta);
            }
        },
        error: function (data) {
            console.log("Problemas con el envio del formulario");
            mostrarModalMensaje("Alerta", "Problemas de conexión, por favor inténtelo de nuevo")
        }
    });
}
function ws_get(url, metodocallback) {
    $.ajax({
        type: 'GET',
        url: url,
        beforeSend: function () {

        },
        complete: function (data) {
        },
        success: function (data) {
            var respuesta = (data !== "" ? data : "");
            if (metodocallback !== null) {
                metodocallback(respuesta);
            }
        },
        error: function (data) {
            console.log("Problemas con el envio del formulario");
            mostrarModalMensaje("Alerta", "Problemas de conexión, por favor inténtelo de nuevo")
        }
    });

}