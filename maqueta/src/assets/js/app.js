'use strict'

const carousel    = document.querySelector('.carousel-locations')
const arrow     = document.querySelectorAll('.arrow-locations')

// Cuando CLICK en arrow
    // Saber la posición de ese arrow
    // Aplicar un transform translateX al grande
    // QUITAR la clase activo de TODOS arrows
    // AÑADIR la clase activo al arrow que hemos hecho CLICK

// Recorrer TODOS los arrow
arrow.forEach( ( cadaArrow , i )=> {
    // Asignamos un CLICK a cadaArrow
    arrow[i].addEventListener('click',()=>{

        // Guardar la posición de ese PUNTO
        let posicion  = i
        // Calculando el espacio que debe DESPLAZARSE el GRANDE
        let operacion = posicion * -16
        // MOVEMOS el grand
        carousel.style.transform = `translateX(${ operacion }%)`

       

    })
})