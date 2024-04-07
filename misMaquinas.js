// Selección de elementos del DOM
let misMaquinas = document.querySelector("#mis-maquinas"),
maquinasUs = document.querySelector("#maquinasUs");
const logo = document.querySelector('.logo');

// Obtener el usuario actual del localStorage
let usActual = JSON.parse(localStorage.getItem('usuarioActual'));

// Evento clic en el logo para redirigir a la página de inicio
logo.addEventListener("click", () => {
    window.location.href = "./home.html"; // Redirigir al usuario a la página de inicio
});

// Función para buscar máquinas
function buscarMaquina(arr, filtro){
    const filtroLowerCase = filtro.toLowerCase();
    const encontrados = arr.filter((e)=>{
        return e.nombre.toLowerCase().startsWith(filtroLowerCase);
    });
    return encontrados;
}


// Función para agregar máquinas al DOM del usuario actual
function aggMaquina(nomUsuario){
    
    // Obtener la lista de usuarios del localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios'))

    // Encontrar el usuario actual
    const us = usuarios.find((usuario) => usuario.usuario === nomUsuario);

    // Obtener las máquinas del usuario
    const usMaquina = us.maquinas;
    if (usMaquina.length === 0) {
            // Si el usuario no tiene máquinas, mostrar un mensaje
            crearTextoP();
    } else {
            // Si el usuario tiene máquinas, iterar sobre ellas y agregarlas al DOM
            for (const maquina of usMaquina) {

                // Crear un nuevo elemento div para cada máquina
                const nuevaMaquina = document.createElement('div');
                nuevaMaquina.id = maquina.id; // Asignar el ID de la máquina
                nuevaMaquina.classList.add('card'); // Agregar la clase 'card'
                nuevaMaquina.classList.add('cardMisMaquinas');
                
                // Insertar el contenido HTML de la máquina con sus detalles
                nuevaMaquina.innerHTML = `
                    <img src="${maquina.imagen}" alt="">
                    <h3>${maquina.nombre}</h3>
                    <p>${maquina.descripcion}</p>
                    <h4> Agregue los kilos correspondientes </h4>
                    <div class="control">
                        <button class="kg menos">-</button>
                        <p class="contador">0</p>
                        <button class="kg mas">+</button>
                    </div>
                    <button class="eliminar">Eliminar</button>`;

                // Agregar la nueva máquina al contenedor de máquinas del usuario
                misMaquinas.appendChild(nuevaMaquina);

                // Obtener los elementos relacionados con la cantidad de kilos
                const btnMenos = nuevaMaquina.querySelector('.menos');
                const btnMas = nuevaMaquina.querySelector('.mas');
                const contador = nuevaMaquina.querySelector('.contador');

                let cantidad = 0; // Inicializar la cantidad de kilos

                // Evento click para disminuir la cantidad de kilos
                btnMenos.addEventListener('click', () => {
                    if (cantidad > 0) {
                        cantidad--;
                        contador.innerHTML = cantidad; // Actualizar la cantidad mostrada
                    }
                });

                // Evento click para aumentar la cantidad de kilos
                btnMas.addEventListener('click', () => {
                    cantidad++;
                    contador.innerHTML = cantidad;
                });

                // Evento click para eliminar la máquina
                const btnEliminar = nuevaMaquina.querySelector('.eliminar');
                btnEliminar.addEventListener('click', () => {
                    nuevaMaquina.remove(); // Eliminar la máquina del DOM

                    // Encontrar el índice de la máquina en la lista de máquinas del usuario
                    const indice = usMaquina.findIndex((el) => el.id === maquina.id);

                    // Eliminar la máquina de la lista de máquinas del usuario
                    usMaquina.splice(indice, 1);

                    // Actualizar la lista de usuarios en el localStorage
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    if(usMaquina.length == 0){
                        crearTextoP()
                    }


                });
            }
        }
}

// Llamar a la función para agregar máquinas del usuario actual
aggMaquina(usActual);

function crearTextoP(){
    const mensaje = document.createElement('p');
    mensaje.classList.add("maquinas-p");
    mensaje.textContent = 'No se ha agregado ninguna máquina';
    misMaquinas.appendChild(mensaje);
}

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu ul');

// Agregar evento clic al botón del menú hamburguesa
menuBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
});