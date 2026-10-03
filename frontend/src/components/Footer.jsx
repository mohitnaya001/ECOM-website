import React from "react";
import "../style/footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h2>ECOM-WEB</h2>
          <p>
            Your trusted online shopping destination.
            Shop quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h3>Customer Service</h3>
          <a href="/orders">My Orders</a>
          <a href="/cart">Shopping Cart</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📧 support@ecom-web.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Ahmedabad, Gujarat, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ECOM-WEB. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
