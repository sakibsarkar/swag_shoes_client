import "./CheckoutForm.css";
import Swal from "sweetalert2";
import UseAxios from "../../../Hooks & Functions/Axios/UseAxios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useRef, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../Hooks & Functions/AauthContext";
import { getItemFromLS } from "../../../Hooks & Functions/locaStorage";

const CheckoutForm = () => {
    const token = getItemFromLS("token")
    const axios = UseAxios()

    const { paymentObj, setPaymentObj } = useContext(Context)


    const [isCouponUsed, setIsCouponUsed] = useState(false)
    const [paymentLoading, setPaymentLoading] = useState(false)

    // payable amount
    const [amount, setAmmount] = useState(paymentObj.bill)

    // coupon ref
    const couponRef = useRef(null)

    // stripe
    const stripe = useStripe()
    const element = useElements()

    const navigate = useNavigate()


    if (Object.keys(paymentObj).length === 0) {
        navigate("/")
        return
    }

    // payment date
    const MonthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const dateFun = new Date()
    const date = dateFun.getDate()
    const monthNumber = dateFun.getMonth()
    const month = MonthArr[monthNumber]
    const year = dateFun.getFullYear()

    const today = `${month} ${date},${year}`

    const handleCouponCheck = () => {

        const couponCode = couponRef.current.value
        if (isCouponUsed) {
            return
        }

        if (!couponCode) {
            return
        }

        if (couponCode === paymentObj.coupon) {
            const dicountValue = paymentObj?.discount
            const discountPrice = paymentObj.bill - (paymentObj?.bill * (dicountValue / 100))

            setAmmount(discountPrice)
            setIsCouponUsed(true)
            Swal.fire({
                title: "Successfully coupon added",
                text: "",
                icon: "success"
            });
            return;
        }

        Swal.fire({
            title: "invalid coupon",
            text: "",
            icon: "error"
        });


    }



    const handlePay = async (e) => {
        e.preventDefault()


        if (!stripe || !element) {
            return
        }
        const card = element.getElement(CardElement);
        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if (error) {
            console.log(error.message);
            Swal.fire({
                title: `${error.message}`,
                text: "",
                icon: "error"
            });
            return
        }

        setPaymentLoading(true)

        const { data } = await axios.post(`/stripe/payment?token=${token}`, { price: amount })

        const { paymentIntent, error: err } = await stripe.confirmCardPayment(data?.client_secret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: paymentObj?.user_email || "anonymus"
                }
            }
        })



        if (err) {
            Swal.fire({
                title: "Error",
                text: err.message,
                icon: "error"
            });

            setPaymentLoading(false)
        }

        if (paymentIntent.status === "succeeded") {


            const paymentHistroy = {
                user_email: paymentObj?.user_email,
                user_name: paymentObj.user_name,
                price: amount,
                date: today,
                month: month,
                isCouponUsed: isCouponUsed,
                discount: paymentObj.discount,
                status: "pending",
                product_id: paymentObj.product_id,
                product_name: paymentObj.product_name,
                product_img: paymentObj.product_img
            }


            // add the product on order list in DB
            const { data: orderAdd } = await axios.post(`/new/order?token=${token}`, paymentHistroy)

            // cart id 
            const cartId = paymentObj.cart_id


            // deletting the order item from cart
            const { data: dlt } = await axios.delete(`/user/cart/delete?token=${token}&&id=${cartId}`)



            setPaymentLoading(false)


            Swal.fire({
                title: "Succesfull",
                text: "",
                icon: "success"
            });

            navigate("/")
        }
    }
    return (
        <div className="cardPaymentContainer">
            <h1>Make your payment for ${amount}</h1>
            <form onSubmit={(e) => handlePay(e)} className="finalPaymentBox">

                <div className="couponAply">
                    <input readOnly={isCouponUsed ? true : false} type="text" name="coupon" ref={couponRef} placeholder="COUPON CODE" className="couponFeild" />
                    <div onClick={handleCouponCheck} className={isCouponUsed ? "aplyBtn used" : "aplyBtn"}>aply</div>
                </div>
                <div className="cardBox">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button type="submit" disabled={paymentLoading ? true : false}>
                    {
                        paymentLoading ?
                            <TbFidgetSpinner className="spinner"></TbFidgetSpinner>
                            :

                            "Pay"
                    }



                </button>
            </form>

        </div>
    );
};

export default CheckoutForm;