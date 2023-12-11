import "./MyOrderCard.css";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { TbShoppingCartCancel } from "react-icons/tb";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const MyOrderCard = ({ order, refetch }) => {
    const { _id, user_email, user_name, price, date, month, isCouponUsed, discount, status, product_id, product_img, product_name } = order || {}


    const token = getItemFromLS("token")
    const axios = UseAxios()

    const handleCanecelOrder = async () => {
        if (status === "pending") {
            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const { data } = await axios.delete(`/cancel/order?token=${token}&&id=${_id}`)
                    refetch()
                    Swal.fire("Saved!", "", "success");
                }


                else if (result.isDenied) {
                    return
                }
            });
        }
    }

    return (
        <div className="orderHistoryCard">
            <div className="orderImg">
                <img src={product_img} alt="" />
            </div>

            <div className="orderName">
                <h2>{product_name}</h2>
                <p>Total Price :{price}</p>
                <p>{date}</p>

                <p className="pending">{status}</p>


            </div>
            {
                status == "pending" ?
                    <button onClick={handleCanecelOrder} className="orderCancelButton"><TbShoppingCartCancel />Cancel Order</button>
                    : ""
            }
        </div>
    );
};

export default MyOrderCard;