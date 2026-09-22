import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(
    Array(12).fill(0)
  );

  const navigate = useNavigate();



  // PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products"
        );

        setTotalProducts(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // CUSTOMERS
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users"
        );

        const customers = response.data.filter(
          (user) => user.role === "customer"
        );

        setTotalCustomers(customers.length);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // ORDERS + REVENUE
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/orders"
        );

        const orderData = response.data;

        setOrders(orderData);
        setTotalOrders(orderData.length);

        // Total Revenue
        const revenue = orderData
          .filter((order) => order.status !== "Cancelled")
          .reduce(
            (total, order) =>
              total + Number(order.totalAmount || 0),
            0
          );

        setTotalRevenue(revenue);

        // Pending Orders
        const pending = orderData.filter(
          (order) => order.status === "Pending"
        ).length;

        setPendingOrders(pending);

        // Monthly Revenue
        const revenueByMonth = Array(12).fill(0);

        orderData.forEach((order) => {
          if (order.status === "Cancelled") return;

          const month = new Date(
            order.createdAt
          ).getMonth();

          revenueByMonth[month] += Number(
            order.totalAmount || 0
          );
        });

        setMonthlyRevenue(revenueByMonth);

      } catch (error) {
        console.error(
          "Error fetching orders:",
          error
        );
      }
    };

    fetchOrders();
  }, []);

  const formatCurrency = (amount) => {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          VELORA
        </div>

       <nav>
  <button
    className="active"
    onClick={() => navigate("/admin")}
  >
    Overview
  </button>

  <button
    onClick={() => navigate("/admin/products")}
  >
    Products
  </button>

  <button
    onClick={() => navigate("/admin/orders")}
  >
    Orders
  </button>

  <button
    onClick={() => navigate("/admin/analytics")}
  >
    Analytics
  </button>
</nav>

        <div className="admin-profile">
          <div className="profile-avatar">
            A
          </div>

          <div>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">

        <header className="admin-header">
          <div>
            <p className="admin-label">
              ADMIN PANEL
            </p>

            <h1>Dashboard</h1>

            <p>
              Welcome back, Admin. Here's what's
              happening with VELORA.
            </p>
          </div>

          <button className="view-store-btn">
            View Store →
          </button>
        </header>

        {/* Stats */}
        <section className="stats-grid">

          <div className="stat-card">
            <span>Total Products</span>

            <h2>{totalProducts}</h2>

            <p>Currently available</p>
          </div>

          <div className="stat-card">
            <span>Total Orders</span>

            <h2>{totalOrders}</h2>

            <p>
              {pendingOrders} pending orders
            </p>
          </div>

          <div className="stat-card">
            <span>Customers</span>

            <h2>{totalCustomers}</h2>

            <p>Registered customers</p>
          </div>

          <div className="stat-card">
            <span>Total Revenue</span>

            <h2>
              {formatCurrency(totalRevenue)}
            </h2>

            <p>
              Excluding cancelled orders
            </p>
          </div>

        </section>

        {/* Dashboard Content */}
        <section className="dashboard-grid">

          {/* Revenue Overview */}
          <div className="dashboard-card revenue-card">

            <div className="card-heading">
              <div>
                <h3>
                  Revenue Overview
                </h3>

                <p>
                  Monthly revenue performance
                </p>
              </div>

              <span className="revenue-value">
                {formatCurrency(totalRevenue)}
              </span>
            </div>

            <div className="revenue-chart">

              <div className="chart-bars">

                {monthlyRevenue.map(
                  (revenue, index) => {

                    const maxRevenue =
                      Math.max(
                        ...monthlyRevenue,
                        1
                      );

                    const height =
                      (revenue / maxRevenue) *
                      100;

                    return (
                      <div
                        className="chart-column"
                        key={monthNames[index]}
                      >

                        <div className="chart-tooltip">
                          {formatCurrency(
                            revenue
                          )}
                        </div>

                        <div
                          className="chart-bar"
                          style={{
                            height: `${Math.max(
                              height,
                              3
                            )}%`,
                          }}
                        ></div>

                        <span>
                          {monthNames[index]}
                        </span>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          </div>

          {/* Order Summary */}
          <div className="dashboard-card">

            <div className="card-heading">
              <div>
                <h3>
                  Order Summary
                </h3>

                <p>
                  Current order status
                </p>
              </div>
            </div>

            <div className="top-product">
              <span>01</span>

              <div>
                <strong>
                  Total Orders
                </strong>

                <small>
                  All customer orders
                </small>
              </div>

              <b>
                {totalOrders}
              </b>
            </div>

            <div className="top-product">
              <span>02</span>

              <div>
                <strong>
                  Pending
                </strong>

                <small>
                  Awaiting processing
                </small>
              </div>

              <b>
                {pendingOrders}
              </b>
            </div>

            <div className="top-product">
              <span>03</span>

              <div>
                <strong>
                  Delivered
                </strong>

                <small>
                  Successfully delivered
                </small>
              </div>

              <b>
                {
                  orders.filter(
                    (order) =>
                      order.status ===
                      "Delivered"
                  ).length
                }
              </b>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;