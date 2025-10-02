import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/OrderForm.css';

const OrderForm = ({ onAddOrder }) => {
  const [customer, setCustomer] = useState('');
  const [products, setProducts] = useState([
    { name: '', quantity: 1, price: 0 }
  ]);
  const [errors, setErrors] = useState([]);

  const validateForm = () => {
    const newErrors = [];

    // Validar cliente (mínimo 3 caracteres)
    if (!customer || customer.trim().length < 3) {
      newErrors.push('El nombre del cliente debe tener al menos 3 caracteres');
    }

    // Validar que haya al menos un producto
    if (products.length === 0) {
      newErrors.push('Debe agregar al menos un producto');
    }

    // Validar cada producto
    products.forEach((product, index) => {
      if (!product.name || product.name.trim().length === 0) {
        newErrors.push(`El producto #${index + 1} debe tener un nombre`);
      }
      
      // Validar quantity > 0
      if (product.quantity <= 0) {
        newErrors.push(`El producto "${product.name || '#' + (index + 1)}" debe tener cantidad mayor a 0`);
      }

      if (product.price <= 0) {
        newErrors.push(`El producto "${product.name || '#' + (index + 1)}" debe tener un precio mayor a 0`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newOrder = {
        id: Date.now(),
        customer: customer.trim(),
        date: new Date().toISOString(), // Fecha actual por defecto
        status: 'pending', // Estado por defecto: pending
        products: products.map(p => ({
          name: p.name.trim(),
          quantity: parseInt(p.quantity),
          price: parseFloat(p.price),
        })),
      };

      onAddOrder(newOrder);
      
      // Limpiar formulario
      setCustomer('');
      setProducts([{ name: '', quantity: 1, price: 0 }]);
      setErrors([]);
    }
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([...products, { name: '', quantity: 1, price: 0 }]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      const newProducts = products.filter((_, i) => i !== index);
      setProducts(newProducts);
    }
  };

  return (
    <div className="order-form">
      <h2>➕ Nuevo Pedido</h2>
      
      {errors.length > 0 && (
        <div className="form-errors">
          <strong>⚠️ Errores de validación:</strong>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customer">Cliente (mín. 3 caracteres):</label>
          <input
            type="text"
            id="customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Nombre del cliente"
            className={errors.some(e => e.includes('cliente')) ? 'input-error' : ''}
          />
        </div>

        <div className="products-section">
          <h3>Productos</h3>
          {products.map((product, index) => (
            <div key={index} className="product-row">
              <div className="product-fields">
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                  className="product-name"
                />
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                  min="1"
                  className="product-quantity"
                />
                <input
                  type="number"
                  placeholder="Precio"
                  value={product.price}
                  onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                  min="0"
                  step="0.01"
                  className="product-price"
                />
                {products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="btn-remove-product"
                  >
                    ❌
                  </button>
                )}
              </div>
            </div>
          ))}
          <button type="button" onClick={addProduct} className="btn-add-product">
            ➕ Agregar Producto
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            💾 Crear Pedido
          </button>
        </div>

        <div className="form-info">
          <p><small>ℹ️ El pedido se creará con estado "pendiente" y fecha actual por defecto</small></p>
        </div>
      </form>
    </div>
  );
};

OrderForm.propTypes = {
  onAddOrder: PropTypes.func.isRequired,
};

export default OrderForm;
