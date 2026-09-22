import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="navbar-left">
          <a href="/" className="brand">
            VELORA
          </a>
        </div>

        <nav className="nav-menu">
          <a href="/">Home</a>
         <a href="/products">Shop</a>
        <a href="/products">Collections</a>
        <a href="/about">About</a>
        </nav>

        <div className="navbar-actions">
          <a href="/login" className="login-link">
            Login
          </a>
           <a href="/signup" className="signup-link">
            Sign Up
            </a>

          <a href="/cart" className="cart-link">
            Cart <span>0</span>
          </a>
        </div>
      </header>


      {/* ================= HERO ================= */}
      <main>

        <section className="hero-section">

          <div className="hero-content">

            <p className="hero-label">
              THE NEW COLLECTION — 2026
            </p>

            <h1>
              Made for your
              <br />
              <span>everyday.</span>
            </h1>

            <p className="hero-text">
              Discover modern essentials designed to bring comfort,
              confidence and effortless style to your everyday life.
            </p>

            <div className="hero-buttons">

              <a href="/products" className="btn-primary">
                Shop Collection
                <span>→</span>
              </a>

              <a href="/products" className="btn-secondary">
                Explore Products
              </a>

            </div>

            <div className="hero-numbers">

              <div>
                <strong>500+</strong>
                <p>Products</p>
              </div>

              <div>
                <strong>10K+</strong>
                <p>Customers</p>
              </div>

              <div>
                <strong>4.8/5</strong>
                <p>Rating</p>
              </div>

            </div>

          </div>


          <div className="hero-visual">

            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
              alt="Velora fashion collection"
            />

            <div className="hero-floating-card">

              <div className="floating-number">
                01
              </div>

              <div>
                <p>Featured Collection</p>
                <strong>New Season Essentials</strong>
              </div>

              <span>↗</span>

            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section className="feature-section">

          <div className="feature-item">
            <div className="feature-symbol">✦</div>

            <div>
              <h3>Premium Quality</h3>
              <p>Carefully selected products</p>
            </div>
          </div>


          <div className="feature-item">
            <div className="feature-symbol">✓</div>

            <div>
              <h3>Secure Checkout</h3>
              <p>Safe & protected payments</p>
            </div>
          </div>


          <div className="feature-item">
            <div className="feature-symbol">↗</div>

            <div>
              <h3>Fast Delivery</h3>
              <p>Quick delivery at your doorstep</p>
            </div>
          </div>


          <div className="feature-item">
            <div className="feature-symbol">♡</div>

            <div>
              <h3>Easy Returns</h3>
              <p>Simple & hassle-free returns</p>
            </div>
          </div>

        </section>


        {/* ================= CATEGORIES ================= */}

        <section className="categories-section">

          <div className="section-top">

            <div>
              <p className="section-label">
                EXPLORE
              </p>

              <h2>
                Shop by category
              </h2>
            </div>

            <a href="/products" className="view-all">
              View all →
            </a>

          </div>


          <div className="category-grid">

            <a href="/products?category=clothing" className="category-card">

              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85"
                alt="Clothing"
              />

              <div className="category-content">
                <p>01</p>
                <h3>Clothing</h3>
                <span>Explore →</span>
              </div>

            </a>


            <a href="/products?category=footwear" className="category-card">

              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"
                alt="Footwear"
              />

              <div className="category-content">
                <p>02</p>
                <h3>Footwear</h3>
                <span>Explore →</span>
              </div>

            </a>


            <a href="/products?category=accessories" className="category-card">

              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85"
                alt="Accessories"
              />

              <div className="category-content">
                <p>03</p>
                <h3>Accessories</h3>
                <span>Explore →</span>
              </div>

            </a>

          </div>

        </section>


        {/* ================= ABOUT / STATEMENT ================= */}

        <section className="statement-section">

          <div className="statement-image">

            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=85"
              alt="Velora collection"
            />

          </div>


          <div className="statement-content">

            <p className="section-label">
              OUR PHILOSOPHY
            </p>

            <h2>
              Less noise.
              <br />
              More <span>you.</span>
            </h2>

            <p>
              At VELORA, we believe great style doesn't need to be
              complicated. Our collections bring together timeless
              design, everyday comfort and thoughtful details.
            </p>

            <a href="/about" className="text-link">
              Discover our story →
            </a>

          </div>

        </section>


        {/* ================= NEW ARRIVALS ================= */}

        <section className="arrivals-section">

          <div className="section-top">

            <div>
              <p className="section-label">
                JUST IN
              </p>

              <h2>
                New arrivals
              </h2>
            </div>

            <a href="/products" className="view-all">
              Shop all →
            </a>

          </div>


          <div className="product-preview-grid">

            <div className="product-preview">

              <div className="product-image">
                <span className="product-badge">
                  NEW
                </span>

                <img
                  src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=700&q=85"
                  alt="Minimal shirt"
                />
              </div>

              <div className="product-info">
                <div>
                  <h3>Essential Overshirt</h3>
                  <p>Relaxed Fit</p>
                </div>

                <strong>₹1,899</strong>
              </div>

            </div>


            <div className="product-preview">

              <div className="product-image">
                <img
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85"
                  alt="Classic outfit"
                />
              </div>

              <div className="product-info">
                <div>
                  <h3>Everyday Dress</h3>
                  <p>Classic Collection</p>
                </div>

                <strong>₹2,499</strong>
              </div>

            </div>


            <div className="product-preview">

              <div className="product-image">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"
                  alt="Basic t-shirt"
                />
              </div>

              <div className="product-info">
                <div>
                  <h3>Classic Tee</h3>
                  <p>Everyday Essential</p>
                </div>

                <strong>₹899</strong>
              </div>

            </div>


            <div className="product-preview">

              <div className="product-image">
                <img
                  src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85"
                  alt="Denim jacket"
                />
              </div>

              <div className="product-info">
                <div>
                  <h3>Denim Jacket</h3>
                  <p>Modern Fit</p>
                </div>

                <strong>₹2,299</strong>
              </div>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="cta-section">

          <div className="cta-content">

            <p className="section-label">
              VELORA EDIT
            </p>

            <h2>
              Find something
              <br />
              that feels <em>like you.</em>
            </h2>

            <a href="/products" className="btn-primary">
              Start Shopping
              <span>→</span>
            </a>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-main">

          <div className="footer-brand">

            <h2>VELORA</h2>

            <p>
              Modern essentials designed for
              everyday living.
            </p>

          </div>


          <div className="footer-column">

            <h4>Shop</h4>

            <a href="/products">All Products</a>
            <a href="/products">New Arrivals</a>
            <a href="/products">Clothing</a>
            <a href="/products">Footwear</a>

          </div>


          <div className="footer-column">

            <h4>Company</h4>

            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms</a>

          </div>


          <div className="footer-column">

            <h4>Account</h4>

            <a href="/login">Login</a>
            <a href="/signup">Create Account</a>
            <a href="/orders">My Orders</a>
            <a href="/cart">Shopping Cart</a>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © 2026 VELORA. All rights reserved.
          </p>

          <p>
            Designed for everyday.
          </p>

        </div>

      </footer>

    </div>
  );
};

export default Home;