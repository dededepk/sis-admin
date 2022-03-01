const getEspecialidad = () => {
    ws_get(url_http + "ws_aleatorio/service/especialidades.php", listarEspecialidad)
    divloader.style.display = 'flex'
}
const listarEspecialidad = (data) => {
    console.log('llenando listados')
    crearCombos("cbo_especialidad", data, 0, true)
    crearCombos("cbo_especialidad_paso2", data, 0, true)
    divloader.style.display = 'none'
}

getEspecialidad()