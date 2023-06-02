import React from "react";

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark py-2 header">
      <div className="container-fluid">
        <a
          className="navbar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <img
            className="img-fluid me-3"
            width={"30px"}
            src="https://ik.imagekit.io/fhe9c5aen/png-transparent-google-maps-hd-logo-thumbnail-removebg-preview_Bd44O9MMHy.png?updatedAt=1685611843743"
            alt=""
          />
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: "20px" }}>
            Indian Maps
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
