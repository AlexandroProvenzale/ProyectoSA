import React, { useState } from 'react';
import axios from 'axios';

function CreateTicketPage() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    description: '',
    problemType: 'TECHNICAL',
    problemPriority: 'LOW'
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://abafbb93076ba42cbade067299603722-687425056.us-east-2.elb.amazonaws.com:3000/api/tickets', formData)
      .then(response => {
        console.log('Ticket creado exitosamente:', response.data);
        setSuccessMessage('¡El ticket se ha creado con éxito!');
        setFormData({
          name: '',
          lastName: '',
          email: '',
          description: '',
          problemType: 'TECHNICAL',
          problemPriority: 'LOW'
        });
      })
      .catch(error => {
        console.error('Error al crear ticket:', error);
        // Aquí podrías mostrar un mensaje de error o realizar otras acciones en caso de error
      });
  };

  return (
    <div className="page">
      <h1>Crear Ticket</h1>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        <label htmlFor="lastName">Apellido:</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        <label htmlFor="description">Descripción:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required></textarea>
        <label htmlFor="problemType">Tipo de Problema:</label>
        <select id="problemType" name="problemType" value={formData.problemType} onChange={handleInputChange} required>
          <option value="TECHNICAL">Técnico</option>
          <option value="BILLING">Facturación</option>
          <option value="OTHER">Otro</option>
        </select>
        <label htmlFor="problemPriority">Prioridad del Problema:</label>
        <select id="problemPriority" name="problemPriority" value={formData.problemPriority} onChange={handleInputChange} required>
          <option value="LOW">Baja</option>
          <option value="MID">Media</option>
          <option value="HIGH">Alta</option>
        </select>
        <button type="submit">Crear Ticket</button>
      </form>
    </div>
  );
}

export default CreateTicketPage;
