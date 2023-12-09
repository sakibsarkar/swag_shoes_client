import "./ShoeDetails.css";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const ShoeDetail = () => {
    const { id } = useParams()
    const token = getItemFromLS("token")
    const axios = UseAxios()

    const [selectedSize, setSelectedSize] = useState(0)
    const [quantity, setQuantity] = useState(1)


    const { data = {} } = useQuery({
        queryKey: ["shoeDetail"],
        queryFn: async () => {
            const { data: myShoe } = await axios.get(`/single/shoe?id=${id}&&token=${token}`)
            setSelectedSize(myShoe.sizes[0])
            return myShoe
        }
    })
    const { _id, name, price, sizes, coupon, discountPercentage, category, newArrival, image } = data




    const handlePlusQuantity = () => {
        if (quantity > 9) {
            return
        }

        setQuantity(quantity + 1)
    }
    const handleMinusQuantity = () => {
        if (quantity === 1) {
            return
        }

        setQuantity(quantity - 1)
    }

    return (
        <div className="shoe_detail_container">


            <div className="bigShoeImg">
                <img src={image} alt="" />
            </div>


            <div className="detail_box_right">
                <div className="shoeIntro">
                    <h2>{name}</h2>
                    <p>${price}</p>
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
                            <button onClick={handleMinusQuantity}><FiMinus /></button>
                            <input type="number" value={quantity} />
                            <button onClick={handlePlusQuantity}><FiPlus /></button>
                        </div>

                    </div>
                </div>


                <div className="processButon">
                    <button className="butNow">Buy Now</button>
                    <button className="addCart">Add to cart</button>
                </div>
            </div>

        </div >
    );
};

export default ShoeDetail;