// Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('button')

const socket = io();



socket.on('connect', () => {
    // si esta conectado el boton queda habilitado

    btnCrear.disabled = false

});

socket.on('disconnect', () => {
    // si esta desconectado el boton queda inhabilitado

    btnCrear.disabled = true
});

socket.on('last-ticket', (last) => {
    lblNuevoTicket.innerText = 'Ticket ' + last
});





btnCrear.addEventListener( 'click', () => { 
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket
    });

});