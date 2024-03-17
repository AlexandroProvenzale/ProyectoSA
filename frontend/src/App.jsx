import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CreateTicketPage from './components/CreateTicketPage';
import TicketDetailPage from './components/TicketDetailPage';
import TicketListPage from './components/TicketListPage';
import './styles.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-ticket" element={<CreateTicketPage />} />
          <Route path="/ticket-list" element={<TicketListPage />} />
          <Route path="/ticket/:ticketNumber" element={<TicketDetailPage />} /> {/* Define la ruta con el parámetro ticketNumber */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
