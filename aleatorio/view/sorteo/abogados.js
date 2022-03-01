var carga_arbitro_carrito = []

const ListarAbogado= () =>{

    let in_especialidad= localStorage.getItem("captura_especialidad")
    ws_get(url_http + "ws_aleatorio/service/abogados.php?in_especialidad="+in_especialidad,responseListarAbogado)
    divloader.style.display = 'flex'
}

const responseListarAbogado = (data)=>{
    let datos = JSON.parse(data)
    container_abogados.innerHTML = ``;
    if(datos.length > 0){
        carga_arbitro_carrito = []
        localStorage.setItem("carga_arbitro",data) 
        localStorage.setItem("carga_arbitro_cantidad",datos.length) 
        datos.forEach((elemento)=>{
            carga_arbitro_carrito.push(elemento.cod_abogado)
            
            container_abogados.innerHTML += `<div class="item card-lawyer">
            <div class="user-img">
                <img src="${elemento.foto}" alt="">
            </div>
            <div class="info-user">
                <div class="name-lawyer">
                ${elemento.nombre}
                </div>
            </div>
            </div>`
        })
        divloader.style.display = 'none'
    }else{
        alert("Problemas de conexion")
        divloader.style.display = 'none'
    }
}