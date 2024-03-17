import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TicketDetailPage() {
  const { ticketNumber } = useParams();
  const [ticket, setTicket] = useState(null);
//   const [agentId, setAgentId] = useState(null);
  const [comment, setComment] = useState('');
  const [notes, setNotes] = useState('');
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');


  const [editableFields, setEditableFields] = useState({
    status: false,
    problemType: false,
    problemPriority: false
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/api/tickets/${ticketNumber}`)
      .then(response => {
        setTicket(response.data.ticket);
        setSelectedAgent(response.data.ticket.assignedAgent);
      })
      .catch(error => {
        console.error('Error fetching ticket:', error);
      });

    axios.get('http://localhost:3001/api/users/agents')
      .then(response => {
        setAgents(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching agents:', error);
      });
  }, [ticketNumber]);

  const handleFieldChange = (field, value) => {
    setTicket(prevTicket => ({
      ...prevTicket,
      [field]: value
    }));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleUpdateTicket = () => {
    axios.put(`http://localhost:3000/api/tickets/${ticketNumber}/${selectedAgent}`, ticket)
      .then(response => {
        console.log('Ticket updated successfully:', response.data);
        // Aquí podrías mostrar un mensaje de éxito o realizar otras acciones después de la actualización
      })
      .catch(error => {
        console.error('Error updating ticket:', error);
        // Aquí podrías mostrar un mensaje de error o realizar otras acciones en caso de error
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes implementar la lógica para enviar el comentario y las notas al servidor
    // Por simplicidad, este ejemplo solo actualizará el estado local
    setComment('');
    setNotes('');
  };

  const handleAgentChange = (event) => {
    setSelectedAgent(event.target.value);
  };

  return (
    <div className="page">
      <h1>Detalles del Ticket {ticketNumber}</h1>
      {ticket ? (
        <div className="card">
          <p>Número de Ticket: {ticket.ticket_number}</p>
          <p>Nombre Completo: {ticket.name + ' ' + ticket.lastName}</p>
              <p>Email: {ticket.email}</p>
          {/* <p>Estado: {ticket.status}</p> */}
          <p>
            Estado: {editableFields.status ? (
              <select
                value={ticket.status}
                onChange={e => handleFieldChange('status', e.target.value)}
              >
                <option value="CREATED">Creado</option>
                <option value="ASSIGNED">Asignado</option>
                <option value="SOLVED">Resuelto</option>
                <option value="CANCELLED">Cancelado</option>
                <option value="DELETED">Eliminado</option>
                <option value="CLOSED">Cerrado</option>
              </select>
            ) : (
              <span>{ticket.status}</span>
            )}
          </p>
          <p>Creado en: {ticket.createdAt}</p>
          <p>Actualizado en: {ticket.updatedAt}</p>
          <p>Descripción: {ticket.description}</p>
          <p>
            Tipo de Problema: {editableFields.problemType ? (
              <select
                value={ticket.problemType}
                onChange={e => handleFieldChange('problemType', e.target.value)}
              >
                <option value="TECHNICAL">Técnico</option>
                <option value="BILLING">Facturación</option>
                <option value="OTHER">Otro</option>
              </select>
            ) : (
              <span>{ticket.problemType}</span>
            )}
          </p>
          <p>
            Prioridad del Problema: {editableFields.problemPriority ? (
              <select
                value={ticket.problemPriority}
                onChange={e => handleFieldChange('problemPriority', e.target.value)}
              >
                <option value="LOW">Baja</option>
                <option value="MID">Media</option>
                <option value="HIGH">Alta</option>
              </select>
            ) : (
              <span>{ticket.problemPriority}</span>
            )}
          </p>
          <label htmlFor="agentSelect">Seleccione Agente:</label>
          <select id="agentSelect" value={selectedAgent} onChange={handleAgentChange}>
            <option value="">Seleccione Agente</option>
            {agents.map(agent => (
              <option key={agent.uid} value={agent.uid}>{agent.name} {agent.lastName}</option>
            ))}
          </select>
          <br />
          <button onClick={() => setEditableFields({
            status: true,
            problemType: true,
            problemPriority: true
          })}>Editar</button>
          <button onClick={handleUpdateTicket}>Actualizar Ticket</button>

          <hr />

          {/* Agregar la sección de comentarios y notas */}
          <h2>Comentarios</h2>
          <form onSubmit={handleSubmit}>
            <textarea value={comment} onChange={handleCommentChange} placeholder="Agregar comentario" required />
            <button type="submit">Agregar Comentario</button>
          </form>
          <h2>Notas</h2>
          <textarea value={notes} onChange={handleNotesChange} placeholder="Agregar nota" required />
          <button type="submit">Agregar Nota</button>
          <hr />
          {/* Aquí puedes mostrar los comentarios y notas existentes */}
          <div>
            <h3>Comentarios existentes:</h3>
            {/* Agregar la lista de comentarios */}
          </div>
          <div>
            <h3>Notas existentes:</h3>
            {/* Agregar la lista de notas */}
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default TicketDetailPage;
