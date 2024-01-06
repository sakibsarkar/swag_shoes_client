import "./SearchProduct.css";
import LoadingAnimation from "../../Cards & Components/LoadingAnimation/LoadingAnimation";
import ShoeCard from "../../Cards & Components/ShoeCard/ShoeCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoTicketOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const SearchProduct = () => {

    window.scroll(0, 0)
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const queryValue = query.get('search')

    const [order, setOrder] = useState("")
    const [isCoupon, setIsCoupon] = useState("")

    const axios = UseAxios()

    const { data = [], isloading } = useQuery({
        queryKey: ["searchData", queryValue, order, isCoupon],
        queryFn: async () => {
            const { data: searchData } = await axios.get(`/search/shoes?searchValue=${queryValue}&&order=${order}&&isCoupon=${isCoupon}`)
            return searchData
        }

    })


    //all product that has coupon
    const hanldeGetCouponItem = () => {
        if (isCoupon === "true") {
            return setIsCoupon("")
        }

        setIsCoupon("true")

    }


    return (
        <div className="searchItemContainer">
            <h1>Found {data.length} result for &quot;{queryValue}&quot;</h1>



            <div className="searchFilterbox">
                <p>  Filter :</p>
                <select onChange={(e) => setOrder(e.target.value)} value={order}>
                    <option value="">Best Match</option>
                    <option value="dec">Price high to low</option>
                    <option value="acc">Price low to high</option>
                </select>

                <button onClick={hanldeGetCouponItem} className={isCoupon ? "couponActive" : ""}><IoTicketOutline />Coupon AvailAble</button>
            </div>

            {
                isloading ?
                    <LoadingAnimation />
                    :
                    <div className="searchProductWrapper">
                        {
                            data?.map(shoe => <ShoeCard shoeData={shoe} key={shoe._id} />)
                        }
                    </div>
            }

        </div>
    );
};

export default SearchProduct;