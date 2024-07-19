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
            <Link to="/restaurants" className="btn restaurant-btn">Restaurants</Link>
            <Link to="/book-table" className="btn book-table-btn">BOOK A TABLE</Link>
          </div>
        </div>
      </div>

      {/* Additional Content Sections */}
      <div className="additional-content">
        <div className="section section-dish1">
          <div className="section-text">
            <h2>Authentic Indian Cuisine</h2>
            <p>Discover the flavors of India with our authentic dishes made from the freshest ingredients.</p>
            <Link to="/menu" className="btn explore-menu-btn">Explore Menu</Link>
          </div>
        </div>

        <div className="section section-dish2 reverse">
          <div className="section-text">
            <h2>Find Restaurants Near You!</h2>
            <p>Reserve your spot at the best Indian restaurants and enjoy a seamless dining experience within your Area.</p>
            <Link to="/reservation" className="btn book-now-btn">Book Now</Link>
          </div>
        </div>

        <div className="section section-dish3">
          <div className="section-text">
            <h2>Special Offers</h2>
            <p>Get the best deals and offers exclusively on DineEase. Save on every meal!</p>
            <Link to="/offers" className="btn check-offers-btn">Check Offers</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
