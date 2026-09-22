import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("veloraCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("veloraCart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + change,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">

      <nav className="cart-navbar">
        <Link to="/" className="cart-logo">
          VELORA
        </Link>

        <div className="cart-nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
        </div>
      </nav>

      <section className="cart-container">

        <div className="cart-header">
          <p>YOUR SHOPPING BAG</p>
          <h1>Your Cart</h1>
        </div>

        {cart.length === 0 ? (

          <div className="empty-cart">
            <h2>Your cart is empty</h2>

            <p>
              Discover something you'll love from the VELORA collection.
            </p>

            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>

        ) : (

          <div className="cart-layout">

            {/* Cart Items */}
            <div className="cart-items">

              {cart.map((item) => (

                <div className="cart-item" key={item.id}>

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">

                    <p>{item.category}</p>

                    <h3>{item.name}</h3>

                    <strong>
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </strong>

                    <div className="quantity-controls">

                      <button
                        onClick={() =>
                          updateQuantity(item.id, -1)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, 1)
                        }
                      >
                        +
                      </button>

                    </div>

                    <button
                      className="remove-item"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* Order Summary */}
            <div className="cart-summary">

              <h2>Order Summary</h2>

              <div>
                <span>Subtotal</span>
                <span>
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div>
                <span>Shipping</span>
                <span>
                  ₹{shipping.toLocaleString("en-IN")}
                </span>
              </div>

              <hr />

              <div className="cart-total">
                <span>Total</span>
                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              <button
                className="checkout-button"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="continue-link"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        )}

      </section>

    </div>
  );
};

export default Cart;