import React, { useState } from 'react';
import styles from './NewTicket.module.css';
import axios from 'axios';

const NewTicket = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/tickets', {
        name,
        email,
        phone,
        description,
        type,
        priority,
      });
      setTickets([...tickets, response.data]);
      setName('');
      setEmail('');
      setPhone('');
      setDescription('');
      setType('');
      setPriority('');
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Crear un nuevo ticket</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor="name">
            Nombre y apellidos
          </label>
        </div>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor="email">
            Correo electrónico
          </label>
        </div>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor="phone">
            Número de teléfono
          </label>
        </div>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor="description">
            Descripción del problema
          </label>
        </div>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor="type">
            Tipo de problema
          </label>
        </div>
        <select
          id="type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="">-- Seleccione --</option>
          <option value="TECHNICAL">Técnico</option>
          <option value="BILLING">Facturación</option>
          <option value="OTHER">Otro</option>
        </select>
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor="priority">
            Prioridad
          </label>
        </div>
        <select
          id="priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="">-- Seleccione --</option>
          <option value="LOW">Baja</option>
          <option value="MID">Media</option>
          <option value="HIGH">Alta</option>
        </select>
        <div className={styles.formContainer}>
          <button type="submit">Crear ticket</button>
        </div>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default NewTicket;