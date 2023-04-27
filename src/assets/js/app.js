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
        // MOVEMOS el grande
        carousel.style.transform = `translateX(${ operacion }%)`
    })
})

const carousel2    = document.querySelector('.carousel-opinions')
const arrow2    = document.querySelectorAll('.arrow-opinions')

// Recorrer TODOS los arrow
arrow2.forEach( ( cadaArrow2 , i )=> {
    // Asignamos un CLICK a cadaArrow2
    arrow2[i].addEventListener('click',()=>{

        // Guardar la posición de ese PUNTO
        let posicion  = i
        // Calculando el espacio que debe DESPLAZARSE el GRANDE
        let operacion = posicion * -30
        // MOVEMOS el grande
        carousel2.style.transform = `translateX(${ operacion }%)`
    })
})