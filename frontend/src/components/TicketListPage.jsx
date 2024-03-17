import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TicketListPage() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/tickets');
            setTickets(response.data.tickets);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
        };

        fetchTickets();
    }, []);
    
  return (
    <div className="page">
      <h1>Lista de Tickets</h1>
      <table>
        <thead>
          <tr>
            <th>Número de Ticket</th>
            <th>Estado</th>
            <th>Creado en</th>
            <th>Actualizado en</th>
            <th>Email</th>
            <th>Descripción</th>
            <th>Tipo de Problema</th>
            <th>Prioridad del Problema</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.ticket_number}>
              <td>{ticket.ticket_number}</td>
              <td>{ticket.status}</td>
              <td>{ticket.createdAt}</td>
              <td>{ticket.updatedAt}</td>
              <td>{ticket.email}</td>
              <td>{ticket.description}</td>
              <td>{ticket.problemType}</td>
              <td>{ticket.problemPriority}</td>
              <td>
                <Link to={`/ticket/${ticket.ticket_number}`}>
                  Ver Detalles
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketListPage;
