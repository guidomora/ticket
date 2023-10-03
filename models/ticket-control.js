const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(numero, desk) {
    this.numero = numero;
    this.desk = desk;
  }
}

class TicketControl {
  constructor() {
    this.last = 0; // ultimo ticket que estoy atendiendo
    this.today = new Date().getDate();
    this.tickets = [];
    this.last4 = [];
    this.init();
  }

  get toJson() {
    // genera el siguiente objeto
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      last4: this.last4,
    };
  }

  init() {
    const { today, last, last4, tickets } = require("../db/data.json");
    // evaluar si today es igual al dia actual
    if (today === this.today) {
      this.tickets = tickets;
      this.last = last;
      this.last4 = last4;
    } else {
      // es otro dia
      this.saveDB();
    }
  }

  saveDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null); // si tiene null es pq nadie esta trabajando el ticket
    this.tickets.push(ticket); // se podria escribir asi tambien this.tickets.push(new Ticket(this.last, null))

    this.saveDB();
    return "Ticket " + ticket.numero;
  }

  serveTicket(desk) {
    // no tenemos tickets
    if (this.tickets.length === 0) {
      return null;
    }

    // si tenemos algun ticket y estamos recibiendo el desk
    const ticket = this.tickets.shift(); // siempre extraemos el primero puede ser asi tambien this.tickets[0]

    ticket.desk = desk;

    this.last4.unshift(ticket);

    if (this.last4.length > 4) {
      this.last4.splice(-1, 1); // empieza en la ultima posicion del array (-1) y corta 1
    }

    this.saveDB();

    return ticket;
  }
}

module.exports = TicketControl;
