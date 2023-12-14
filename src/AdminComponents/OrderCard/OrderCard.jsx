import "./OrderCard.css";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { FaDollarSign } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const OrderCard = ({ order, refetch, setTotalEarning, totalEarning }) => {
    const { _id, user_email, user_name, price, date, month, isCouponUsed, discount, status, product_id, product_name, product_img, quantity, size } = order

    const spitEmail = user_email.split("@")
    const hidenEmail = spitEmail[0].slice(0, 2)
    const shownEmail = `${hidenEmail}****${spitEmail[1]}`

    const token = getItemFromLS("token")
    const axios = UseAxios()

    // if (status == "shipped") {
    //     setTotalEarning(totalEarning + price)
    // }

    const orderNextStep = async () => {
        if (status === "pending") {
            const { data } = await axios.put(`/order/status?token=${token}`, { status: status, orderId: _id })
            Swal.fire({
                title: "Great your product only one step away from shipment",
                text: "",
                icon: "success"
            })
            refetch()
            return
        }
        if (status === "Ready to ship") {
            const { data } = await axios.put(`/order/status?token=${token}`, { status: status, orderId: _id })
            Swal.fire({
                title: "Great your product has been delivered to custome",
                text: "",
                icon: "success"
            })
            refetch()
            return
        }
    }


    return (
        <div className="orderCardCon">
            {
                status === "shipped" ?
                    <FaDollarSign className="dollar" />
                    :
                    ""
            }

            <div className="orderimageCon">
                <img src={product_img} alt="" />
            </div>

            <div className="orderRightSide">
                <h1>{product_name}</h1>
                <div className="rightSplit">
                    <div className="splitHalf borderGuy">
                        <p>Quatity : X{quantity}</p>
                        <p>Total : {price}</p>
                        <p>Size : {size}</p>

                    </div>
                    <div className="splitHalf">
                        <p>Name: {user_name}</p>
                        <p>email : {shownEmail}</p>
                        <p>Date : {date}</p>
                    </div>
                </div>

                <div className="orderActions">
                    <p>Status : {status}</p>
                    {
                        status === "shipped" ?
                            <p className="shipped" onClick={() => { return }}><IoMdDoneAll />Shipped</p>
                            :
                            <button onClick={orderNextStep}>Next precces<GrLinkNext className="nextIcon" /></button>
                    }
                </div>

            </div>

        </div >
    );
};

export default OrderCard;