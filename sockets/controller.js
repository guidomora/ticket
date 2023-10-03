const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl(); // crea una nueva instancia y dispara el constructor

const socketController = (socket) => {
  socket.emit("last-ticket", ticketControl.last);
  socket.emit("estado-actual", ticketControl.last4);

  socket.on("next-ticket", (payload, callback) => {
    const next = ticketControl.next();
    callback(next);

    // notificar que hay un nuevo ticket pendiente
  });

  // esuchamos el evento de atender ticket
  socket.on("atender-ticket", ({ desk }, callback) => {
    if (!desk) {
      return callback({
        ok: false,
        msg: "El escritorio es obligatorio",
      });
    }
    // ticket que tengo que atender
    const ticket = ticketControl.serveTicket(desk);

    socket.broadcast.emit("estado-actual", ticketControl.last4);
    if (!ticket) {
      callback({
        ok: false,
        msg: "Ya no hay tickets pendientes",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};