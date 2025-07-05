import React from "react";
import "./NotFoundPage.css";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-page-container">
      <h1 className="not-found-404-header">404</h1>
      <h2 className="not-found-text">
        Oops! Looks like we can't find the page you are looking for. You can
        return to previous page or the Home Page.
      </h2>
      <Link to={"/"} className="primary-button not-found-return-button">
        Return to Home Page
      </Link>
    </div>
  );
}

export default NotFoundPage;
