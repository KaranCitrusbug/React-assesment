import React from "react";
import { Link } from "react-router-dom";
import {
  InstagramOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import './style.css'

const Footer : React.FC= () => {
  return (
    <footer className="footer-section  p-5">
      <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-12">
          <ul>
            <li>Menu</li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ahop">Shop</Link>
            </li>
            <li>
              <Link to="/blog">Feedback</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12">
          <ul >
            <li>Categories</li>
            <li><Link to='/'>Kids</Link></li>
            <li><Link to='/'>Men</Link></li>
            <li><Link to='/'>Women</Link></li>
          </ul>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12">
          <ul>
            <li>Social Media</li>
            <div className="row">
              <div className="col-1">
                <InstagramOutlined />
              </div>
              <div className="col-1">
                <WhatsAppOutlined />
              </div>
              <div className="col-1">
                <TwitterOutlined />
              </div>
              <div className="col-1">
                <YoutubeOutlined />
              </div>
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
