import React from "react";
import "./BookingStyles.css";

const Booking = () => {
  return (
    <div className="booking-form">
      <h2>Book a product</h2>
      <form>
        <div className="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your Name"
            required
          ></input>
        </div>
        <div className="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            required
          ></input>
        </div>
        <div className="form-group">
          <label for="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your Phone Number"
            required
          ></input>
        </div>
        <div class="form-group">
          <label for="product">Product:</label>
          <select id="product" name="product" required>
            <option value="">Select a product</option>
            <option value="product1">Product 1</option>
            <option value="product2">Product 2</option>
            <option value="product3">Product 3</option>
          </select>
        </div>
        <div className="form-group">
          <label for="date">Date:</label>
          <input
            type="date"
            id="date"
            placeholder="DD/MM/YYYY"
            required
          ></input>
        </div>
        <div class="form-group">
          <label for="notes">Notes:</label>
          <textarea id="notes" name="notes"></textarea>
        </div>
        <div class="form-group">
          <button type="submit">Book Now</button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
