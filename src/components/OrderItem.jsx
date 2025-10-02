import PropTypes from 'prop-types';
import '../styles/OrderItem.css';

const OrderItem = ({ order }) => {
  // Validaciones internas
  const validateOrder = (order) => {
    const errors = [];
    
    if (!order.customer || order.customer.length < 3) {
      errors.push('El nombre del cliente debe tener al menos 3 caracteres');
    }
    
    order.products.forEach((product, index) => {
      if (product.quantity <= 0) {
        errors.push(`El producto "${product.name}" debe tener cantidad mayor a 0`);
      }
    });
    
    return errors;
  };

  const errors = validateOrder(order);
  const hasErrors = errors.length > 0;

  // Calcular total del pedido
  const total = order.products.reduce((sum, product) => {
    return sum + (product.price * product.quantity);
  }, 0);

  return (
    <div className={`order-item ${hasErrors ? 'order-item-error' : ''}`}>
      <div className="order-header">
        <div className="order-id">
          <strong>Pedido #{order.id}</strong>
        </div>
        <div className={`order-status status-${order.status}`}>
          {order.status === 'pending' && '⏳ Pendiente'}
          {order.status === 'shipped' && '🚚 Enviado'}
          {order.status === 'delivered' && '✅ Entregado'}
        </div>
      </div>

      <div className="order-info">
        <div className="info-row">
          <span className="label">Cliente:</span>
          <span className="value">{order.customer}</span>
        </div>
        <div className="info-row">
          <span className="label">Fecha:</span>
          <span className="value">{new Date(order.date).toLocaleDateString('es-ES')}</span>
        </div>
      </div>

      {hasErrors && (
        <div className="order-errors">
          <strong>⚠️ Errores de validación:</strong>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="order-products">
        <strong>Productos:</strong>
        <table className="products-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product, index) => (
              <tr key={index} className={product.quantity <= 0 ? 'invalid-product' : ''}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right"><strong>Total:</strong></td>
              <td><strong>${total.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    customer: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['pending', 'shipped', 'delivered']).isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default OrderItem;
