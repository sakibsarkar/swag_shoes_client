import "./ShoeDetails.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../Hooks & Functions/AauthContext";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const ShoeDetail = () => {
    const { id } = useParams()
    const token = getItemFromLS("token")
    const axios = UseAxios()
    const [selectedSize, setSelectedSize] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    const { user, myCart, setMyCart, paymentObj, setPaymentObj } = useContext(Context)

    const navigate = useNavigate()



    const { data = {}, isLoading } = useQuery({
        queryKey: ["shoeDetail"],
        queryFn: async () => {
            const { data: myShoe } = await axios.get(`/single/shoe?id=${id}&&token=${token}`)
            setSelectedSize(myShoe.sizes[0])
            setTotalPrice(myShoe.price)
            setQuantity(1)
            return myShoe
        }
    })
    const { _id, name, price, sizes, coupon, discountPercentage, category, newArrival, image } = data


    // ---todo : add ratings in every data on DB
    const rating = (Math.random() * 5).toFixed(1)



    // total price
    const handleTotalPrice = (quantity) => {
        setTotalPrice((quantity * price).toFixed(2))
    }


    const handlePlusQuantity = () => {
        if (quantity > 9) {
            setQuantity(10)
            handleTotalPrice(10)
            return
        }

        setQuantity(quantity + 1)
        handleTotalPrice(quantity + 1)

    }

    const handleMinusQuantity = () => {
        if (quantity === 1) {
            setQuantity(1)
            handleTotalPrice(1)
            return
        }

        setQuantity(quantity - 1)
        handleTotalPrice(quantity - 1)
    }


    // quantity change by input feild
    const handleAddQuantityManually = (e) => {
        const value = parseInt(e.target.value)

        if (value < 1) {
            setQuantity(1)
            handleTotalPrice(1)
            return
        }
        if (!value) {
            setQuantity(1)
            handleTotalPrice(1)
            return
        }
        if (value > 10) {

            setQuantity(10)
            handleTotalPrice(10)
            return
        }

        setQuantity(value)
        handleTotalPrice(value)
    }



    // add to cart
    const handleAddtoCart = async () => {
        if (!selectedSize || !totalPrice || !quantity) {
            return
        }


        if (!user) {

            // give a alert for log in
            return
        }



        // cart data
        const cartObject = {
            user_name: user?.displayName,
            user_email: user?.email,
            totalPrice: totalPrice,
            quantity: quantity,
            size: selectedSize,
            product_id: _id,
            product_img: image,
            product_name: name,
            coupon: coupon,
            discount: discountPercentage
        }


        // check is the item is already in cart or not
        const { data: myOldCart } = await axios.get(`/user/check/cart?token=${token}&&id=${_id}&&size=${selectedSize}`)





        if (myOldCart?.isExist) {
            // updating the old card price with new price
            const newPrice = myOldCart.totalPrice + parseInt(totalPrice)


            // increasing the quantity with old quantity
            const newQuantity = parseInt(myOldCart.quantity + quantity)

            // updating the cart data

            const { data: cartUpdate } = await axios.put(`/update/cart?token=${token}`, {
                quantity: newQuantity,
                totalPrice: newPrice,
                cart_id: myOldCart.cart_id
            })




            Swal.fire({
                title: "Successfully added to your cart",
                text: "",
                icon: "success"
            });

            return
        }


        await axios.post(`/user/cart/add?token=${token}`, cartObject)
        setMyCart({ cartData: [], totalItem: myCart.totalItem + 1 })
        Swal.fire({
            title: "Successfully added to your cart",
            text: "",
            icon: "success"
        });
    }


    // but the shoe
    const handleBuy = () => {
        // user_name,user_email,bill,coupon,product_img,product_name,quantity,size,product_id,discount,cart_id

        const paymentDetails = {
            user_name: user.dispalyName,
            user_email: user.email,
            bill: price,
            coupon: coupon,
            product_img: image,
            product_name: name,
            quantity: quantity,
            size: selectedSize,
            product_id: _id,
            discount: discountPercentage,
            cart_id: "direct buy"
        }
        setPaymentObj(paymentDetails)
        navigate("/paymentPage")
    }



    return (
        <div className="shoe_detail_container">


            {
                isLoading ?
                    <LoadingAnimation />
                    :
                    <>

                        <SideBySideMagnifier
                            imageSrc={image}
                            alwaysInPlace={true}
                            className="magnifyImageContainer"
                        >

                        </SideBySideMagnifier>


                        {/* ----old display image----- */}
                        {/* <div className="bigShoeImg">
                            <img src={image} alt="" />
                        </div> */}


                        <div className="detail_box_right">
                            <div className="shoeIntro">
                                <h2>{name}</h2>
                                <p>${price}</p>
                                <Rating readOnly={true} value={rating} name="half-rating-read" defaultValue={2.5} precision={0.5} />
                            </div>

                            <div className="product_varients">
                                <div className="sizes">

                                    <p>Select Size :</p>
                                    {
                                        sizes?.map((size, indx) => <button
                                            key={indx}
                                            style={size == selectedSize ? { background: "black", color: "white" } : {}}
                                            onClick={() => setSelectedSize(size)}
                                        >{size}
                                        </button>)
                                    }
                                </div>

                                <div className="quantity">



                                    <p>Select quantity</p>
                                    <div className="quantityBox">
                                        <button disabled={quantity === 1 ? true : false} onClick={handleMinusQuantity}><FiMinus /></button>
                                        <input type="number" value={quantity} onChange={handleAddQuantityManually} />
                                        <button disabled={quantity === 10 ? true : false} onClick={handlePlusQuantity}><FiPlus /></button>
                                    </div>

                                </div>
                            </div>


                            <div className="processButon">
                                <button className="butNow" onClick={handleBuy}>Buy Now</button>
                                <button className="addCart" onClick={handleAddtoCart}> <MdShoppingCart />Add to cart</button>
                            </div>

                            <div className="total">
                                <h2>Total : ${totalPrice}</h2>
                                <p> Use coupon {coupon} to get {discountPercentage}% discount</p>
                            </div>
                        </div>
                    </>
            }

        </div >
    );
};

export default ShoeDetail;