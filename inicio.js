// Selección de elementos del DOM
const usuario = document.querySelector('#usuario'),
contraseña = document.querySelector('#contraseña'),
iniciar = document.querySelector('#iniciar'),
checkbox = document.querySelector('.check');
const iniciandoSesion = document.getElementById("cargando")
const contenido = document.querySelector(".container");
const registrar = document.querySelector("#registrar");

// Declaración de variables
let usuarios = [];
let usuarioEncontrado;
let contraseñaEncontrada;


// Clase Recordar para almacenar usuario y contraseña
class Recordar{
    constructor(usuario,contraseña){
        this.usuario = usuario,
        this.contraseña = contraseña
    }
}

// Función para mostrar el estado de carga
function cargando(){
    iniciandoSesion.classList.remove("none");
    iniciandoSesion.classList.add("block");
    contenido.classList.add("none");
    setTimeout(()=>{
        iniciandoSesion.classList.remove("block");
        iniciandoSesion.classList.add("none");
        window.location.href = "./home.html";
    },2000)
}

// Función para guardar usuario en la sesión
function guardarUsuario(recordarUsu){
    usuarios.push(recordarUsu);
    guardarEnSession(usuarios);
}

// Función para guardar usuarios en la sesión
function guardarEnSession(usuarios){
    return sessionStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Evento click del botón de iniciar sesión
iniciar.addEventListener('click',(e)=>{
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    if(usuarios == null){ // Condicional para comprobar que exista algo en el localStorage
        sweetAlert("No existen usuarios registrados","error")
    }else{
        e.preventDefault();
        usuarioEncontrado = buscarUsuario(usuario.value);
        contraseñaEncontrada = buscarContraseña(contraseña.value);
        if(usuarioEncontrado && contraseñaEncontrada){
            cargando();
            if(checkbox.checked){
                const recordarUsu = new Recordar(usuario.value, contraseña.value);
                guardarUsuario(recordarUsu);
                sweetAlert("Usuario sera recordado","success")
                guardarEnSession(usuarios);
                localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado.usuario));            
            }else{      
                localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado.usuario));
            }
        }else{
            sweetAlert("Contraseña o usuario incorrectos", "error");
        }
        return usuarios
    }
})

// Evento click del botón de registro
registrar.addEventListener("click", ()=>{
    usuario.value = "";
    contraseña.value= "";
    window.location.href = "./registro.html";
});

// Función para buscar usuario en el localStorage
function buscarUsuario(usuarioFilter){
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    usuarioEncontrado = usuarios.filter(e => e.usuario === usuarioFilter);
    return usuarioEncontrado.length > 0 ? usuarioEncontrado[0] : null
}

// Función para buscar contraseña en el localStorage
function buscarContraseña(contraseñaFilter){
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    contraseñaEncontrada = usuarios.filter(e => e.contraseña === contraseñaFilter);
    return contraseñaEncontrada.length > 0 ? contraseñaEncontrada[0] : null
}


// Función para mostrar una alerta personalizada
function sweetAlert(mensaje,icono){
    Swal.fire({
        position: "top-end",
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
            popup: 'custom-alert-class',
            content: 'custom-alert-content-class'
        },
        grow: 'fullscreen',
    });
}