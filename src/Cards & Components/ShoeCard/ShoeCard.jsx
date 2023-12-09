import "./ShoeCard.css";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

const ShoeCard = ({ shoeData }) => {
    const { _id, name, price, sizes, coupon, discountPercentage, category, newArrival, image } = shoeData
    const rating = (Math.random() * 5).toFixed(1)
    return (
        <Link to={`/orderPage/:${_id}`} className="shoe_card">

            <div className="shoeImg">
                <img className="productImg" src={image} alt="" />
            </div>

            <div className="shoeDetail">
                <h2>{name}</h2>
                <p>${price}</p>
            </div>
            <div className="ratingStars">
                <Rating readOnly={true} value={rating} name="half-rating-read" defaultValue={2.5} precision={0.5} /> <p>({rating})</p>
            </div>
        </Link>
    );
};

export default ShoeCard;