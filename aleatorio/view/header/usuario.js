document.getElementById("span-nom-usuario").innerHTML = localStorage.getItem("usuarioNom")

document.getElementById("btn-cerrar").addEventListener("click", () => {
    abrirVentana("index.html")
})