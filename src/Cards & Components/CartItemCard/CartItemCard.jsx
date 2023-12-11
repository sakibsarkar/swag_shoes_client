import "./CartItemCard.css";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { getItem } from "localforage";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Hooks & Functions/AauthContext";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const CartItemCard = ({ cart, refetch }) => {
    const { _id, user_name, user_email, totalPrice, quantity, size, product_id, product_img, product_name, coupon, discount } = cart

    const { myCart, setMyCart, setPaymentObj, user } = useContext(Context)

    const token = getItemFromLS("token")
    const axios = UseAxios()
    const navigate = useNavigate()

    // delete from cart
    const handleDelete = async () => {
        await axios.delete(`/user/cart/delete?token=${token}&&id=${_id}`)
        refetch()
        setMyCart({ cartData: [], totalItem: myCart.totalItem - 1 })
        Swal.fire({
            title: "Successfully deleted from cart",
            text: "",
            icon: "success"
        });
    }

    const hanldeBuy = () => {
        const paymentObject = {
            user_name: user.name,
            user_email: user.email,
            bill: totalPrice,
            coupon: coupon,
            product_img: product_img,
            product_name: product_name,
            quantity: quantity,
            size: size,
            product_id: product_id,
            discount: discount,
            cart_id: _id

        }

        setPaymentObj(paymentObject)

        navigate("/paymentPage")

    }

    return (
        <div className="itemContainer">


            <div className="cart_card_left">


                <div className="cartProductImg">
                    <img src={product_img} alt="" />
                </div>

                <div className="cart_product_details">
                    <h4>{product_name}</h4>
                    <h3>${totalPrice}</h3>
                    <p>size : {size}</p>
                    <p>X{quantity}</p>
                </div>


            </div>

            <div className="cart_card_right">
                <button style={{ background: "#ff5b5b" }} onClick={handleDelete}>Remove</button>
                <button style={{ background: "#0ca21f" }} onClick={hanldeBuy}>Buy</button>
            </div>


        </div>
    );
};

export default CartItemCard;