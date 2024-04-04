const nombre = document.querySelector('#nombre'),
usuario = document.querySelector('#usuario'),
email = document.querySelector('#email'),
contraseña = document.querySelector('#contraseña'),
registrar = document.querySelector('#registrar'),
inputs = document.querySelectorAll('input');

let usuarios;

if(localStorage.getItem('usuarios')){
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
}else{
    usuarios = [];
}

class Usuario{
    constructor(nombre, usuario, email, contraseña, maquinas){
        this.nombre = nombre;
        this.usuario = usuario;
        this.email = email;
        this.contraseña = contraseña;
        this.maquinas = maquinas;
    }
}

// Logica para detectar si el usuario ya existe y si el mail ya esta registrado 
// FALTA QUE SE REINICIEN LOS INPUTS SI EL PROECSO DE REGISTRO FUE EXITOSO
let usuarioEncontrado;
let emailEncontrado;

function guardarUsuario(usuario) {
    const usuarioEncontrado = buscarUsuario(usuarios, usuario.usuario);
    const emailEncontrado = buscarEmail(usuarios, usuario.email);
    

    if(usuario.nombre !== '' && usuario.usuario !== '' && usuario.email !== '' && usuario.contraseña !== '') {
        if (usuarioEncontrado || emailEncontrado) { // Operadores OR y AND
            usuarioEncontrado && sweetAlert('El usuario ya existe', 'error');
            emailEncontrado && sweetAlert('El email ya existe', 'error');
        } else {
            usuarios.push(usuario);
            guardarEnLS(usuarios);
            let nombreAlerta = usuario.nombre + " ha sido registrado exitosamente";
            sweetAlert(nombreAlerta,'success');
            setTimeout(()=>{
                window.location.href = "./inicio.html";
            },1100)
        }
        return usuarios;
    }   else {
        sweetAlert('Necesita completar todos los campos',"error")
        }
    }


function buscarUsuario(arr, filtroUsuario){
    usuarioEncontrado = arr.filter(usuario => usuario.usuario === filtroUsuario);
    if(usuarioEncontrado.length > 0){
        return usuarioEncontrado[0];
    }else{
        return null
    }
}

function buscarEmail(arr, filtroEmail){
    emailEncontrado = arr.filter(usuario => usuario.email === filtroEmail);
    if(emailEncontrado.length > 0){
        return emailEncontrado[0];
    }else{
        return null
    }
}

function guardarEnLS(usuarios){
    return localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

registrar.addEventListener('click',(e)=>{
    e.preventDefault();
    const nuevoUsuario = new Usuario(nombre.value, usuario.value, email.value, contraseña.value, maquinas = []);
    guardarUsuario(nuevoUsuario);
    
});



// -- fin de Logica para detectar si el usuario ya existe y si el mail ya esta registrado 


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

