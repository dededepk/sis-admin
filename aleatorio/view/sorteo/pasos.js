$("#header_content").load('header.html')

var carrito = []
var dosatres = 0
var content_sorteo = document.getElementById("content-sorteo")
var content_resumen = document.getElementById("content-resumen")
var step1 = document.getElementById("pills-especialidad-tab")
var step2 = document.getElementById("pills-sorteo-tab")
var step3 = document.getElementById("pills-registro-tab")
var btn_continuar = document.getElementById("btn_continuar")
var btn_sortear = document.getElementById("btn_sortear")
var btn_finalizar_sorteo = document.getElementById("btn_finalizar_sorteo")
var btn_agregar = document.getElementById("btn_agregar")
var btn_eliminar_arb_ya = document.getElementById("btn_eliminar_arb_ya")
var btn_regresar = document.getElementById("btn_regresar")
var btn_registrar_caso = document.getElementById("btn_registrar_caso")
var btn_registrar_caso_ya = document.getElementById("btn_registrar_caso_ya")
var btn_show_sorteo = document.getElementById("btn_show_sorteo")
var btn_cerrar_deresumen = document.getElementById("btn_cerrar_deresumen")
var content_step1_especialidad = document.getElementById("pills-especialidad")
var content_step2_sorteo = document.getElementById("pills-sorteo")
var content_step3_registro = document.getElementById("pills-registro")
var cbo_especialidad = document.getElementById("cbo_especialidad")
var cbo_especialidad_paso2 = document.getElementById("cbo_especialidad_paso2")
var contenedor_contenido_agregado = document.getElementById("div-chosen")
var container_abogados = document.getElementById("div-grid-container-abogados")
var contenedor_resumen = document.getElementById("div-resumen")
var contenedor_resumen_final = document.getElementById("div-resumen-final")
var inputCaso = document.getElementById("inputCaso")
var divloader = document.getElementById("divloader")

const paso1 = () => {
    cbo_especialidad.value = 0

    content_step1_especialidad.className = "tab-pane fade active show"
    content_step2_sorteo.className = "tab-pane fade"
    content_step3_registro.className = "tab-pane fade"

    step1.className = "nav-link active"
    step2.className = "nav-link"
    step3.className = "nav-link"

    carrito = []
    carga_arbitro_carrito = []
    container_abogados.innerHTML = ``
    inputCaso.value = ``
    contenedor_contenido_agregado.className = "content-chosen fade"
    cbo_especialidad_paso2.disabled = false
    contenedor_resumen.innerHTML = ``
    dosatres = 0

}

const paso2 = () => {
    let value = parseInt(cbo_especialidad.options[cbo_especialidad.selectedIndex].value)
    if(value == 0){
        mostrarMensajeError("cbo_especialidad","<span class='material-icons'>report_problem</span>Campo obligatorio")
    }else{
        if(dosatres === 0){
            cbo_especialidad_paso2.value = localStorage.getItem("captura_especialidad")
            ListarAbogado()
        }
        content_step1_especialidad.className = "tab-pane fade"
        content_step2_sorteo.className = "tab-pane fade active show"
        content_step3_registro.className = "tab-pane fade"

        step1.className = "nav-link"
        step2.className = "nav-link active"
        step3.className = "nav-link"
        dosatres = 1
    }
}

