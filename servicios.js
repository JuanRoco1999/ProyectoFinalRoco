const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu ul');

// Agregar evento clic al botón del menú hamburguesa
menuBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
});