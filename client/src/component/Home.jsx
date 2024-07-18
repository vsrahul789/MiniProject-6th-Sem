import React from 'react';
import Header from './Header'; // Import the Header component
import './home.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  return (
    <div className="home-container">
      <Header /> {/* Add the Header component */}
      <div className="overlay">
        <div className="home-content">
          <h1 className="main-heading">The pure taste of</h1>
          <h1 className="main-heading india">India</h1>
          <p className="description">
            DineEase, the ultimate app for effortless table reservations at your favorite
            restaurants, blending convenience with the vibrant flavors of India.
            Experience the rich and diverse culinary traditions of India with every booking!
          </p>
          <div className="buttons">
            <Link to="/login/user" className="btn login-btn">Log In</Link>
            <button className="btn restaurant-btn">Restaurants</button>
            <button className="btn book-table-btn">BOOK A TABLE</button>
          </div>
        </div>

        {/* Additional Content Sections */}
        <div className="additional-content">
          <div className="section section-dish1">
            <div className="section-text">
              <h2>Authentic Indian Cuisine</h2>
              <p>Discover the flavors of India with our authentic dishes made from the freshest ingredients.</p>
              <Link to="/menu" className="btn">Explore Menu</Link>
            </div>
          </div>

          <div className="section section-dish2 reverse">
            <div className="section-text">
              <h2>Book Your Table</h2>
              <p>Reserve your spot at the best Indian restaurants and enjoy a seamless dining experience.</p>
              <Link to="/reservation" className="btn">Book Now</Link>
            </div>
          </div>

          <div className="section section-dish3">
            <div className="section-text">
              <h2>Special Offers</h2>
              <p>Get the best deals and offers exclusively on DineEase. Save on every meal!</p>
              <Link to="/offers" className="btn">Check Offers</Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-content">
            <p>&copy; 2024 DineEase. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
