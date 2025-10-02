import PropTypes from 'prop-types';
import '../styles/OrderStats.css';

const OrderStats = ({ orders }) => {
  const totalOrders = orders.length;
  
  const pendingCount = orders.filter(order => order.status === 'pending').length;
  const shippedCount = orders.filter(order => order.status === 'shipped').length;
  const deliveredCount = orders.filter(order => order.status === 'delivered').length;

  const stats = [
    { label: 'Total de Pedidos', value: totalOrders, icon: '📦', color: 'total' },
    { label: 'Pendientes', value: pendingCount, icon: '⏳', color: 'pending' },
    { label: 'Enviados', value: shippedCount, icon: '🚚', color: 'shipped' },
    { label: 'Entregados', value: deliveredCount, icon: '✅', color: 'delivered' },
  ];

  return (
    <div className="order-stats">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card stat-${stat.color}`}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-info">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

OrderStats.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['pending', 'shipped', 'delivered']).isRequired,
    })
  ).isRequired,
};

export default OrderStats;
