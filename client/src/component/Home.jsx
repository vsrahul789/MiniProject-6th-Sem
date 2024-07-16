// src/component/Home.js
import React from 'react';
import Header from './Header'; // Import the Header component
import './home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <Header /> {/* Add the Header component */}
      <div className="overlay">
        <div className="home-content">
          <h1 className="main-heading">Discover</h1>
          <h1 className="main-heading nique">DineEase.</h1>
          <div className="buttons">
            <button className="btn restaurant-btn">Restaurant</button>
            <button className="btn book-table-btn">Book a Table</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
