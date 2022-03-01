const abrirVentana = (ruta) => {
    window.location.href = ruta;
}

const mostrarModalMensaje = (titulo, mensaje) => {
    document.getElementById("modal_mensaje_titulo").innerHTML = titulo
    document.getElementById("modal_mensaje_texto").innerHTML = mensaje
    $("#modalMensaje").modal("show")
}

const mostrarMensajeError = (input_id, mensaje) => {
    input_id = "error-" + input_id;
    console.log(input_id);
    document.getElementById(input_id).innerHTML = mensaje;
    document.getElementById(input_id).style.display = "block";
}
const limpiarMensajesError = () => {
    let errores = document.getElementsByClassName("error");
    Array.prototype.forEach.call(errores, (error) => {
        error.style.display = "none";        
    })
}
const limpiarMensajeErrorObj = (input_id) => {
    input_id = "error-" + input_id;
    console.log(input_id);
    document.getElementById(input_id).style.display = "none";
}
const cerrarSesion = () => {
    localStorage.clear()
    abrirVentana("/")
}
const mostrarValueInputReadOnly = (id, value, estado) => {
    document.getElementById(id).value = value
    document.getElementById(id).readOnly = estado
}
const limpiarCampoInput = (id) => {
    document.getElementById(id).value = ""
}

const formarFecha = (fecha) => {
    let cadena = fecha.split('-')
    return cadena[2] + '-' + cadena[1] + '-' + cadena[0];
}

const EnDescryptClave = (cadena) => {
    let llave = "CEARLATAM"
    let encrypted = CryptoJS.AES.encrypt(cadena, llave)
    let decrypted = CryptoJS.AES.decrypt(encrypted,llave)
    return decrypted.toString()
}
const crearCombos=(nombre, data, inicial, seleccione) =>{
    let datos = JSON.parse(data)
    let combo = document.getElementById(nombre)
    if(seleccione){
        combo.innerHTML += `<option value="0">Seleccione</option>`
    }
    datos.forEach((elemento)=>{
        let selected = ""
        if(elemento.codigo === inicial){
            selected = "selected"
        }
        combo.innerHTML += `<option ${selected} value="${elemento.codigo}">${elemento.descripcion}</option>`
    })
}