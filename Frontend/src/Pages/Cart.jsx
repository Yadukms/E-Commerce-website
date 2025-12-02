import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0)
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 20px',
          color: '#333',
        }}
      >
        <h2>Your cart is empty</h2>
        <Link
          to="/"
          style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 'bold',
            marginTop: '10px',
            display: 'inline-block',
            fontSize: '16px',
          }}
        >
          Go Shopping →
        </Link>
      </div>
    );

  return (
    <div
      style={{
        padding: '30px',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '26px',
          color: '#222',
          letterSpacing: '0.5px',
        }}
      >
        🛒 My Cart
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {cart.map(item => (
          <div
            key={item._id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              padding: '20px',
              gap: '20px',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.transform = 'scale(1.01)')
            }
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {/* 🖼️ Product Image */}
            <img
              src={item.image || 'https://via.placeholder.com/150'}
              alt={item.title}
              style={{
                width: '140px',
                height: '140px',
                objectFit: 'cover',
                borderRadius: '10px',
                flexShrink: 0,
              }}
            />

            {/* 🧾 Product Info */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontSize: '18px',
                    color: '#111',
                    fontWeight: '600',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    margin: '0 0 10px',
                    color: '#555',
                    fontSize: '15px',
                    lineHeight: '1.5',
                  }}
                >
                  {item.description || 'No description available.'}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: '#111',
                  }}
                >
                  ₹{item.price}
                </p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    backgroundColor: '#ff4d4f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: '0.3s',
                  }}
                  onMouseEnter={e =>
                    (e.target.style.backgroundColor = '#d9363e')
                  }
                  onMouseLeave={e =>
                    (e.target.style.backgroundColor = '#ff4d4f')
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 💰 Total + Checkout */}
      <div
        style={{
          textAlign: 'right',
          marginTop: '30px',
          background: '#f8f9fa',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <h3
          style={{
            fontSize: '20px',
            marginBottom: '15px',
            color: '#111',
          }}
        >
          Total: ₹{total}
        </h3>

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <button
            onClick={() => navigate('/checkout')}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 18px',
              fontSize: '15px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: '0.3s',
            }}
            onMouseEnter={e => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#007bff')}
          >
            Proceed to Checkout
          </button>

          <button
            onClick={clearCart}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 18px',
              fontSize: '15px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: '0.3s',
            }}
            onMouseEnter={e => (e.target.style.backgroundColor = '#5a6268')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#6c757d')}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
