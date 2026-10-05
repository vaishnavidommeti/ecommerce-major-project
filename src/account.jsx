import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("orders");

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  return (
    <div className="account-page">

      {/* BACK */}
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Shopping
      </button>

      <h1>My Account</h1>

      {/* PROFILE HEADER */}
      <div className="profile-header">
        <div className="profile-avatar">👤</div>

        <div>
          <h2>My Profile</h2>
          <p>Manage your account and orders</p>
        </div>
      </div>

      {/* ACCOUNT OPTIONS */}
      <div className="account-options">

        <button
          className={activeSection === "orders" ? "active" : ""}
          onClick={() => setActiveSection("orders")}
        >
          📦
          <span>My Orders</span>
        </button>

        <button
          className={activeSection === "wishlist" ? "active" : ""}
          onClick={() => setActiveSection("wishlist")}
        >
          ❤️
          <span>Wishlist</span>
        </button>

        <button
          className={activeSection === "profile" ? "active" : ""}
          onClick={() => setActiveSection("profile")}
        >
          👤
          <span>Profile</span>
        </button>

        <button
          className={activeSection === "settings" ? "active" : ""}
          onClick={() => setActiveSection("settings")}
        >
          ⚙️
          <span>Settings</span>
        </button>

      </div>


      {/* ================= ORDERS ================= */}

      {activeSection === "orders" && (
        <div className="account-section">

          <h2>My Orders</h2>

          {orders.length === 0 ? (
            <div className="empty-section">
              <h3>📦 No orders yet</h3>
              <p>Your placed orders will appear here.</p>

              <button onClick={() => navigate("/")}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list">

              {orders.map((order, index) => (
                <div
                  className="order-card"
                  key={order.id || index}
                >

                  <div className="order-header">
                    <h3>Order #{index + 1}</h3>
                    <span>{order.date}</span>
                  </div>

                  <h4>Products</h4>

                  {order.items?.map((item, itemIndex) => (
                    <div
                      className="ordered-product"
                      key={itemIndex}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>
                        <h4>{item.name}</h4>
                        <p>Price: ₹{item.price}</p>
                      </div>
                    </div>
                  ))}

                  <div className="delivery-info">

                    <h3>Delivery Address</h3>

                    <p>
                      <strong>
                        {order.customerDetails?.name}
                      </strong>
                    </p>

                    <p>
                      Mobile: {order.customerDetails?.mobile}
                    </p>

                    <p>
                      {order.customerDetails?.address}
                    </p>

                    <p>
                      {order.customerDetails?.city} -{" "}
                      {order.customerDetails?.pincode}
                    </p>

                  </div>

                  <div className="order-total">
                    <strong>
                      Order Total: ₹{order.total}
                    </strong>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      )}


      {/* ================= WISHLIST ================= */}

      {activeSection === "wishlist" && (
        <div className="account-section">

          <h2>❤️ My Wishlist</h2>

          {wishlist.length === 0 ? (
            <div className="empty-section">
              <h3>💔 Your wishlist is empty</h3>
              <p>Add your favourite products here.</p>

              <button onClick={() => navigate("/")}>
                Explore Products
              </button>
            </div>
          ) : (
            <div className="wishlist-grid">

              {wishlist.map((item, index) => (
                <div
                  className="wishlist-card"
                  key={item.id || index}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <h3>{item.name}</h3>

                  <p>₹{item.price}</p>

                  <button onClick={() => navigate("/")}>
                    Shop Now
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>
      )}


      {/* ================= PROFILE ================= */}

      {activeSection === "profile" && (
        <div className="account-section">

          <h2>👤 Profile Details</h2>

          <div className="profile-details">

            <div>
              <label>Name</label>
              <p>Your Name</p>
            </div>

            <div>
              <label>Email</label>
              <p>your@email.com</p>
            </div>

            <div>
              <label>Mobile</label>
              <p>Not added</p>
            </div>

          </div>

        </div>
      )}


      {/* ================= SETTINGS ================= */}

      {activeSection === "settings" && (
        <div className="account-section">

          <h2>⚙️ Settings</h2>

          <div className="settings-list">

            <button>
              🔔 Notification Settings
            </button>

            <button>
              🔒 Privacy & Security
            </button>

            <button>
              📍 Address Management
            </button>

            <button>
              💳 Payment Methods
            </button>

            <button>
              ❓ Help & Support
            </button>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
              }}
            >
              🚪 Logout
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Account;