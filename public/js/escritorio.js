// referencias HTML
const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlert = document.querySelector('.alert')
const lblPendientes =document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search) // leer los parametros de la URL

if (!searchParams.has('escritorio')) { // si no tiene la palabra escritorio en los parametros
    window.location = 'index.html' // te devuelve al index y arroja un error
    throw new Error('El escritorio es obligatorio')
}

const desk = searchParams.get('escritorio')
lblEscritorio.innerText = desk
divAlert.style.display = 'none'

const socket = io();



socket.on('connect', () => {
    // si esta conectado el boton queda habilitado

    btnAtender.disabled = false

});

socket.on('disconnect', () => {
    // si esta desconectado el boton queda inhabilitado

    btnAtender.disabled = true
});

socket.on('tickets-pendientes', (pendientes) => { // recibimos los tickets pendientes
    if ( pendientes === 0 ) {
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;
    }
})



btnAtender.addEventListener( 'click', () => { 
    // Le pedimos al backend que este escuchando un evento, necesitamos info
    
    socket.emit('atender-ticket', {desk}, ({ok, ticket}) => {
        if (!ok) {
            lblTicket.innerText = 'Nadie '
            return divAlert.style.display = ''
        }

        lblTicket.innerText = 'Ticket ' + ticket.numero
    })
});