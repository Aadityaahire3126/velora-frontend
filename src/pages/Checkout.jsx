import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart] = useState(() => {
    const savedCart = localStorage.getItem("veloraCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      setMessage("Please fill in all delivery details.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.post(
        "https://velora-backend-34zo.onrender.com/api/orders",
        {
          customerId: user?.id || 0,
          customerName: formData.fullName,
          items: cart,
        }
      );

      console.log("Order Response:", response.data);

      // Clear cart after successful order
      localStorage.removeItem("veloraCart");

      alert("Order placed successfully!");

      navigate("/products");
    } catch (error) {
      console.error("Order Error:", error);

      setMessage(
        error.response?.data?.message ||
        "Unable to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

      <nav className="checkout-navbar">
        <Link to="/" className="checkout-logo">
          VELORA
        </Link>

        <Link to="/cart">
          Back to Cart
        </Link>
      </nav>

      <section className="checkout-container">

        <div className="checkout-header">
          <p>VELORA CHECKOUT</p>
          <h1>Complete your order</h1>
        </div>

        <div className="checkout-layout">

          {/* Delivery Details */}
          <form
            className="checkout-form"
            onSubmit={handlePlaceOrder}
          >

            <h2>Delivery Details</h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
            />

            <div className="checkout-row">

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
              />

            </div>

            {message && (
              <p className="checkout-message">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="place-order-button"
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </form>

          {/* Order Summary */}
          <div className="checkout-summary">

            <h2>Order Summary</h2>

            {cart.map((item) => (

              <div
                className="checkout-product"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    {item.quantity} × ₹
                    {Number(item.price).toLocaleString("en-IN")}
                  </p>
                </div>

              </div>

            ))}

            <hr />

            <div className="summary-line">
              <span>Subtotal</span>
              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="summary-line">
              <span>Shipping</span>
              <span>
                ₹{shipping.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Checkout;