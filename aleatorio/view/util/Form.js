
var mensajeinvalido = [];
function validateAll(form) {
    mensajeinvalido = [];
    var listAll = validateStatus(form);
    var indexListStatus = listAll[0].length;
    for (var i = 0; i < indexListStatus; i++) {
        removeAlertMessage(listAll[1][i]);
    }

    var status = true;
    for (var i = 0; i < indexListStatus; i++) {
        var status = listAll[0][i];
        if (!status) {
            addStyleDanger(listAll[1][i]);
            status = false;
            addAlertMessage(listAll[1][i], i);
            break;
        } else {
            addStyleCorrect(listAll[1][i]);

        }
    }
    return status;
}

function validateStatus(form) {
    var list = getAllInput(form);
    var xlength = list.length;
    var listaV = Array();
    var listaC = Array();
    var listAll = Array();
    for (var i = 0; i < xlength; i++) {
        var name = list[i].name;
        if (name == "cvacio") {
            var r = validateVacio(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);
        } else if (name == "cadenan") {
            var r = validateName(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);
        } else if (name == "cadenaa") {
            var r = validateLastName(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);
        } else if (name == "numberd") {
            var r = validateDni(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);
        } else if (name == "numdoc") {
            var r = validateNumDoc(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);
        } else if (name == "cadena") {
            var r = validateCadena(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);
        } else if (name == "number") {
            var r = validateNumerico(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);
        } else if (name == "numberc") {
            var r = validateCelular(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);

        } else if (name == "numbert") {
            var r = validateTelefono(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);

        } else if (name == "cadenac") {
            var r = validateCorreo(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);

        } else if (name == "fechnac") {
            var r = validaFechaNacimiento(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);
        } else if (name == "nocaracter") {
            var r = validateCaracteresEspeciales(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);

        } else if (name == "nocarespecial") {
            var r = validateCaracterEspecial(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);

        } else if (name == "no100") {
            var r = validateMenorIgual100(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);

        } else if (name == "cpassword") {
            var r = validatePassword(list[i].value);
            listaV.push(r);
            listaC.push(list[i]);

        }

    }
    listAll.push(listaV, listaC);
    return listAll;
}

//function traer todos los inputs
function getAllInput(idForm) {
    var form = document.getElementById(idForm);
    var listInput = form.getElementsByTagName('input');
    return listInput;
}
function addStyleDanger(input) {
    input.style.borderColor = "#C60D0D";
}

function addStyleCorrect(input) {
    input.style.borderColor = "#286781";
}
function addAlertMessage(input, valor) {
    var nAlert = document.getElementById("error-" + input.id);
    var contAlert = document.getElementById("error-" + input.id);
    var xvalue = input.value;
    if (xvalue === "") {
        nAlert.innerText = "El campo esta vacio, por favor ingrese los datos.";
    } else {
        nAlert.innerText = mensajeinvalido[valor];
    }
    //mostramos el div.alert
    contAlert.style.display = "block";
    contAlert.classList.remove("d-none")
    document.getElementById(input.id).focus();
}

// funcion para remover el alert
function removeAlertMessage(input) {
    var nAlert = document.getElementById("error-" + input.id);
    nAlert.style.display = "none";
}


// ------------------ LISTA DE FUNCIONES ------------------------------- //

