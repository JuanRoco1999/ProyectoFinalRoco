let misMaquinas = document.querySelector("#mis-maquinas"),
maquinasUs = document.querySelector("#maquinasUs");

let usActual = JSON.parse(localStorage.getItem('usuarioActual'));

function aggMaquina(nomUsuario){
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios'))
    const us = usuarios.find((usuario) => usuario.usuario === nomUsuario);
    const usMaquina = us.maquinas;

    
    for (const maquina of usMaquina) {
        const nuevaMaquina = document.createElement('div');
        nuevaMaquina.id = maquina.id;
        nuevaMaquina.classList.add('card');
        nuevaMaquina.innerHTML = `
            <img src="${maquina.imagen}" alt="">
            <h3>${maquina.nombre}</h3>
            <h5>${maquina.zona}</h5>
            <p>${maquina.descripcion}</p>
            <h4> Agregue los kilos correspondientes </h4>
            <div class="control">
                <button class="kg menos">-</button>
                <p class="contador">0</p>
                <button class="kg mas">+</button>
            </div>
            <button class="eliminar">Eliminar</button>`;
        
        misMaquinas.appendChild(nuevaMaquina);
    
        const btnMenos = nuevaMaquina.querySelector('.menos');
        const btnMas = nuevaMaquina.querySelector('.mas');
        const contador = nuevaMaquina.querySelector('.contador');
    
        let cantidad = 0;
    
        btnMenos.addEventListener('click', () => {
            if (cantidad > 0) {
                cantidad--;
                contador.innerHTML = cantidad;
            }
        });
    
        btnMas.addEventListener('click', () => {
            cantidad++;
            contador.innerHTML = cantidad;
        });

        const btnEliminar = nuevaMaquina.querySelector('.eliminar');
        btnEliminar.addEventListener('click', () => {
            
            nuevaMaquina.remove();
            const indice = usMaquina.findIndex((el)=>{
                return el.id === maquina.id;
            })
            usMaquina.splice(indice,1);
            localStorage.setItem('usuarios',JSON.stringify(usuarios));
        });
    }
}

aggMaquina(usActual)


