import PropTypes from 'prop-types';
import '../styles/OrderFilter.css';

const OrderFilter = ({ selectedStatus, onStatusChange }) => {
  const statuses = [
    { value: 'all', label: '📋 Todos' },
    { value: 'pending', label: '⏳ Pendientes' },
    { value: 'shipped', label: '🚚 Enviados' },
    { value: 'delivered', label: '✅ Entregados' },
  ];

  return (
    <div className="order-filter">
      <label htmlFor="status-filter" className="filter-label">
        Filtrar por estado:
      </label>
      <div className="filter-buttons">
        {statuses.map((status) => (
          <button
            key={status.value}
            className={`filter-button ${selectedStatus === status.value ? 'active' : ''}`}
            onClick={() => onStatusChange(status.value)}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
};

OrderFilter.propTypes = {
  selectedStatus: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default OrderFilter;
