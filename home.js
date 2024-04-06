// Selección de elementos del DOM
const btnBuscar = document.querySelector('#btn-busqueda'),
busqueda = document.querySelector('#busqueda'),
contMaquinas = document.querySelector('#cont-maquinas');
const contenido = document.querySelector("#contenido");
const iniciandoSesion = document.querySelector("#cargando")
const logo = document.querySelector('.logo');

// Inicialización de variables
let btnAgregar;
let encontrado;
let usActual = JSON.parse(localStorage.getItem('usuarioActual'));

// Evento clic en el logo para redirigir a la página de inicio
logo.addEventListener("click", ()=>{
    window.location.href = "./home.html"; // Redirigir al usuario a la página de inicio
});



// Función para mostrar notificaciones
function toastify(texto, dir) {
    Toastify({
        text: texto,
        duration: 3000,
        destination: dir,
        newWindow: false,
        close: false,
        gravity: "top", 
        position: "left", 
        stopOnFocus: true, 
        style: {
            background: "white",
            color: "black",
            fontWeight: "bold",
            border: "1px solid rgb(201, 0, 0)",
        },
        onClick: function(){} 
    }).showToast();
}

// Mostrar mensaje de bienvenida
let texto = "Bienvenido " + usActual;
toastify(texto);
    
// Array para almacenar máquinas    
let maquinasDB = [];
const API_URL = "./db.json"

// Obtener datos de la API
const getData = async(url) =>{
    const response = await fetch(url);
    const data = await response.json();
    maquinasDB = data;
    getMaquinas(maquinasDB);
}

getData(API_URL);

// Función para mostrar las máquinas
function getMaquinas(maquinasDB){
    
    maquinasDB.forEach(maquina => {
        const {img, nombre, descripcion, zona, id} = maquina;
        contMaquinas.innerHTML += ` <div class="card">
                                                <div class="cardContent">
                                                    <img src="${img}" alt="">
                                                    <h3>${nombre}</h3>
                                                    <p>${descripcion}</p>
                                                </div>
                                                <div class="divBoton">
                                                    <button id="${id}" class="agg">Agregar</button>
                                                </div>
                                    </div>`;
    });
    
    // Evento de clic para agregar máquinas
    const btnAgregar = document.querySelectorAll(".agg");
    
    btnAgregar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let btnId = parseInt(e.target.id);
            let maquinaAgg = agregarMaquina(maquinasDB, btnId);
            let texto = "Maquina agregada";
            let dir = "./misMaquinas.html"
            toastify(texto,dir)
            return maquinaAgg;
        });
    });
}

// Llamar a la función para mostrar las máquinas
getMaquinas(maquinasDB);

// Función para buscar máquinas
function buscarMaquina(arr, filtro){
    const filtroLowerCase = filtro.toLowerCase();
    const encontrados = arr.filter((e)=>{
        return e.nombre.toLowerCase().startsWith(filtroLowerCase);
    });
    return encontrados;
}

// Evento de clic para buscar máquinas
btnBuscar.addEventListener('click',()=>{
    const encontrados = buscarMaquina(maquinasDB, busqueda.value);
    if(encontrados.length > 0){
        contMaquinas.innerHTML = "";
        encontrados.forEach((encontrado) => {
            const {id, img, nombre, descripcion, zona} = encontrado;
            contMaquinas.innerHTML += ` <div class="card">
                                                    <div class="cardContent">
                                                        <img src="${img}" alt="">
                                                        <h3>${nombre}</h3>
                                                        <h5>${zona}</h5>
                                                        <p>${descripcion}</p>
                                                    </div>
                                                    <div class="divBoton">
                                                        <button id="${id}" class="agg">Agregar</button>
                                                    </div>
                                        </div>`;
        });
        const btnAgregar = document.querySelectorAll(".agg");
    
        btnAgregar.forEach(btn => {
            btn.addEventListener("click", (e) => {
                let btnId = parseInt(e.target.id);
                let maquinaAgg = agregarMaquina(maquinasDB, btnId);
                let texto = "Maquina agregada";
                let dir = "./misMaquinas.html"
                toastify(texto,dir)
                return maquinaAgg;
            });
        });
    }
})

// Clase para representar una máquina
class Maquina{
    constructor(id, imagen, nombre, descripcion, zona){
        this.id = id;
        this.imagen = imagen;
        this. nombre = nombre
        this.descripcion = descripcion;
        this.zona = zona;
    }
}

// Función para agregar máquinas
function agregarMaquina(arr, filtro){
    const misMaquinas = arr.find((el)=>{
        return el.id == filtro;
    })
    crearMiMaquina(misMaquinas);
    return misMaquinas
}

// Función para crear una máquina en la lista de máquinas del usuario
function crearMiMaquina(misMaquinas) {
    const { id, img, nombre, descripcion, zona } = misMaquinas;
    const maquinaMisMaquinas = new Maquina(id, img, nombre, descripcion, zona);
    guardarMaquinaLS(usActual,maquinaMisMaquinas);
}

// Función para guardar la máquina en el almacenamiento local del usuario
function guardarMaquinaLS(nomUsuario, maquina){
    let us = JSON.parse(localStorage.getItem('usuarios'));
    const usuarioEncontrado = us.find((usuario) => usuario.usuario === nomUsuario)
    usuarioEncontrado.maquinas.push(maquina);
    localStorage.setItem('usuarios',JSON.stringify(us))
}

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu ul');

// Agregar evento clic al botón del menú hamburguesa
menuBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
});