import React from "react";

const Footer = () => {
  return (
    <section className="footer">
      <footer className=" bg-dark text-light py-5">
        <p className="text-light copyright fw-bold text-center fst-italic">
          <em>***Task 1</em>
        </p>
        <h6 className="text-center text-light fs-6 fw-normal">
          © <span className="text-dark fw-bold"></span>
          Indian Maps | Created By <i className="fas fa-heart text-danger" />{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/nand-kishore-809880172/"
            className="text-decoration-underline text-light fs-6"
          >
            {" "}
            NAND KISHORE
          </a>
        </h6>
      </footer>
    </section>
  );
};

export default Footer;
