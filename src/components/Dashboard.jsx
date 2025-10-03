import { useState } from 'react';
import OrderStats from './OrderStats';
import OrderFilter from './OrderFilter';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import Pagination from './Pagination';
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
    {
      id: 5,
      customer: 'Pedro Rodríguez',
      date: '2025-09-30',
      status: 'shipped',
      products: [
        { name: 'SSD Samsung 1TB', quantity: 1, price: 180.00 },
      ],
    },
    {
      id: 6,
      customer: 'Laura Fernández',
      date: '2025-09-26',
      status: 'delivered',
      products: [
        { name: 'Impresora HP', quantity: 1, price: 250.00 },
        { name: 'Papel A4', quantity: 5, price: 8.00 },
      ],
    },
    {
      id: 7,
      customer: 'Roberto Silva',
      date: '2025-10-01',
      status: 'pending',
      products: [
        { name: 'Router TP-Link', quantity: 1, price: 75.00 },
      ],
    },
    {
      id: 8,
      customer: 'Carmen Díaz',
      date: '2025-09-29',
      status: 'shipped',
      products: [
        { name: 'Tablet Samsung', quantity: 1, price: 320.00 },
        { name: 'Funda protectora', quantity: 1, price: 25.00 },
      ],
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Resetear a la primera página al cambiar filtro
  };

  const handleAddOrder = (newOrder) => {
    setOrders([newOrder, ...orders]);
    setShowForm(false);
    setSelectedStatus('all');
    setCurrentPage(1);
  };

  // Filtrar pedidos según el estado seleccionado
  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  // Calcular paginación
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Sistema de Gestión de Pedidos</h1>
        <p>MailAméricas | Panel de Administración</p>
      </header>

      <OrderStats orders={orders} />

      <div className="dashboard-actions">
        <button 
          className="btn-toggle-form"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '← Volver a Pedidos' : '+ Nuevo Pedido'}
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
            <div className="orders-header">
              <h2>
                {selectedStatus === 'all' ? 'Todos los Pedidos' : 
                 selectedStatus === 'pending' ? 'Pedidos Pendientes' :
                 selectedStatus === 'shipped' ? 'Pedidos Enviados' :
                 'Pedidos Entregados'}
              </h2>
              <span className="orders-count">{filteredOrders.length} pedido{filteredOrders.length !== 1 ? 's' : ''}</span>
            </div>
            <OrderList orders={paginatedOrders} />
            
            {filteredOrders.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredOrders.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
