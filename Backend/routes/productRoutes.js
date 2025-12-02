const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Public route: Get products (search, category, price filters)
router.get("/", getProducts);

// Protected routes
router.post("/add", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
