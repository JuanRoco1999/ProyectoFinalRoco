    // Objeto que almacena información sobre los productos
    const productos = {
        producto1: {
        nombre: 'Truemade',
        precio: '20000',
        descripcion: 'Proteína en polvo sabor chocolate: Este suplemento contiene 25 gramos de proteína por porción, ideal para aquellos que buscan una fuente rápida de proteína de alta calidad después del entrenamiento.',
        srcImg: './statics/suplmentos13.PNG'
        },
        producto2: {
        nombre: 'Whey protein 7900',
        precio: '15000',
        descripcion: 'Proteína en polvo sabor helado de vainilla: Este suplemento contiene 25 gramos de proteína por porción, ideal para aquellos que buscan una fuente rápida de proteína de alta calidad después del entrenamiento.',
        srcImg: './statics/suplementos14.PNG'
        },
        producto3: {
        nombre: 'Protein',
        precio: '18000',
        descripcion: 'Proteína en polvo sabor vainilla: Este suplemento contiene 25 gramos de proteína por porción, ideal para aquellos que buscan una fuente rápida de proteína de alta calidad después del entrenamiento.',
        srcImg: './statics/suplemento17.PNG'
        },
        producto4: {
        nombre: 'Whey protein',
        precio: '22000',
        descripcion: 'Proteína en polvo sabor cookie y crema: Este suplemento contiene 25 gramos de proteína por porción, ideal para aquellos que buscan una fuente rápida de proteína de alta calidad después del entrenamiento.',
        srcImg: './statics/suplemento8.PNG'
        },
        producto5: {
        nombre: 'Whey ptrotein',
        precio: '23000',
        descripcion: 'Proteína en polvo sabor frutilla Este suplemento contiene 453 gramos de proteína por porción, ideal para aquellos que buscan una fuente rápida de proteína de alta calidad después del entrenamiento.',
        srcImg: './statics/suplementos12.PNG'
        }
    }
    
    // Elementos de referencia del DOM
    const templateProd = document.getElementById('template-prod').content
    const contenedorProd = document.querySelector('.contenedor-productos')
    const fragment = document.createDocumentFragment()
    // Obtener el elemento del logo
    const logo = document.querySelector('.logo');

    // Evento clic en el logo para redirigir a la página de inicio
    logo.addEventListener("click", () => {
        window.location.href = "./home.html"; // Redirigir al usuario a la página de inicio
    });
    
    // Agregar
    // let usActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
    // Función para mostrar los productos en la página
    Object.values(productos).forEach( producto => {

        // Clonar el template y actualizar su contenido con la información del producto
        templateProd.querySelector('.div-info .nombre-prod').textContent = producto.nombre
        templateProd.querySelector('.div-precio-boton .precio').textContent = producto.precio
        templateProd.querySelector('.div-info .descripcion-prod').textContent = producto.descripcion
        templateProd.querySelector('.contenedor-img img').setAttribute('alt', producto.nombre)
        templateProd.querySelector('.contenedor-img img').setAttribute('src', producto.srcImg)
        const clone = templateProd.cloneNode(true)
        fragment.appendChild(clone)
    })

    // Agregar los productos al contenedor en el DOM
    contenedorProd.appendChild(fragment)
    
    // Inicialización del carrito de compras
    let carrito = {}
    const templateTabla = document.getElementById('agregar-producto-al-carro').content
    const tbodyCarrito = document.getElementById('carrito-body')
    const fragmentTabla = document.createDocumentFragment()
    const templateFoot = document.getElementById('tfooter').content
    const tfootCarrito = document.getElementById('footer')
    
    // Evento clic para agregar productos al carrito
    contenedorProd.addEventListener('click', e => {
        
        if(e.target.textContent === "Agregar") {
        setCarrito(e.target.parentElement.parentElement)
        }
        e.stopPropagation();
    })

    // Función para agregar un producto al carrito
    const setCarrito = e => {
        const pivoteCarrito = {
        nombre: e.querySelector('.div-info .nombre-prod').textContent,
        precio: e.querySelector('.div-precio-boton .precio').textContent,
        cantidad: 1
        }
        if(carrito.hasOwnProperty(pivoteCarrito.nombre)){
        carrito[pivoteCarrito.nombre].cantidad += 1
        } else {
        carrito[pivoteCarrito.nombre] = {...pivoteCarrito}
        }
        pintarTabla(carrito)
    }
    
    // Agregar 
    // let objetoCarrito = [];

    // Función para mostrar los productos en la tabla del carrito
    const pintarTabla = objetoCarrito => {
        Object.values(objetoCarrito).forEach( objeto => {
        const cloneTabla = templateTabla.cloneNode(true)
        cloneTabla.getElementById('producto').textContent = objeto.nombre
        cloneTabla.getElementById('cant').textContent = objeto.cantidad
        cloneTabla.getElementById('precio-uni').textContent = objeto.precio
        let precioTotal = parseFloat(objeto.precio) * objeto.cantidad
        cloneTabla.getElementById('precio-total-prod').textContent = precioTotal.toFixed(2)
        fragmentTabla.appendChild(cloneTabla)
        })
        tbodyCarrito.innerHTML = ''
        tbodyCarrito.appendChild(fragmentTabla)
        pintarFooter()
    }

    // Función para mostrar el footer con el total a pagar
    const pintarFooter = () => {
        tfootCarrito.innerHTML = ''
        if(Object.keys(carrito).length === 0) {
        tfootCarrito.innerHTML = '<tr><td colspan = 4>No agregaste ningun elemento</td></tr>'
        } else {
        const total = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + (cantidad * precio),0)
        templateFoot.getElementById('total-a-pagar').textContent = total.toFixed(2)
        const cloneFoot = templateFoot.cloneNode(true)
        fragment.appendChild(cloneFoot)
        tfootCarrito.appendChild(fragment)
        
        // Evento clic para vaciar el carrito
        const botonVaciar = document.getElementById('vaciar-tabla')
    botonVaciar.addEventListener('click', () => {
            carrito = {}
            pintarTabla(carrito)
            pintarFooter()
        })
        
        
        
        }
    }

    // Evento clic en el cuerpo de la tabla del carrito para aumentar o disminuir cantidad
    tbodyCarrito.addEventListener('click', e => {
        
        if(e.target.classList.contains('button')) {
        aumentarDisminuir(e.target)
        }
    })

    // Función para aumentar o disminuir la cantidad de un producto en el carrito
    const aumentarDisminuir = boton => {
        if(boton.textContent === '+'){
        const indicador = boton.parentElement.parentElement.firstElementChild.textContent
        Object.values(carrito).forEach( elemento => {
            if(elemento.nombre === indicador) {
            carrito[elemento.nombre].cantidad++  
            }
        })
        }
        if(boton.textContent === '-') {
        const indicador = boton.parentElement.parentElement.firstElementChild.textContent
        Object.values(carrito).forEach( elemento => {
            if(elemento.nombre === indicador) {
            carrito[elemento.nombre].cantidad--
            if(carrito[elemento.nombre].cantidad === 0) {
                delete carrito[elemento.nombre]
            }
            }
        })
        }
        pintarTabla(carrito)
        pintarFooter()
    }

    // Función para guardar el carrito en el usuario actual
    function guardarCarritoUsuarioActual(carrito) {
        const usuarioActual = obtenerUsuarioActual();
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioIndex = usuarios.findIndex(usuario => usuario.nombre === usuarioActual);
        if (usuarioIndex !== -1) {
            usuarios[usuarioIndex].carrito = carrito;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
    }

    // Función para obtener el nombre del usuario actual
    function obtenerUsuarioActual() {
        return usActual; 
    }