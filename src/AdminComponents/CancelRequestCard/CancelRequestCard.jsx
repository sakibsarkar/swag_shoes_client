import "./CancelRequestCard.css";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdCancelPresentation } from "react-icons/md";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const CancelRequestCard = ({ request, refetch }) => {
    const { _id, user_name, user_email, product_id, product_img, product_name, req_status, orderId } = request || {}




    const token = getItemFromLS("token")
    const axios = UseAxios()


    // this will revome the order from user order list
    const handleAcceptRequest = () => {

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const { data } = await axios.put(`/cancel/requestResponse?token=${token}`, {
                    action: "accepted",
                    req_id: _id,
                    cartId: orderId
                })

                Swal.fire({
                    title: "Successfully accecpted request",
                    text: "",
                    icon: "success"
                })
                refetch()
            }
            else {

                return
            }
        })



    }


    const handleReject = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const { data } = await axios.put(`/cancel/requestResponse?token=${token}`, {
                    action: "rejected",
                    req_id: _id,
                })

                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                })
                refetch()
            }
            else {

                return
            }
        })
    }
    return (
        <div className="cancelOrderCard">

            <div className="cancelReqImg">
                <img src={product_img} alt="" />

            </div>


            <div className="reqDetails">
                <h1>{product_name}</h1>
                <p>customer :{user_name}</p>
                <p>product_id:{product_id}</p>
            </div>

            <div className="requestActionButton">
                <button onClick={handleReject} style={{ background: "#de2323" }}><MdCancelPresentation />Reject</button>
                <button className="" onClick={handleAcceptRequest} style={{ background: "#0f7d30" }}><AiOutlineFileDone />Accept</button>
            </div>

        </div>
    );
};

export default CancelRequestCard;