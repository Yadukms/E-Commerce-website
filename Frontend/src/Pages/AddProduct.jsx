import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ CORRECT ROUTE: /products/add
      await api.post("/products/add", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/"); // redirect to home after adding
    } catch (err) {
      alert("Failed to add product");
      console.log("Backend error:", err.response?.data);
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: "30px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: 8,
        background: "white",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          required
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Category"
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
          required
          style={inputStyle}
        />

        <textarea
          placeholder="Product Description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          required
          style={{ ...inputStyle, height: 100 }}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "blue",
            color: "white",
            borderRadius: 6,
            marginTop: 10,
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: 12,
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 16,
};
