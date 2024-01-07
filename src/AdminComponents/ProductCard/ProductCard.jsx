import "./ProductCard.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";

const ProductCard = ({ product = {} }) => {
    const { _id, name, price, ratings, sizes, coupon, discountPercentage, category, newArrival, image } = product

    return (
        <div className="MyproductCard">
            <div className="product_image">
                <img src={image} alt="" />
            </div>
            <div className="my_product_details">
                <h1>{name}</h1>
                <p>${price}</p>
                {
                    discountPercentage ? <span>{discountPercentage}%</span> : ''
                }
            </div>

            <div className="product_action">
                <button style={{ background: "#06ad09" }}><LuPenLine />Update</button>
                <button style={{ background: "#f21b1b" }}><FaRegTrashAlt />Delete</button>
            </div>
        </div>
    );
};

export default ProductCard;

