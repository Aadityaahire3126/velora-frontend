import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Analytics.css";

const Analytics = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [monthlyRevenue, setMonthlyRevenue] = useState(
    Array(12).fill(0)
  );

  const [categorySales, setCategorySales] = useState({});

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [ordersRes, productsRes, usersRes] =
          await Promise.all([
            axios.get("http://localhost:5000/api/orders"),
            axios.get("http://localhost:5000/api/products"),
            axios.get("http://localhost:5000/api/users"),
          ]);

        const orderData = ordersRes.data;
        const productData = productsRes.data;
        const userData = usersRes.data;

        setOrders(orderData);
        setProducts(productData);

        const customerUsers = userData.filter(
          (user) => user.role === "customer"
        );

        setCustomers(customerUsers);

        /* =========================
           MONTHLY REVENUE
        ========================= */

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

        /* =========================
           CATEGORY SALES
        ========================= */

        const salesByCategory = {};

        orderData.forEach((order) => {
          if (order.status === "Cancelled") return;

          order.items.forEach((item) => {
            const category =
              item.category || "Other";

            const quantity =
              Number(item.quantity) || 0;

            salesByCategory[category] =
              (salesByCategory[category] || 0) +
              quantity;
          });
        });

        setCategorySales(salesByCategory);

      } catch (error) {
        console.error(
          "Error fetching analytics data:",
          error
        );
      }
    };

    fetchAnalyticsData();
  }, []);

  /* =========================
     CALCULATIONS
  ========================= */

  const validOrders = orders.filter(
    (order) => order.status !== "Cancelled"
  );

  const totalRevenue = validOrders.reduce(
    (total, order) =>
      total + Number(order.totalAmount || 0),
    0
  );

  const averageOrderValue =
    validOrders.length > 0
      ? totalRevenue / validOrders.length
      : 0;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const totalItemsSold = Object.values(
    categorySales
  ).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const formatCurrency = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN")}`;

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
    <div className="analytics-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="analytics-header">
        <div>
          <p className="analytics-eyebrow">
            VELORA ADMIN
          </p>

          <h1>Analytics</h1>

          <p>
            Track sales, orders and customer activity.
          </p>
        </div>

        <div className="analytics-date">
          Live Data
        </div>
      </div>

      {/* =========================
          STATS
      ========================= */}

      <section className="analytics-stats">

        <div className="analytics-stat-card">
          <span>Total Revenue</span>

          <h2>
            {formatCurrency(totalRevenue)}
          </h2>

          <p>
            Excluding cancelled orders
          </p>
        </div>

        <div className="analytics-stat-card">
          <span>Total Orders</span>

          <h2>
            {orders.length}
          </h2>

          <p>
            All customer orders
          </p>
        </div>

        <div className="analytics-stat-card">
          <span>Average Order Value</span>

          <h2>
            {formatCurrency(averageOrderValue)}
          </h2>

          <p>
            Per valid order
          </p>
        </div>

        <div className="analytics-stat-card">
          <span>Items Sold</span>

          <h2>
            {totalItemsSold}
          </h2>

          <p>
            Across all categories
          </p>
        </div>

      </section>

      {/* =========================
          CHARTS
      ========================= */}

      <section className="analytics-chart-grid">

        {/* MONTHLY REVENUE */}

        <div className="analytics-card analytics-revenue-card">

          <div className="analytics-card-header">
            <div>
              <h3>Monthly Revenue</h3>

              <p>
                Revenue generated throughout the year
              </p>
            </div>

            <strong>
              {formatCurrency(totalRevenue)}
            </strong>
          </div>

          <div className="analytics-revenue-chart">

            <div className="analytics-chart-bars">

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
                      className="analytics-chart-column"
                      key={monthNames[index]}
                    >

                      <div className="analytics-chart-tooltip">
                        {formatCurrency(revenue)}
                      </div>

                      <div
                        className="analytics-chart-bar"
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

        {/* CATEGORY SALES */}

        <div className="analytics-card">

          <div className="analytics-card-header">
            <div>
              <h3>Sales by Category</h3>

              <p>
                Number of items sold by category
              </p>
            </div>
          </div>

          <div className="category-sales">

            {Object.keys(categorySales).length === 0 ? (
              <div className="analytics-empty">
                No sales data available yet.
              </div>
            ) : (
              Object.entries(categorySales)
                .sort(
                  (a, b) => b[1] - a[1]
                )
                .map(
                  ([category, quantity]) => {

                    const maxCategorySales =
                      Math.max(
                        ...Object.values(
                          categorySales
                        ),
                        1
                      );

                    const width =
                      (quantity /
                        maxCategorySales) *
                      100;

                    return (
                      <div
                        className="category-row"
                        key={category}
                      >

                        <div className="category-info">
                          <strong>
                            {category}
                          </strong>

                          <span>
                            {quantity} items
                          </span>
                        </div>

                        <div className="category-progress">
                          <div
                            className="category-progress-fill"
                            style={{
                              width: `${width}%`,
                            }}
                          ></div>
                        </div>

                      </div>
                    );
                  }
                )
            )}

          </div>

        </div>

      </section>

      {/* =========================
          ORDER STATUS + STORE
      ========================= */}

      <section className="analytics-grid">

        {/* ORDER STATUS */}

        <div className="analytics-card">

          <div className="analytics-card-header">
            <div>
              <h3>Order Status</h3>

              <p>
                Current order distribution
              </p>
            </div>
          </div>

          <div className="status-list">

            <div className="status-row">
              <span className="status-dot pending"></span>

              <div>
                <strong>Pending</strong>
                <small>
                  Awaiting processing
                </small>
              </div>

              <b>
                {pendingOrders}
              </b>
            </div>

            <div className="status-row">
              <span className="status-dot shipped"></span>

              <div>
                <strong>Shipped</strong>
                <small>
                  Currently on the way
                </small>
              </div>

              <b>
                {shippedOrders}
              </b>
            </div>

            <div className="status-row">
              <span className="status-dot delivered"></span>

              <div>
                <strong>Delivered</strong>
                <small>
                  Successfully delivered
                </small>
              </div>

              <b>
                {deliveredOrders}
              </b>
            </div>

            <div className="status-row">
              <span className="status-dot cancelled"></span>

              <div>
                <strong>Cancelled</strong>
                <small>
                  Cancelled orders
                </small>
              </div>

              <b>
                {cancelledOrders}
              </b>
            </div>

          </div>

        </div>

        {/* STORE OVERVIEW */}

        <div className="analytics-card">

          <div className="analytics-card-header">
            <div>
              <h3>Store Overview</h3>

              <p>
                Current VELORA store data
              </p>
            </div>
          </div>

          <div className="overview-list">

            <div>
              <span>Products</span>
              <strong>
                {products.length}
              </strong>
            </div>

            <div>
              <span>Customers</span>
              <strong>
                {customers.length}
              </strong>
            </div>

            <div>
              <span>Orders</span>
              <strong>
                {orders.length}
              </strong>
            </div>

            <div>
              <span>Revenue</span>
              <strong>
                {formatCurrency(totalRevenue)}
              </strong>
            </div>

          </div>

        </div>

      </section>

      {/* =========================
          PRODUCT PERFORMANCE
      ========================= */}

      <section className="analytics-card product-performance">

        <div className="analytics-card-header">
          <div>
            <h3>Product Performance</h3>

            <p>
              Products currently available in the store
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="analytics-empty">
            No products available.
          </div>
        ) : (
          <div className="product-analytics-table">

            <div className="product-table-header">
              <span>Product</span>
              <span>Category</span>
              <span>Price</span>
            </div>

            {products.map((product) => (
              <div
                className="product-table-row"
                key={product.id}
              >

                <div className="analytics-product-info">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <strong>
                    {product.name}
                  </strong>

                </div>

                <span>
                  {product.category}
                </span>

                <strong>
                  {formatCurrency(product.price)}
                </strong>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default Analytics;