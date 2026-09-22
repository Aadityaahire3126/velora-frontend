import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://velora-backend-34zo.onrender.com/api/orders"
      );

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://velora-backend-34zo.onrender.com/api/orders/${id}`,
        { status }
      );

      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="admin-orders-loading">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-header">
        <div>
          <p className="admin-orders-eyebrow">
            VELORA ADMIN
          </p>

          <h1>Orders</h1>

          <p className="admin-orders-subtitle">
            Manage customer orders and update their delivery status.
          </p>
        </div>

        <div className="orders-count">
          <span>{orders.length}</span>
          <p>Total Orders</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No orders yet</h2>

          <p>
            Customer orders will appear here after checkout.
          </p>
        </div>
      ) : (
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  {/* ORDER ID */}
                  <td>
                    <strong>
                      #{String(order._id).slice(-6).toUpperCase()}
                    </strong>
                  </td>

                  {/* CUSTOMER */}
                  <td>
                    <div className="customer-info">
                      <strong>{order.customerName}</strong>

                      <span>
                        Customer ID: {order.customerId}
                      </span>
                    </div>
                  </td>

                  {/* ITEMS */}
                  <td>
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div
                          key={`${order._id}-${index}`}
                          className="order-item"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                          />

                          <div>
                            <strong>{item.name}</strong>

                            <span>
                              {item.quantity} × ₹
                              {Number(item.price).toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* TOTAL */}
                  <td>
                    <strong className="order-total">
                      ₹
                      {Number(
                        order.totalAmount
                      ).toLocaleString("en-IN")}
                    </strong>
                  </td>

                  {/* DATE */}
                  <td>
                    <span className="order-date">
                      {formatDate(order.createdAt)}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <select
                      className={`status-select status-${order.status.toLowerCase()}`}
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;