const paso3 = () => {
    if (carrito.length > 0) {
        contenedor_resumen.innerHTML = ``
        let arbitro_cantidad = localStorage.getItem("carga_arbitro_cantidad")
        let arbitro = JSON.parse(localStorage.getItem("carga_arbitro"))
        for (var i = 0; i < carrito.length; i++) {
            for(j=0;j<arbitro_cantidad;j++){
              if(parseInt(carrito[i])=== parseInt(arbitro[j].cod_abogado)){
                let contenedor_especialidad = ``
                let especialidades= arbitro[j].especialidades
                for(y=0;y<especialidades.length ;y++){
                        contenedor_especialidad  += `
                        <div class="card-especialidad bg-light">
                            <div class="especialidad">
                            ${especialidades[y].nombre}:
                            </div>
                            <span class="material-icons">
                                check_circle
                            </span>
                        </div>`
                }
                contenedor_resumen.innerHTML += `<div class="card-lawyer-skills">
                                     <div class="wrap-info-lawyer">
										<div class="info-lawyer">
											<div class="name-lawyer">
                                            ${arbitro[j].nombre}
											</div>
											<div class="cal-lawyer">
												CAL: ${arbitro[j].cal}
											</div>
                                            <!--<button type="button" class="btn link-button">Descargar CV</button>-->
										</div>
										<div class="user-img">
											<img src="${arbitro[j].foto}" alt="">
										</div>
									</div>
                                    <hr>
                                    <div class="card-lawyer-type">
											<p class="marginBottom-0-5">Tipo de árbitro</p>
											<div class="type">
                                            ${arbitro[j].tipo}
											</div>
									</div>
                                    <hr>
                                    <div class="wrap-especialidades">
                                    <p class="marginBottom-0-5">Especialidades</p>
                                    ${contenedor_especialidad}
                                    </div>
                                    </div>`   
            }
         }
       }

        content_step1_especialidad.className = "tab-pane fade"
        content_step2_sorteo.className = "tab-pane fade"
        content_step3_registro.className = "tab-pane fade active show"

        step1.className = "nav-link"
        step2.className = "nav-link"
        step3.className = "nav-link active"
    }

}


step1.addEventListener("click", () => {
    paso1()
})

step2.addEventListener("click", () => {
    paso2()
})

step3.addEventListener("click", () => {
    paso3() 
})

btn_continuar.addEventListener("click", () => {
    paso2()
})

btn_finalizar_sorteo.addEventListener("click", () => {
    paso3()
})

btn_regresar.addEventListener("click", () => {
    paso2()
})

cbo_especialidad.addEventListener("change", () => {
    let value = parseInt(cbo_especialidad.options[cbo_especialidad.selectedIndex].value)
    localStorage.setItem("captura_especialidad",value)  
    if(value != 0){
        limpiarMensajeErrorObj("cbo_especialidad")
    }
})

btn_sortear.addEventListener("click", () => {
    let value = parseInt(cbo_especialidad_paso2.options[cbo_especialidad_paso2.selectedIndex].value)
    if(value == 0){
        mostrarMensajeError("cbo_especialidad_paso2","<span class='material-icons'>report_problem</span>Campo obligatorio")
    }else{
        if (carga_arbitro_carrito.length > 0){
            let arbitro_cantidad = localStorage.getItem("carga_arbitro_cantidad")
            let arbitro = JSON.parse(localStorage.getItem("carga_arbitro"))
            let contenedor_elegido = document.getElementById("div-body-contenedor-elegido")
            contenedor_elegido.innerHTML = ``
            let random = Math.floor(Math.random() * (carga_arbitro_carrito.length - 0) + 0)
                for(i=0;i<carga_arbitro_carrito.length;i++){
                    if(random === i){
                            for(j=0;j<arbitro_cantidad;j++){
                                if(parseInt(carga_arbitro_carrito[i])=== parseInt(arbitro[j].cod_abogado)){

                                        contenedor_elegido.innerHTML += `<h1 class="modal-title marginBottom-1-5 text-center">El árbitro elegido es:</h1>
                                        <div class="card-lawyer-elected">
                                                <div class="info-lawyer">
                                                    <input type="hidden" id="hd_cod_abogado" value="${arbitro[j].cod_abogado}">
                                                    <div class="name-lawyer">
                                                    ${arbitro[j].nombre}
                                                    </div>
                                                    <div class="cal-lawyer">
                                                    CAL: ${arbitro[j].cal}
                                                    </div>
                                                    <!-- <button type="button" class="btn link-button">Descargar CV</button>-->
                                                </div>
                                                <div class="user-img">
                                                    <img src="${arbitro[j].foto}" alt="">
                                                </div>
                                        </div>
                                        <p class="marginBottom-0-5">Tipo de árbitro</p>
                                        <div class="card-especialidad">
                                            <div class="tipo-arbitro">
                                            ${arbitro[j].tipo}
                                            </div>
                                        </div>
                                        <p class="marginBottom-0-5">Especialidades</p>
                                        ` 
                                        let especialidades= arbitro[j].especialidades
                                            for(y=0;y<especialidades.length ;y++){
                                                contenedor_elegido.innerHTML += `
                                                <div class="card-especialidad">
                                                    <div class="especialidad">
                                                    ${especialidades[y].nombre}
                                                    </div>
                                                    <span class="material-icons">
                                                        check_circle
                                                    </span>
                                                </div>
                                                `
                                            }
                                }
                            }
                    }
                }
                $('#modalArbitroElegido').modal('show'); 
        }
    }
})