//funcion para nombre
function validateName(name) {
    var regExp = /[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/
    var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
    mensajeinvalido[valor] = "Texto invalido, no es el texto requerido";
    return regExp.test(name);
}

//funcion para apellidos

function validateLastName(lastName) {
    var regExp = /^[A-Za-z]{2,50}$/
    var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
    mensajeinvalido[valor] = "El texto no cumple con el dato requerido";
    return regExp.test(lastName);
}

//funcion para dni
function validateCarnet(dni) {
    var regExp = /^[0-9]{12}$/
    mensajeinvalido = "El texto no cumple con el dato requerido";
    return regExp.test(dni);
}
function validateDni(dni) {
    var regExp = /^[0-9]{8}$/
    var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
    mensajeinvalido[valor] = "El texto no cumple con el dato requerido";
    return regExp.test(dni);
}


function validateCelular(celular) {
    var regExp = /^[0-9]{9}$/
    var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
    mensajeinvalido[valor] = "El texto no cumple con el dato requerido";
    return regExp.test(celular);
}
function validateVacio(cadena) {
    var vacio = true;
    if (cadena.trim().length === 0) {
        vacio = false;
    }
    var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
    mensajeinvalido[valor] = "El campo esta vacio, por favor ingrese los datos.";
    return vacio;
}

//funcion para Telefono
function validateTelefono(telefono) {
    var regExp = /^[0-9]{7}$/
    var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
    mensajeinvalido[valor] = "El texto no cumple con el dato requerido";
    return regExp.test(telefono);
}

//funcion para validar que sea solo cadena
function validateCadena(cadena) {
    var regExp = /[A-Za-z\s]/
    var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
    mensajeinvalido[valor] = "El texto no cumple con el dato requerido";
    return regExp.test(cadena);
}

//funcion para validar que sea solo numerico
function validateNumerico(cadena) {
    var regExp = /[0-9]/
    var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
    mensajeinvalido[valor] = "El texto no cumple con el dato requerido";
    return regExp.test(cadena);
}

//funcion para validar correos
function validateCorreo(correo) {
    var regExp = /^.+@[^\.].*\.[a-zA-Z]{2,}$/
    var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
    mensajeinvalido[valor] = "El texto no cumple con el dato requerido";
    return regExp.test(correo);
}
function validaFechaNacimiento(fechnac) {
    var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
    mensajeinvalido[valor] = "Debes ser mayor de edad";
    var valida = false;
    var f = new Date();
    // fecha seleccionada
    var d = fechnac.substring(0, 2);
    var m = fechnac.substring(3, 5);
    var y = fechnac.substring(6, 10);
    var FechaNacimiento = parseInt(d) + parseInt(m) * 30 + parseInt(y) * 360;
    //fecha actual
    var dia = f.getDate();
    var mes = (f.getMonth() + 1);
    mes = (mes.length = 1) ? mes = "0" + mes : mes;
    var anio = f.getFullYear();
    var FechaActual = parseInt(dia) + parseInt(mes) * 30 + parseInt(anio) * 360;
    var ValidaFechaNacimiento = FechaActual - FechaNacimiento;
    if (ValidaFechaNacimiento > 6480) {
        valida = true;
    }

    return valida;
}
function validateCaracteresEspeciales(cadena) {
    if (cadena !== "") {
        var regExp = /[`~!$%^&*()°¬|+\=?;:'",<>\{\}\[\]\\\/]/gi
        var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
        mensajeinvalido[valor] = "El texto no cumple con el dato requerido";
        var retorno = true;
        if (regExp.test(cadena))
            retorno = false;
        else
            retorno = true;
    } else {
        retorno = false;
    }

    return retorno;
}
function validateCaracteresEspeciales(cadena) {
    if (cadena !== "") {
        var regExp = /[`~!$%^&*()°¬|+\=?;:'",<>\{\}\[\]\\\/]/gi
        var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
        mensajeinvalido[valor] = "El texto no cumple con el dato requerido";
        var retorno = true;
        if (regExp.test(cadena))
            retorno = false;
        else
            retorno = true;
    } else {
        retorno = false;
    }

    return retorno;
}
function validateCaracterEspecial(cadena) {
    if (cadena !== "") {
        var regExp = /[`~!$%^&*()°¬|+\=?;:'",<>\{\}\[\]\\\/]/gi
        var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
        mensajeinvalido[valor] = "El texto no cumple con el dato requerido";
        var retorno = true;
        if (regExp.test(cadena))
            retorno = false;
        else
            retorno = true;
    } else {
        retorno = false;
    }

    return retorno;
}
function validatePassword(cadena) {
    if (cadena !== "") {
        var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)

        if (cadena.length < 7) {
            mensajeinvalido[valor] = "El texto debe tener mín. 7 digitos";
            retorno = false;
        } else {
            var regExp = /[`~!^*()°¬|+\=?;:'",<>\{\}\[\]\\\/]/gi
            mensajeinvalido[valor] = "El texto no cumple con el dato requerido";
            var retorno = true;
            if (regExp.test(cadena))
                retorno = false;
            else
                retorno = true;
        }
    } else {
        retorno = false;
    }

    return retorno;
}
function validateMenorIgual100(cadena) {
    var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
    mensajeinvalido[valor] = "El valor ingresado tiene que ser menor o igual a 100";
    if (cadena !== "") {
        return (cadena <= 100 ? true : false);
    } else {
        return false;
    }
}
function validateSelect(cadena) {
    if (cadena === "0") {
        var valor = (mensajeinvalido.length > 0 ? mensajeinvalido.length : 0)
        mensajeinvalido[valor] = "Seleccione una opción";
        return false;
    } else {
        return true;
    }

}
function soloNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789";
    especiales = [8, 37, 39, 46];
    if (key === 13) {
        var ingreso = document.getElementById("btn-ingresar");
        ingreso.click();
    } else {
        tecla_especial = false;
        for (var i in especiales) {
            if (key === especiales[i]) {
                tecla_especial = true;
                break;
            }
        }
        if (letras.indexOf(tecla) === -1 && !tecla_especial)
            return false;
    }
}
function soloNumeroMenorIgual100(id) {
    var retorno = true;
    if ($('#' + id).val().length > 2) {
        retorno = (parseInt($('#' + id).val()) <= 100 ? true : false);
        if (!retorno) {
            $('#' + id).val(100)
        }
    }

    return retorno;

}
function soloNumeroMenorIgual20(id) {
    var retorno = true;
    if ($('#' + id).val().length > 1) {
        retorno = (parseInt($('#' + id).val()) <= 20 ? true : false);
        if (!retorno) {
            $('#' + id).val(0)
        }
    }

    return retorno;

}
function soloNumeroMenorIgual10(id) {
    var retorno = true;
    if ($('#' + id).val().length > 1) {
        retorno = (parseInt($('#' + id).val()) <= 10 ? true : false);
        if (!retorno) {
            $('#' + id).val(10)
        }
    }
    agregarFilaEval();
    return retorno;
}
function soloNumeroMenorIgual10Edit(id, valormin) {
    var retorno = true;
    if ($('#' + id).val().length >= 1) {
        if (parseInt($('#' + id).val()) >= valormin) {
            retorno = (parseInt($('#' + id).val()) <= 10 ? true : false);
            if (!retorno) {
                $('#' + id).val(10)
            }
        } else {
            retorno = false;
            $('#' + id).val(valormin)
        }

    }
    agregarFilaEvalEdit(valormin)
    // agregarFilaEval();
    return retorno;
}
function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = [8, 96, 249, 252];

    tecla_especial = false;
    for (var i in especiales) {
        if (key === especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) === -1 && !tecla_especial) {
        return false;
    }
}
function Keypasswordcaracteres(campo) {
    var myInput = $('#' + campo).val().trim();
    var mensaje = $('#' + "error-" + campo);
    ///var info = $('#mensaje-info')
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    // var caractes = /[$%&#]/g;
    mensaje.css("display", "none")
    //info.css("display", "block")
    let veces = 0
    let val_mensaje = ""
    if (myInput.length === 0) {
        val_mensaje = "El campo esta vacio, por favor ingrese los datos"
        veces++
    } else {
        if (myInput.length < 7) {
            val_mensaje += `<label id="clargo" style="color:red">Al menos 7 caracteres de extensión</label><br>`
            veces++
        } else {
            val_mensaje += `<label id="clargo" style="color:black">Al menos 7 caracteres de extensión</label><br>`
        }
        if (!myInput.match(lowerCaseLetters)) {
            val_mensaje += `<label id="cletramin" style="color:red">Contiene una letra minúscula(a-z)</label><br>`
            veces++
        } else {
            val_mensaje += `<label id="cletramin" style="color:black">Contiene una letra minúscula(a-z)</label><br>`
        }

        if (!myInput.match(upperCaseLetters)) {
            val_mensaje += `<label id="cletramay" style="color:red">Contiene una letra mayúscula(A-Z)</label><br>`
            veces++
        } else {
            val_mensaje += `<label id="cletramay" style="color:black">Contiene una letra mayúscula(A-Z)</label><br>`
        }
        if (!myInput.match(numbers)) {
            val_mensaje += `<label id="cnumero" style="color:red">Contiene un numero(0-9)</label><br>`
            veces++
        } else {
            val_mensaje += `<label id="cnumero" style="color:black">Contiene un numero(0-9)</label><br>`
        }
    }
    mensaje.html(val_mensaje)
    mensaje.css("display", "block")
    return (veces > 0 ? true : false)


}