import React from "react";
import { Link } from "react-router-dom";
import images from "../../../assets/AllImages";

const index = () => {
  return (
    <main role="main" className="flex-shrink-0 middle-section">
      <div className="middle-inner">
        <section className="page-not-found-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="page-not-found-div">
                  <div className="page-not-found-image">
                    <img
                      src={images.PageNotFoundImage}
                      className="img-fluid"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <div className="page-not-found-text">
                    <h3>It looks like you're lost...</h3>
                  </div>
                  <div className="page-not-found-btn">
                    <Link
                      to="/"
                      className="btn btn-primary btn-pad-60 btn-uppercase"
                    >
                      Go To Homepage
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default index;