cbo_especialidad_paso2.addEventListener("change", () => {
    let value = parseInt(cbo_especialidad_paso2.options[cbo_especialidad_paso2.selectedIndex].value)
    localStorage.setItem("captura_especialidad",value)  
    if(value != 0){
        limpiarMensajeErrorObj("cbo_especialidad_paso2")
        ListarAbogado()
    }
})

btn_agregar.addEventListener("click", () => {
    let agregado = document.getElementById("hd_cod_abogado").value
    carrito.push(agregado)
    //--
    for (var i = carga_arbitro_carrito.length; i > 0; i--) {
        if (parseInt(carga_arbitro_carrito[i - 1]) === parseInt(agregado)) {
            carga_arbitro_carrito.splice([i - 1], 1)
        }
    }
    //--
    ListarAbogadoDespuesDeSorteo()
    pintarCarrito()
    $('#modalArbitroElegido').modal('hide')

})


const pintarCarrito = () => {
    if (carrito.length > 0) {
        let contenido_agregado = document.getElementById("content-chosen")
        contenido_agregado.innerHTML = ``
        let arbitro_cantidad = localStorage.getItem("carga_arbitro_cantidad")
        let arbitro = JSON.parse(localStorage.getItem("carga_arbitro"))

        for (var i = 0; i < carrito.length; i++) {
            for(j=0;j<arbitro_cantidad;j++){
               if(parseInt(carrito[i])=== parseInt(arbitro[j].cod_abogado)){
                  contenido_agregado.innerHTML += `<div class="item card-lawyer card-lawyer-selected" id="div_item_arbitro_${arbitro[j].cod_abogado}">
									<div class="content-card-lawyer-selected">
										<div class="user-img">
											<img src="${arbitro[j].foto}" alt="">
										</div>
										<div class="info-user">
											<div class="name-lawyer">
                                            ${arbitro[j].nombre}
											</div>
											<div class="type-lawyer">
                                            ${arbitro[j].tipo}
											</div>
										</div>
									</div>
									<div class="btn-group dropstart">
										<button type="button" class="btn p-0" data-bs-toggle="dropdown" aria-expanded="false">
											<span class="material-icons-outlined">
												more_vert
											</span>
										</button>
										<ul class="dropdown-menu">
											<li>
												<button class="dropdown-item" type="button" onclick="eliminarItemCarrito('${arbitro[j].cod_abogado}')">
													Eliminar abogado
												</button>
											</li>
										</ul>
									</div>
								</div>`
                }                  
            }
       }
       contenedor_contenido_agregado.className = "content-chosen"
       cbo_especialidad_paso2.disabled = true
    }else{
       contenedor_contenido_agregado.className = "content-chosen fade"
       cbo_especialidad_paso2.disabled = false
    }
}

const eliminarItemCarrito = (id) => {
    let contenedor_eliminar = document.getElementById("div-body-contenedor-eliminar")
    contenedor_eliminar.innerHTML = ``
    let arbitro_cantidad = localStorage.getItem("carga_arbitro_cantidad")
    let arbitro = JSON.parse(localStorage.getItem("carga_arbitro"))
    for(j=0;j<arbitro_cantidad;j++){
        if(parseInt(id)=== parseInt(arbitro[j].cod_abogado)){
            contenedor_eliminar.innerHTML += `
            <div class="info-lawyer">
            <input type="hidden" id="hd_cod_abogado_eliminarya" value="${arbitro[j].cod_abogado}">
							<div class="name-lawyer">
                            ${arbitro[j].nombre}
							</div>
							<div class="cal-lawyer">
								CAL: ${arbitro[j].cal}
							</div>
							<!--<button type="button" class="btn link-button">Descargar CV</button>-->
						</div>
						<div class="user-img">
							<img src="${arbitro[j].foto}" alt="">
						</div>
            `
        }
    }
    $('#modalEliminarArbitro').modal('show')
}

