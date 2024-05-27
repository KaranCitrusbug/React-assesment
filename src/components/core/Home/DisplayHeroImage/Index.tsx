import React, { Children, ReactNode } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Index: React.FC = () => {
  return (
    <section>
      <div className="hero-img"></div>
      <div className="hero-title">
        <h3>Effortlessly Blend Comfort & style!!</h3>
        <p>
          Effortlessly blend comfort and style with our Casual & Everyday
          collection, featuring cozy sweaters, versatile denim, laid-back tees,
          and relaxed-fit joggers for your everyday adventures
        </p>
        <Link to="/shop" className="btn px-3 py-2 hero-button">
          Shop Now
        </Link>
      </div>
      <div>
        
      </div>
    </section>
  );
};

export default Index;
