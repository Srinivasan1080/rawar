const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Simulated in-memory data
let products = [
  { id: 1, name: "Potatoes", price: 20, supplier: "FreshFarms", rating: 4.8 },
  { id: 2, name: "Tomatoes", price: 30, supplier: "VeggieMart", rating: 4.3 }
];
let orders = [];

app.use(cors());
app.use(express.json());

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Place an order
app.post('/api/orders', (req, res) => {
  const { productId, vendorName, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });
  const order = { id: orders.length+1, productId, vendorName, quantity, status: "Pending" };
  orders.push(order);
  res.json(order);
});

// Get all orders (for simplicity)
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});