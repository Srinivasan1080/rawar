const API_URL = 'http://localhost:5000/api';

async function loadProducts() {
  const res = await fetch(`${API_URL}/products`);
  const products = await res.json();
  const productsDiv = document.getElementById('products');
  const productSelect = document.getElementById('productSelect');
  productsDiv.innerHTML = '';
  productSelect.innerHTML = '';
  products.forEach(p => {
    productsDiv.innerHTML += `
      <div class="product">
        <strong>${p.name}</strong> (₹${p.price}/kg) - Supplier: ${p.supplier} | ⭐${p.rating}
      </div>
    `;
    productSelect.innerHTML += `<option value="${p.id}">${p.name}</option>`;
  });
}

async function loadOrders() {
  const res = await fetch(`${API_URL}/orders`);
  const orders = await res.json();
  const ordersUl = document.getElementById('orders');
  ordersUl.innerHTML = '';
  orders.forEach(o => {
    ordersUl.innerHTML += `<li>Vendor: ${o.vendorName}, Product ID: ${o.productId}, Qty: ${o.quantity}, Status: ${o.status}</li>`;
  });
}

document.getElementById('orderForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const vendorName = document.getElementById('vendorName').value;
  const quantity = document.getElementById('quantity').value;
  const productId = document.getElementById('productSelect').value;
  await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vendorName, quantity, productId: Number(productId) })
  });
  loadOrders();
  e.target.reset();
});

loadProducts();
loadOrders();