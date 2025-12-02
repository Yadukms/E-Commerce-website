const Product = require("../models/Product");

// ➕ Add a new product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, userRef: req.user.id });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error - Unable to create product" });
  }
};

// 📦 Get all products with search, category & price filters
exports.getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    const query = {};

    // 🔍 Search by title
    if (search) query.title = { $regex: search, $options: "i" };

    // 🧭 Filter by category
    if (category) query.category = category;

    // 💰 Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 🔎 Fetch and populate user info
    const products = await Product.find(query).populate("userRef", "name email");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error - Unable to fetch products" });
  }
};

// ✏️ Update a product (owner only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    if (product.userRef.toString() !== req.user.id)
      return res.status(403).json({ msg: "Unauthorized" });

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error - Unable to update product" });
  }
};

// ❌ Delete a product (owner only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    if (product.userRef.toString() !== req.user.id)
      return res.status(403).json({ msg: "Unauthorized" });

    await product.deleteOne();
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error - Unable to delete product" });
  }
};
