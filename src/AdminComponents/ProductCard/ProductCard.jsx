import "./ProductCard.css";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const ProductCard = ({ product = {}, refetch }) => {
    const { _id, name, price, ratings, sizes, coupon, discountPercentage, category, newArrival, image } = product


    const token = getItemFromLS("token")
    const axios = UseAxios()

    // updatebox show
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const noScroll = (isScroll) => {
        if (isScroll) {
            return document.body.classList.add("noScroll")

        }


        else {
            return document.body.classList.remove("noScroll")

        }

    }

    // showupdate form
    const handleShowUpdateForm = () => {
        setShowUpdateForm(true)
        noScroll(true)
    }

    // hide update form

    const hanldeHideUpdateForm = () => {
        setShowUpdateForm(false)
        noScroll(false)
    }

    const handleUpdateProduct = (e) => {
        e.preventDefault()
        const form = e.target
        const productName = form.name.value
        const productCoupon = form.coupon.value
        const productPrice = form.price.value
        const productDiscount = form.discount.value
        if (productCoupon && !productDiscount) {
            return Swal.fire({
                icon: "error",
                text: "If you add coupon then you must have to add discount value",
                title: "Error"
            })
        }

        if (!productCoupon && productDiscount) {
            return Swal.fire({
                icon: "error",
                text: "If you add Discoun then you must have add a coupon code",
                title: "Error"
            })
        }

        const updateObj = {
            id: _id,
            name: productName,
            price: productPrice,
            coupon: productCoupon,
            discountPercentage: productDiscount
        }


        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
            icon: "question"
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                const { data } = await axios.put(`/product/update?token=${token}`, updateObj)
                refetch()
                Swal.fire({
                    icon: "success",
                    title: "Successful"
                })
                setShowUpdateForm(false)

            }

            else if (result.isDenied) {
                return
            }
        });


    }



    return (
        <>
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
                    <button style={{ background: "#06ad09" }} onClick={handleShowUpdateForm}><LuPenLine />Update</button>
                    <button style={{ background: "#f21b1b" }}><FaRegTrashAlt />Delete</button>
                </div>
            </div>

            {
                showUpdateForm ?
                    <div className="productUpdateBox">
                        <form onSubmit={handleUpdateProduct}>
                            <div>
                                <p>Product name</p>
                                <input type="text" name="name" defaultValue={name} required />
                            </div>
                            <div>
                                <p>Price ($)</p>
                                <input type="number" name="price" defaultValue={price} required />
                            </div>
                            <div>
                                <p>Coupon Code</p>
                                <input type="text" name="coupon" defaultValue={coupon} />
                            </div>
                            <div>
                                <p>Discount (%)</p>
                                <input type="number" min={0} max={100} name="discount" defaultValue={discountPercentage} />

                            </div>
                            <button>Update</button>
                            <RxCross2 onClick={hanldeHideUpdateForm} />
                        </form>
                    </div>
                    : ""
            }
        </>
    );
};

export default ProductCard;