btn_eliminar_arb_ya.addEventListener("click", () => {
    let eliminarya = document.getElementById("hd_cod_abogado_eliminarya").value

    for (var i = carrito.length; i > 0; i--) {
        if (parseInt(carrito[i - 1]) === parseInt(eliminarya)) {
            carrito.splice([i - 1], 1)
        }
    }
    //---
    carga_arbitro_carrito.push(eliminarya)
    //---
    ListarAbogadoDespuesDeSorteo()
    pintarCarrito()
    $('#modalEliminarArbitro').modal('hide')
})

const ListarAbogadoDespuesDeSorteo= () =>{
    container_abogados.innerHTML = ``;
    console.log(carga_arbitro_carrito.length)
    if(carga_arbitro_carrito.length > 0){

        let arbitro_cantidad = localStorage.getItem("carga_arbitro_cantidad")
        let arbitro = JSON.parse(localStorage.getItem("carga_arbitro"))

        for (var i = 0; i < carga_arbitro_carrito.length; i++) {
            for(j=0;j<arbitro_cantidad;j++){
               if(parseInt(carga_arbitro_carrito[i])=== parseInt(arbitro[j].cod_abogado)){
            
                container_abogados.innerHTML += `<div class="item card-lawyer">
                <div class="user-img">
                    <img src="${arbitro[j].foto}" alt="">
                </div>
                <div class="info-user">
                    <div class="name-lawyer">
                    ${arbitro[j].nombre}
                    </div>
                </div>
                </div>`

                }
            }
        }
    }else{
        container_abogados.innerHTML = ``
    }
}

btn_registrar_caso.addEventListener("click", () => {
    let value = inputCaso.value
    if(value.length === 0){
        mostrarMensajeError("inputCaso","<span class='material-icons'>report_problem</span>Campo obligatorio")
    }else{
        document.getElementById("h1nombrecaso").innerHTML = value
        $('#modalRegistrarCaso').modal('show')
    }
})

inputCaso.addEventListener("keyup", () => {
    let value = inputCaso.value
    if(value.length != 0){
        limpiarMensajeErrorObj("inputCaso")
    }
})

btn_registrar_caso_ya.addEventListener("click", () => {
    let value = inputCaso.value
    let carritocomas =""
    for (var i = 0; i < carrito.length; i++) {
        carritocomas += carrito[i] + ','
    }
    carritocomas = carritocomas.slice(0, -1)

    caso = {
        in_caso: value.trim(),
        in_abogado: carritocomas
    }
    ws_post(url_http + "ws_aleatorio/service/casos.php",
        caso,
        responseCaso)

    divloader.style.display = 'flex'
})

const responseCaso = (data)=>{
    if (data !== null){
        let datos = JSON.parse(data)
        console.log("responseCaso")
        console.log(datos.length)

        if(parseInt(datos.codigo) === 1){
                //
                let value = inputCaso.value
                document.getElementById("h2nombrecaso").innerHTML = value
                contenedor_resumen_final.innerHTML = ``
                let arbitro_cantidad = localStorage.getItem("carga_arbitro_cantidad")
                let arbitro = JSON.parse(localStorage.getItem("carga_arbitro"))
                
                for (var i = 0; i < carrito.length; i++) {
                    for(j=0;j<arbitro_cantidad;j++){
                        if(parseInt(carrito[i])=== parseInt(arbitro[j].cod_abogado)){
                            contenedor_resumen_final.innerHTML += `
                            <div class="card-lawyer-elected bg-light marginBottom-2">
                                        <div class="info-lawyer">
                                            <div class="name-lawyer">
                                            ${arbitro[j].nombre}
                                            </div>
                                            <div class="cal-lawyer">
                                                CAL: ${arbitro[j].cal}
                                            </div>
                                            <!-- <button type="button" class="btn link-button">
                                                Descargar CV
                                            </button>-->
                                        </div>
                                        <div class="user-img">
                                            <img src="${arbitro[j].foto}" alt="">
                                        </div>
                                    </div>`
                        }
                    }
                }
                content_sorteo.style.display = 'none'
                content_resumen.style.display = 'block'
                //
                divloader.style.display = 'none'
        }else{
            console.log("error")
            alert("error")
            divloader.style.display = 'none'
        }
    }else{
        console.log("error")
        alert("error")
        divloader.style.display = 'none'
    }
}

btn_show_sorteo.addEventListener("click", () => {

    paso1()
    content_sorteo.style.display = 'block'
    content_resumen.style.display = 'none'
})

btn_cerrar_deresumen.addEventListener("click", () => {
    abrirVentana("index.html")
})