import "./CartItemCard.css";

const CartItemCard = ({ cart }) => {
    const { _id, user_name, user_email, totalPrice, quantity, size, product_id, product_img, product_name } = cart
    return (
        <div className="itemContainer">


            <div className="cart_card_left">


                <div className="cartProductImg">
                    <img src={product_img} alt="" />
                </div>

                <div className="cart_product_details">
                    <h4>{product_name}</h4>
                    <h3>${totalPrice}</h3>
                    <p>X{quantity}</p>
                </div>


            </div>

            <div className="cart_card_right">
                <button style={{ background: "#ff5b5b" }}>Remove</button>
                <button style={{ background: "#0ca21f" }}>Buy</button>
            </div>


        </div>
    );
};

export default CartItemCard;