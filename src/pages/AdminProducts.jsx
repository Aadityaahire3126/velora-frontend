import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminProducts.css";

const AdminProducts = () => {
  // Products received from backend
  const [products, setProducts] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

const [showAddForm, setShowAddForm] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  category: "",
  price: "",
  image: "",
});

const [showEditForm, setShowEditForm] = useState(false);

const [editingProductId, setEditingProductId] = useState(null);

const [editFormData, setEditFormData] = useState({
  name: "",
  category: "",
  price: "",
  image: "",
});



  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://velora-backend-34zo.onrender.com/api/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `https://velora-backend-34zo.onrender.com/api/products/${id}`
      );

      // Refresh products after deletion
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="admin-products-loading">
        Loading products...
      </div>
    );
  }

  // Open edit form with existing product data
const handleEditClick = (product) => {
  setEditingProductId(product.id);

  setEditFormData({
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
  });

  setShowEditForm(true);
};

const handleEditInputChange = (e) => {
  setEditFormData({
    ...editFormData,
    [e.target.name]: e.target.value,
  });
};

  const handleAddProduct = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.category ||
    !formData.price ||
    !formData.image
  ) {
    alert("Please fill all product fields.");
    return;
  }

  try {
    await axios.post(
      "https://velora-backend-34zo.onrender.com/api/products",
      {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        image: formData.image,
      }
    );

    // Refresh product list
    fetchProducts();

    // Clear form
    setFormData({
      name: "",
      category: "",
      price: "",
      image: "",
    });

    // Close form
    setShowAddForm(false);

    alert("Product added successfully!");
  } catch (error) {
    console.error("Error adding product:", error);
    alert(
      error.response?.data?.message ||
      "Unable to add product."
    );
  }
};


// Update existing product
const handleUpdateProduct = async (e) => {
  e.preventDefault();

  if (
    !editFormData.name ||
    !editFormData.category ||
    !editFormData.price ||
    !editFormData.image
  ) {
    alert("Please fill all product fields.");
    return;
  }

  try {
    await axios.put(
      `https://velora-backend-34zo.onrender.com/api/products/${editingProductId}`,
      {
        name: editFormData.name,
        category: editFormData.category,
        price: Number(editFormData.price),
        image: editFormData.image,
      }
    );

    // Refresh product list
    fetchProducts();

    // Close edit form
    setShowEditForm(false);

    // Reset editing product
    setEditingProductId(null);

    alert("Product updated successfully!");
  } catch (error) {
    console.error("Error updating product:", error);

    alert(
      error.response?.data?.message ||
      "Unable to update product."
    );
  }
};


{showEditForm && (
  <div className="add-product-form-card">

    <div className="form-card-header">
      <div>
        <h2>Edit Product</h2>
        <p>
          Update the selected product details.
        </p>
      </div>

      <button
        className="close-form-btn"
        onClick={() => setShowEditForm(false)}
      >
        ×
      </button>
    </div>

    <form onSubmit={handleUpdateProduct}>

      <div className="form-grid">

        <div className="form-group">
          <label>Product Name</label>

          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleEditInputChange}
            placeholder="Product name"
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <input
            type="text"
            name="category"
            value={editFormData.category}
            onChange={handleEditInputChange}
            placeholder="Category"
          />
        </div>

        <div className="form-group">
          <label>Price</label>

          <input
            type="number"
            name="price"
            value={editFormData.price}
            onChange={handleEditInputChange}
            placeholder="Price"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>

          <input
            type="text"
            name="image"
            value={editFormData.image}
            onChange={handleEditInputChange}
            placeholder="Image URL"
          />
        </div>

      </div>

      <div className="form-actions">

        <button
          type="button"
          className="cancel-form-btn"
          onClick={() => setShowEditForm(false)}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-product-btn"
        >
          Update Product
        </button>

      </div>

    </form>

  </div>
)}

  return (
    <div className="admin-products-page">

      {/* Header */}
      <div className="admin-products-header">
        {showAddForm && (
  <div className="add-product-form-card">

    <div className="form-card-header">
      <div>
        <h2>Add New Product</h2>
        <p>Add a new product to the VELORA catalog.</p>
      </div>

      <button
        className="close-form-btn"
        onClick={() => setShowAddForm(false)}
      >
        ×
      </button>
    </div>

    <form onSubmit={handleAddProduct}>

      <div className="form-grid">

        <div className="form-group">
          <label>Product Name</label>

          <input
            type="text"
            name="name"
            placeholder="e.g. Classic Denim Jacket"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <input
            type="text"
            name="category"
            placeholder="e.g. Jackets"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>

          <input
            type="number"
            name="price"
            placeholder="e.g. 2999"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>

          <input
            type="text"
            name="image"
            placeholder="https://..."
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>

      </div>

      <div className="form-actions">

        <button
          type="button"
          className="cancel-form-btn"
          onClick={() => setShowAddForm(false)}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-product-btn"
        >
          Add Product
        </button>

      </div>

    </form>

  </div>
)}
        <div>
          <p className="admin-products-label">
            INVENTORY MANAGEMENT
          </p>

          <h1>Products</h1>

          <p>
            Manage your VELORA product catalog.
          </p>
        </div>

        <button
  className="add-product-btn"
  onClick={() => setShowAddForm(!showAddForm)}
>
  + Add Product
</button>
      </div>

      {/* Product Stats */}
      <div className="product-management-stats">

        <div className="management-stat">
          <span>Total Products</span>
          <strong>{products.length}</strong>
        </div>

        <div className="management-stat">
          <span>Categories</span>
          <strong>
            {new Set(
              products.map((product) => product.category)
            ).size}
          </strong>
        </div>

        <div className="management-stat">
          <span>Average Price</span>
          <strong>
            ₹
            {products.length
              ? Math.round(
                  products.reduce(
                    (total, product) =>
                      total + Number(product.price),
                    0
                  ) / products.length
                ).toLocaleString("en-IN")
              : 0}
          </strong>
        </div>

      </div>

      {/* Product Table */}
      <div className="products-table-card">

        <div className="products-table-header">
          <div>
            <h2>All Products</h2>
            <p>
              {products.length} products in your catalog
            </p>
          </div>
        </div>

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (

                <tr key={product.id}>

                  {/* Product */}
                  <td>

                    <div className="admin-product-info">

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <div>
                        <strong>
                          {product.name}
                        </strong>

                        <span>
                          ID #{product.id}
                        </span>
                      </div>

                    </div>

                  </td>

                  {/* Category */}
                  <td>
                    <span className="category-badge">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td>
                    <strong>
                      ₹
                      {Number(
                        product.price
                      ).toLocaleString("en-IN")}
                    </strong>
                  </td>

                  {/* Status */}
                  <td>
                    <span className="status-badge">
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td>

                    <div className="product-actions">

                     <button
                        className="edit-btn"
                        onClick={() => handleEditClick(product)}>
                        Edit
                    </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(product.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminProducts;