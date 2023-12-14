import "./MyOrderCard.css";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { TbShoppingCartCancel } from "react-icons/tb";
import { useCopyToClipboard } from "usehooks-ts";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const MyOrderCard = ({ order, refetch, isSearching, searchValue }) => {
    const { _id, user_email, user_name, price, date, month, isCouponUsed, discount, status, product_id, product_img, product_name, quantity } = order || {}


    const token = getItemFromLS("token")
    const axios = UseAxios()

    // is search value matched
    const [matched, setMatched] = useState(false)


    const [value, copy] = useCopyToClipboard()

    useEffect(() => {
        if (month.toLowerCase().includes(searchValue) || product_name.toLowerCase().includes(searchValue) || _id.includes(searchValue)) {
            setMatched(true)
        }

        else {
            setMatched(false)

        }
    }, [month, product_name, _id, searchValue])


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



    // id copyToclipBoard
    const handleCopyToclipBoard = () => {
        copy(_id)

        Swal.fire({
            title: "Successfully copy to your clipboard",
            text: "",
            icon: "success"
        })
    }


    // request for cancel order
    const handleSendRequest = async () => {

        const cancelRequestData = {
            user_name,
            user_email,
            product_id,
            product_img,
            product_name,
            req_status: "pending",
            orderId: _id
        }


        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {


                if (data.exist) {
                    Swal.fire({
                        title: "Already requested. please wait for admin confirmation",
                        text: "",
                        icon: "error"
                    });
                    return
                }
                Swal.fire({
                    title: "Successfully request send",
                    text: "",
                    icon: "success"
                });


            }


            else if (result.isDenied) {
                return
            }
        });

        const { data } = await axios.post(`/request/for/cancel?token=${token}`, cancelRequestData)



    }


    return (
        <>

            {
                isSearching ?
                    <div className={matched ? "orderHistoryCard" : "hide"}>
                        <div className="orderImg">

                            <img src={product_img} alt="" />
                        </div>

                        <div className="orderName">
                            <h2>{product_name}</h2>
                            <p>{date}</p>
                            <p>Total Price :${price}</p>
                            <p>Quantity : X{quantity}</p>
                            <p onClick={handleCopyToclipBoard} style={{ cursor: "pointer" }}>Order Id: {_id} <MdOutlineContentCopy /></p>
                            <p className="pending">{status}</p>


                        </div>
                        {
                            status == "pending" ?
                                <button onClick={handleCanecelOrder} className="orderCancelButton"><TbShoppingCartCancel />Cancel Order</button>
                                : ""
                        }
                    </div>

                    :
                    <div className="orderHistoryCard">
                        <div className="orderImg">
                            <img src={product_img} alt="" />
                        </div>

                        <div className="orderName">
                            <h2>{product_name}</h2>
                            <p>{date}</p>
                            <p>Total Price :${price}</p>
                            <p>Quantity : X{quantity}</p>
                            <p onClick={handleCopyToclipBoard} style={{ cursor: "pointer" }}>Order Id: {_id} <MdOutlineContentCopy /></p>
                            <p className="pending">{status}</p>


                        </div>
                        {
                            status == "pending" ?
                                <button onClick={handleCanecelOrder} className="orderCancelButton"><TbShoppingCartCancel />Cancel Order</button>
                                : ""
                        }

                        {
                            status === "Ready to ship" ?
                                <button className="orderCancelButton" onClick={handleSendRequest}><TbShoppingCartCancel />Request for cancel</button>
                                :
                                ""
                        }
                    </div>
            }

        </>
    );
};

export default MyOrderCard;