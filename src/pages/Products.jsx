import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Product.css";

const Products = () => {
  // Products fetched from backend
  const [products, setProducts] = useState([]);

  // Loading state while API request is running
  const [loading, setLoading] = useState(true);

  // Selected category for filtering
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Cart state
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("veloraCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Fetch products from backend
  useEffect(() => {
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

    fetchProducts();
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("veloraCart", JSON.stringify(cart));
  }, [cart]);

  // Show loading message while products are being fetched
  if (loading) {
    return (
      <div className="products-loading">
        Loading products...
      </div>
    );
  }

  // Create categories dynamically from backend products
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      // If product already exists, increase quantity
      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // Otherwise add new product
      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Total items in cart
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="products-page">

      {/* Navbar */}
      <nav className="products-navbar">

        <Link to="/" className="products-logo">
          VELORA
        </Link>

        <div className="products-nav-links">
          <Link to="/">Home</Link>

          <Link to="/products" className="active">
            Shop
          </Link>

          <a href="#collections">Collections</a>

          <a href="#about">About</a>
        </div>

        <div className="products-nav-actions">

          <Link to="/login">
            Login
          </Link>

          <Link to="/signup" className="nav-signup">
            Sign Up
          </Link>

          <Link to="/cart" className="cart-button">
          Cart ({cartCount})
          </Link>

        </div>

      </nav>


      {/* Shop Header */}
      <section className="shop-header">

        <p className="shop-eyebrow">
          THE VELORA COLLECTION
        </p>

        <h1>
          Designed for
          <span> everyday living.</span>
        </h1>

        <p className="shop-description">
          Thoughtfully designed essentials that combine timeless style,
          comfort and everyday versatility.
        </p>

      </section>


      {/* Category Filter */}
      <section className="shop-controls">

        <div className="category-buttons">

          {categories.map((category) => (

            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-active"
                  : ""
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>

        <p className="product-count">
          {filteredProducts.length} Products
        </p>

      </section>


      {/* Product Grid */}
      <section className="product-grid">

        {filteredProducts.length === 0 ? (

          <div className="no-products">
            No products available.
          </div>

        ) : (

          filteredProducts.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

              {/* Product Image */}
              <div className="product-image-wrapper">

                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                <button
                  className="quick-add"
                  onClick={() =>
                    handleAddToCart(product)
                  }
                >
                  + Add to Cart
                </button>

              </div>


              {/* Product Information */}
              <div className="product-info">

                <div>

                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>
                    {product.name}
                  </h3>

                </div>

                <p className="product-price">
                  ₹
                  {Number(product.price).toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

            </div>

          ))

        )}

      </section>

    </div>
  );
};

export default Products;