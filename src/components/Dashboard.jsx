import { useState } from 'react';
import OrderStats from './OrderStats';
import OrderFilter from './OrderFilter';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: 'Juan Pérez',
      date: '2025-10-01',
      status: 'pending',
      products: [
        { name: 'Laptop HP', quantity: 1, price: 750.00 },
        { name: 'Mouse Logitech', quantity: 2, price: 25.50 },
      ],
    },
    {
      id: 2,
      customer: 'María García',
      date: '2025-09-28',
      status: 'shipped',
      products: [
        { name: 'Teclado Mecánico', quantity: 1, price: 120.00 },
        { name: 'Monitor Samsung 24"', quantity: 1, price: 350.00 },
      ],
    },
    {
      id: 3,
      customer: 'Carlos López',
      date: '2025-09-25',
      status: 'delivered',
      products: [
        { name: 'Auriculares Sony', quantity: 1, price: 85.00 },
      ],
    },
    {
      id: 4,
      customer: 'Ana Martínez',
      date: '2025-10-02',
      status: 'pending',
      products: [
        { name: 'Webcam Logitech', quantity: 1, price: 95.00 },
        { name: 'Micrófono Blue Yeti', quantity: 1, price: 150.00 },
      ],
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleAddOrder = (newOrder) => {
    setOrders([newOrder, ...orders]);
    setShowForm(false);
    setSelectedStatus('all'); // Mostrar todos los pedidos después de agregar uno nuevo
  };

  // Filtrar pedidos según el estado seleccionado
  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📦 Sistema de Gestión de Pedidos - MailAméricas</h1>
        <p>Administra y visualiza todos tus pedidos de tiendas online</p>
      </header>

      <OrderStats orders={orders} />

      <div className="dashboard-actions">
        <button 
          className="btn-toggle-form"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '📋 Ver Pedidos' : '➕ Nuevo Pedido'}
        </button>
      </div>

      {showForm ? (
        <OrderForm onAddOrder={handleAddOrder} />
      ) : (
        <>
          <OrderFilter 
            selectedStatus={selectedStatus} 
            onStatusChange={handleStatusChange} 
          />
          
          <div className="orders-section">
            <h2>
              {selectedStatus === 'all' ? '📋 Todos los Pedidos' : 
               selectedStatus === 'pending' ? '⏳ Pedidos Pendientes' :
               selectedStatus === 'shipped' ? '🚚 Pedidos Enviados' :
               '✅ Pedidos Entregados'}
              <span className="count">({filteredOrders.length})</span>
            </h2>
            <OrderList orders={filteredOrders} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
