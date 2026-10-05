import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const cart = location.state?.cart || [];

  const formatPrice = (price) =>
    `₹${price.toLocaleString("en-IN")}`;

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentDone, setPaymentDone] = useState(false);
  const [customerDetails,setCustomerDetails] = useState({
    name: "",
    mobile:"",
    address: "",
    city: "",
    pincode: "",
  });

  
  const [processing, setProcessing] = useState(false);

  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
  if (
    !customerDetails.name ||
    !customerDetails.mobile ||
    !customerDetails.address ||
    !customerDetails.city ||
    !customerDetails.pincode
  ) {
    alert("Please fill all delivery details.");
    return;
  }

  if (paymentMethod === "upi") {
    if (!upiId || !upiId.includes("@")) {
      alert("Please enter a valid UPI ID.");
      return;
    }
  }

  if (paymentMethod === "card") {
    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 12) {
      alert("Please enter a valid card number.");
      return;
    }

    if (!expiry) {
      alert("Please enter card expiry date.");
      return;
    }

    if (!cvv || cvv.length < 3) {
      alert("Please enter a valid CVV.");
      return;
    }
  }

  const newOrder = {
    id: Date.now(),
    date: new Date().toLocaleString("en-IN"),
    items: cart,
    total: total,
    paymentMethod: paymentMethod,
    deliveryAddress: customerDetails,
  };

  const existingOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  localStorage.setItem(
    "orders",
    JSON.stringify([...existingOrders, newOrder])
  );

  setPaymentDone(true);
  
    if (paymentMethod === "upi") {
      if (!upiId || !upiId.includes("@")) {
        alert("Please enter a valid UPI ID.");
        return;
      }
    }

    if (paymentMethod === "card") {
      if (!cardNumber || cardNumber.replace(/\s/g, "").length < 12) {
        alert("Please enter a valid card number.");
        return;
      }

      if (!expiry) {
        alert("Please enter card expiry date.");
        return;
      }

      if (!cvv || cvv.length < 3) {
        alert("Please enter a valid CVV.");
        return;
      }
    }

    // Simulated payment processing
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setPaymentDone(true);
    }, 1500);
  };

  if (paymentDone) {
    return (
      <div className="checkout-page">
        <div className="success-box">
          <h1>✅ Order Placed Successfully!</h1>

          <p>
            Thank you for your purchase.
          </p>

          <p>
            Payment Method:{" "}
            <strong>
              {paymentMethod === "cod"
                ? "Cash on Delivery"
                : paymentMethod === "upi"
                ? "UPI"
                : "Credit / Debit Card"}
            </strong>
          </p>

          <p>
            Order Total: <strong>{formatPrice(total)}</strong>
          </p>

          <button onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back to Bag
      </button>

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* LEFT SIDE */}
        <div className="checkout-left">

          <h2>Delivery Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={customerDetails.name}
            onChange={(e) => setCustomerDetails({ ...customerDetails,name: e.target.value,})
        }
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={customerDetails.mobile}
            onChange={(e) => setCustomerDetails({
                ...customerDetails,
                mobile: e.target.value,
            
            })}
          />

          <input
            type="text"
            placeholder="Address"
            value={customerDetails.address}
            onChange={(e) => setCustomerDetails({
                ...customerDetails, address: e.target.value,
            })}
          />

          <div className="checkout-row">
            <input
              type="text"
              placeholder="City"
              value={customerDetails.city}
              onChange={(e) => setCustomerDetails({
                ...customerDetails, city: e.target.value,
              })}
            />

            <input
              type="text"
              placeholder="Pincode"
              value={customerDetails.pincode}
              onChange={(e) =>
                setCustomerDetails({
                    ...customerDetails,
                    pincode: e.target.value,
                })
              }
            />
          </div>

          <h2>Payment Method</h2>

          {/* COD */}
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </label>

          {/* UPI */}
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            UPI
          </label>

          {/* CARD */}
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Credit / Debit Card
          </label>

          {/* UPI PAYMENT BOX */}
          {paymentMethod === "upi" && (
            <div className="demo-payment-box">

              <h3>UPI Payment</h3>

              <input
                type="text"
                placeholder="Enter UPI ID (example@upi)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />

              <p>
                Demo payment — no real money will be charged.
              </p>

            </div>
          )}

          {/* CARD PAYMENT BOX */}
          {paymentMethod === "card" && (
            <div className="demo-payment-box">

              <h3>Card Payment</h3>

              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />

              <div className="checkout-row">

                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  maxLength="4"
                  onChange={(e) => setCvv(e.target.value)}
                />

              </div>

              <p>
                Demo payment — no real money will be charged.
              </p>

            </div>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">

          <h2>Order Summary</h2>

          {cart.map((item, index) => (
            <div
              className="checkout-item"
              key={`${item.id}-${index}`}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <strong>{item.name}</strong>
                <p>{formatPrice(item.price)}</p>
              </div>

            </div>
          ))}

          <div className="checkout-total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <button
            className="place-order-btn"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing
              ? "PROCESSING..."
              : paymentMethod === "cod"
              ? "PLACE ORDER"
              : "PAY NOW"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Checkout;