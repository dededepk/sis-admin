
var val_usuario = document.getElementById("input-user")
var val_clave = document.getElementById("input-password")
document.getElementById("btn_ingresar").addEventListener("click", () => {
    limpiarMensajesError()
    if(validateAll("form-login")){
        usuario = {
            in_usuario: val_usuario.value.trim(),
            in_clave: EnDescryptClave(val_clave.value.trim())
        }
        ws_post(url_http + "ws_aleatorio/service/credenciales.php",
            usuario,
            responseLogin)
    }    
})

const responseLogin = (data)=>{
    let datos = JSON.parse(data);
    console.log(datos.length)
    if(datos.length > 0){
        console.log("ddes")
        localStorage.setItem("usuarioNom",datos[0].usuario)
        abrirVentana("disclaimer.html")
    }else{
        mostrarMensajeError("input-password","Usuario o contraseña incorrecta")
    }
}