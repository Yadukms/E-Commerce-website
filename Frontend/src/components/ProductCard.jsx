import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function ProductCard({ product, refreshProducts }) {
  const { addToCart } = useContext(CartContext);
  const { token, user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image,
  });

  const handleDelete = async () => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Deleted successfully");
      refreshProducts();
    } catch (err) {
      alert(err.response?.data?.msg || "Delete failed");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${product._id}`, edited, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Updated successfully");
      setIsEditing(false);
      refreshProducts();
    } catch (err) {
      alert(err.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={edited.title}
            onChange={(e) => setEdited({ ...edited, title: e.target.value })}
            placeholder="Title"
            required
          />
          <input
            type="number"
            value={edited.price}
            onChange={(e) => setEdited({ ...edited, price: e.target.value })}
            placeholder="Price"
            required
          />
          <input
            type="text"
            value={edited.category}
            onChange={(e) => setEdited({ ...edited, category: e.target.value })}
            placeholder="Category"
          />
          <textarea
            value={edited.description}
            onChange={(e) =>
              setEdited({ ...edited, description: e.target.value })
            }
            placeholder="Description"
          />
          <input
            type="text"
            value={edited.image}
            onChange={(e) => setEdited({ ...edited, image: e.target.value })}
            placeholder="Image URL"
          />

          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          {/* Image */}
          <img
            src={product.image || "https://via.placeholder.com/150"}
            alt={product.title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          {/* Title */}
          <h3>{product.title}</h3>

          {/* Price */}
          <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
            ₹{product.price}
          </p>

          {/* Description */}
          <p
            style={{
              color: "#555",
              fontSize: "14px",
              marginTop: "8px",
              minHeight: "40px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description || "No description available"}
          </p>

          {/* Add to Cart */}
          <button
            onClick={() => {
              addToCart({
                _id: product._id,
                title: product.title,
                price: product.price,
                image: product.image,
                description:
                  product.description || "No description available",
                category: product.category,
              });
              alert("Item added to cart"); // ✔ ALERT ADDED HERE
            }}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            Add to Cart
          </button>

          {/* Edit / Delete */}
          {user && user._id === product.userRef?._id && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  marginLeft: "10px",
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Delete
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
