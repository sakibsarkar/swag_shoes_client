import "./ShoeCardV2.css";
import { Rating } from "@mui/material";
import { GiShoppingBag } from "react-icons/gi";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";

const ShoeCardV2 = ({ shoeData }) => {

    const { _id, name, price, sizes, coupon, discountPercentage, category, newArrival, image, ratings } = shoeData

    return (
        <div className="product_card_v2">
            <div className="product_Img">
                <img src={image} alt="" />
            </div>

            <div className="shoe_info">
                <h2>{name}</h2>
                <p>${price}</p>
                <div className="row">
                    <p>({ratings.toFixed(1)})</p> <Rating readOnly={true} value={ratings} name="half-rating-read" defaultValue={2.5} precision={0.5} color="#facb00" />
                </div>
            </div>
            <div className="product_btn">
                <Link to={`/shoeDetail/${_id}`}><IoCart />View Details</Link>
                <Link to={`/shoeDetail/${_id}`}><GiShoppingBag />Buy now</Link>
            </div>

        </div>
    );
};

export default ShoeCardV2;