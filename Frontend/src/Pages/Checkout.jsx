import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();          // clear items after purchase
    navigate("/success"); // redirect to success page
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Checkout</h2>
      <p>Total Items: {cart.length}</p>
      <p>
        Total Amount: ₹
        {cart.reduce((sum, item) => sum + item.price, 0)}
      </p>

      <button
        onClick={handleCheckout}
        style={{
          padding: "10px 20px",
          background: "#222",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          border: "none",
          marginTop: "20px",
        }}
      >
        Confirm Purchase
      </button>
    </div>
  );
}
