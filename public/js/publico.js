const lblTicket1 = document.querySelector("#lblTicket1");
const lblEscritorio1 = document.querySelector("#lblEscritorio1");
const lblTicket2 = document.querySelector("#lblTicket2");
const lblEscritorio2 = document.querySelector("#lblEscritorio2");
const lblTicket3 = document.querySelector("#lblTicket3");
const lblEscritorio3 = document.querySelector("#lblEscritorio3");
const lblTicket4 = document.querySelector("#lblTicket4");
const lblEscritorio4 = document.querySelector("#lblEscritorio4");

const socket = io();

socket.on("estado-actual", (payload) => {

  const audio = new Audio('../audio/new-ticket.mp3')
  audio.play()


  // payload deberia ser un array que contenga los ultimos 4 tickets
  const [ticket1, ticket2, ticket3, ticket4] = payload;

  if (ticket1) {
    lblTicket1.innerText = "Ticket " + ticket1.numero;
    lblEscritorio1.innerText = ticket1.desk;
  } else {
    lblTicket1.innerText = "Esperando asignacion "
    lblEscritorio1.innerText = " "
  }
  if (ticket2) {
    lblTicket2.innerText = "Ticket " + ticket2.numero;
    lblEscritorio2.innerText = ticket2.desk;
  }else {
    lblTicket2.innerText = "Esperando asignacion "
    lblEscritorio2.innerText = " "
  }

  if (ticket3) {
    lblTicket3.innerText = "Ticket " + ticket3.numero;
    lblEscritorio3.innerText = ticket3.desk;
  }else {
    lblTicket3.innerText = "Esperando asignacion "
    lblEscritorio3.innerText = " "
  }

  if (ticket4) {
    lblTicket4.innerText = "Ticket " + ticket4.numero;
    lblEscritorio4.innerText = ticket4.desk;
  } else {
    lblTicket4.innerText = "Esperando asignacion "
    lblEscritorio4.innerText = " "
  }

});
