import PropTypes from 'prop-types';
import OrderItem from './OrderItem';
import '../styles/OrderList.css';

const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="order-list-empty">
        <p>📦 No hay pedidos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

OrderList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      customer: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['pending', 'shipped', 'delivered']).isRequired,
      products: PropTypes.array.isRequired,
    })
  ).isRequired,
};

export default OrderList;
