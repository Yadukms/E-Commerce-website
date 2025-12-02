import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 40px",
        backgroundColor: "#222",
        color: "white",
      }}
    >
      <h2>Community E-Commerce</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        
        {/* Show Logged-in Username */}
        {user && (
          <span 
            style={{
              fontWeight: "bold",
              background: "#444",
              padding: "6px 12px",
              borderRadius: "6px",
            }}
          >
            {user.name}
          </span>
        )}

        <Link to="/" style={{ color: "white" }}>Home</Link>

        {user ? (
          <>
            <Link to="/add" style={{ color: "white" }}>Add Product</Link>
            <button
              onClick={logout}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white" }}>Login</Link>
            <Link to="/register" style={{ color: "white" }}>Register</Link>
          </>
        )}

        <Link to="/cart" style={{ color: "white" }}>Cart</Link>
      </div>
    </nav>
  );
}
