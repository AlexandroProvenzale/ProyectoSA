import React from 'react';

function HomePage() {
  return (
    <div className="page">
      <h1>Bienvenido al sistema de gestión de tickets</h1>
      <div className="card">
        <h2>Crear Ticket</h2>
        <p>Crear un nuevo ticket para reportar un problema o solicitar ayuda.</p>
        <h2>Lista de Tickets</h2>
        <p>Ver todos los tickets existentes y su estado actual.</p>
        <h2>Gestión de Tickets</h2>
        <p>Gestionar tickets existentes, actualizar su estado o detalles.</p>
      </div>
    </div>
  );
}

export default HomePage;
