import "./ErrorPage.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="errorContainer">
            <img src="https://i.ibb.co/Sy2z1kq/depositphotos-144632757-stock-illustration-error-404-page-with-workers.webp" alt="" />

            <Link className="gotTo" to={"/"}>Go to Home</Link>
        </div>
    );
};

export default ErrorPage;