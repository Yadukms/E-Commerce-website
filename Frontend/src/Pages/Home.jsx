import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch products with all filters applied
  const fetchProducts = async () => {
    try {
      const res = await api.get(
        `/products?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // Fetch products on initial load and whenever filters change
  useEffect(() => {
    fetchProducts();
  }, [search, category, minPrice, maxPrice]);

  return (
    <div style={{ padding: "20px" }}>
      {/* 🔍 Search and Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            flex: "1 1 200px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Sports">Sports</option>
          <option value="Books">Books</option>
          <option value="Beauty">Beauty</option>
        </select>

        {/* Price Filter */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{
            padding: "10px",
            width: "120px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{
            padding: "10px",
            width: "120px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        {/* Reset Filters Button */}
        <button
          onClick={() => {
            setSearch("");
            setCategory("");
            setMinPrice("");
            setMaxPrice("");
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      {/* 🧱 Product Grid */}
      {products.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((p) => (
            <ProductCard key={p._id} product={p} refreshProducts={fetchProducts} />
          ))}
        </div>
      )}
    </div>
  );
}
