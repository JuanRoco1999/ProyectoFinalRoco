// Seleccionar los elementos del formulario y el botón de registro
const nombre = document.querySelector('#nombre'),
usuario = document.querySelector('#usuario'),
email = document.querySelector('#email'),
contraseña = document.querySelector('#contraseña'),
registrar = document.querySelector('#registrar'),
inputs = document.querySelectorAll('input');


let usuarios;

// Verificar si hay usuarios en el almacenamiento local, de lo contrario, inicializar un arreglo vacío
if(localStorage.getItem('usuarios')){
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
}else{
    usuarios = [];
}

// Clase Usuario para crear objetos de usuario
class Usuario{
    constructor(nombre, usuario, email, contraseña, maquinas){
        this.nombre = nombre;
        this.usuario = usuario;
        this.email = email;
        this.contraseña = contraseña;
        this.maquinas = maquinas;
    }
}


let usuarioEncontrado;
let emailEncontrado;

// Función para guardar un nuevo usuario
function guardarUsuario(usuario) {

    // Buscar si el usuario o el correo electrónico ya están registrados
    const usuarioEncontrado = buscarUsuario(usuarios, usuario.usuario);
    const emailEncontrado = buscarEmail(usuarios, usuario.email);
    
    // Verificar si todos los campos del formulario están completos
    if(usuario.nombre !== '' && usuario.usuario !== '' && usuario.email !== '' && usuario.contraseña !== '') {
        if (usuarioEncontrado || emailEncontrado) { // Verificar si el usuario o el correo electrónico ya existen
            usuarioEncontrado && sweetAlert('El usuario ya existe', 'error'); // Mostrar mensaje si el usuario ya existe
            emailEncontrado && sweetAlert('El email ya existe', 'error'); // Mostrar mensaje si el correo electrónico ya existe
        } else {
            usuarios.push(usuario); // Agregar el nuevo usuario al arreglo de usuarios
            guardarEnLS(usuarios); // Guardar el arreglo de usuarios en el almacenamiento local
            let nombreAlerta = usuario.nombre + " ha sido registrado exitosamente";
            sweetAlert(nombreAlerta,'success'); // Mostrar mensaje de éxito
            setTimeout(()=>{
                window.location.href = "./inicio.html"; // Redirigir a la página de inicio de sesión después del registro exitoso
            },1100)
        }
        return usuarios;
    }   else {
        sweetAlert('Necesita completar todos los campos',"error") // Mostrar mensaje si hay campos vacíos
        }
    }

// Función para buscar un usuario por nombre de usuario
function buscarUsuario(arr, filtroUsuario){
    usuarioEncontrado = arr.filter(usuario => usuario.usuario === filtroUsuario);
    if(usuarioEncontrado.length > 0){
        return usuarioEncontrado[0];
    }else{
        return null
    }
}

// Función para buscar un usuario por correo electrónico
function buscarEmail(arr, filtroEmail){
    emailEncontrado = arr.filter(usuario => usuario.email === filtroEmail);
    if(emailEncontrado.length > 0){
        return emailEncontrado[0];
    }else{
        return null
    }
}

// Función para guardar el arreglo de usuarios en el almacenamiento local
function guardarEnLS(usuarios){
    return localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

// Evento click del botón de registro
registrar.addEventListener('click',(e)=>{
    e.preventDefault();

    // Crear un nuevo objeto de usuario con los datos del formulario
    const nuevoUsuario = new Usuario(nombre.value, usuario.value, email.value, contraseña.value, maquinas = []);
    guardarUsuario(nuevoUsuario); // Llamar a la función para guardar el usuario
    
});

// Función para mostrar alertas personalizadas utilizando el framework SweetAlert
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

