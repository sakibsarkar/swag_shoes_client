import "./PromotionBanner.css";
import { Link } from "react-router-dom";

const PromotionBanner = () => {
    return (
        <div className="promotionalBannerCon">
            <p>IN THIS SEASON</p>
            <h1>PROMOTION SALE OFF 50%</h1>
            <Link to={"/"}>SHOP NOW</Link>
            <h2 className="hurry">HURRY</h2>
        </div>
    );
};

export default PromotionBanner;

