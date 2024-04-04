/* Logica de inicio de sesión*/
const usuario = document.querySelector('#usuario'),
contraseña = document.querySelector('#contraseña'),
iniciar = document.querySelector('#iniciar'),
checkbox = document.querySelector('.check');
const iniciandoSesion = document.getElementById("cargando")
const contenido = document.querySelector(".container");
const registrar = document.querySelector("#registrar");


let usuarios = [];
let usuarioEncontrado;
let contraseñaEncontrada;

class Recordar{
    constructor(usuario,contraseña){
        this.usuario = usuario,
        this.contraseña = contraseña
    }
}

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


function guardarUsuario(recordarUsu){
    usuarios.push(recordarUsu);
    guardarEnSession(usuarios);
}

function guardarEnSession(usuarios){
    return sessionStorage.setItem('usuarios', JSON.stringify(usuarios));
}

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

registrar.addEventListener("click", ()=>{
    window.location.href = "./registro.html";
});


function buscarUsuario(usuarioFilter){
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    usuarioEncontrado = usuarios.filter(e => e.usuario === usuarioFilter);
    return usuarioEncontrado.length > 0 ? usuarioEncontrado[0] : null
}


function buscarContraseña(contraseñaFilter){
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    contraseñaEncontrada = usuarios.filter(e => e.contraseña === contraseñaFilter);
    return contraseñaEncontrada.length > 0 ? contraseñaEncontrada[0] : null
}


/* Framework SweetAlert */
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