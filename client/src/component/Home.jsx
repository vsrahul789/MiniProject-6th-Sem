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
      </div>
    </div>
  );
};

export default Home;
