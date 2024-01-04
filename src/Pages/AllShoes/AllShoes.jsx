import "./AllShoes.css";
import LoadingAnimation from "../../Cards & Components/LoadingAnimation/LoadingAnimation";
import PageBanner from "../../Shared/PageBanner/PageBanner";
import ShoeCard from "../../Cards & Components/ShoeCard/ShoeCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { Pagination, Slider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const AllShoes = () => {
    const [priceRange, setPriceRange] = useState([0, 500])
    const [totalData, setTotalData] = useState(9)
    const [currentPage, setCurrentPage] = useState(0)
    const [isCoupon, setIsCoupon] = useState("false")
    const [ratingFilter, setRatingFilter] = useState("all")

    // user token
    const token = getItemFromLS("token")
    const axios = UseAxios()

    const { data, isLoading } = useQuery({
        queryKey: ["shoes", priceRange, currentPage, isCoupon, ratingFilter],
        queryFn: async () => {
            const { data: shoeData } = await axios.get(`/all/shoes?range=${priceRange}&&currentPage=${currentPage}&&isCoupon=${isCoupon}&&token=${token}&&rating=${ratingFilter}`)
            setTotalData(shoeData?.totalData ? shoeData.totalData : 9)
            return shoeData
        }
    })



    // set CurrentPage
    const handleCurrentPage = (event, value) => {
        setCurrentPage(value - 1)

        // window.scroll(0, 0)
    }


    // coupon item filter
    const handleFindCouponItem = () => {
        setCurrentPage(0)
        if (isCoupon === "true") {
            return setIsCoupon("")
        }

        setIsCoupon("true")


    }



    // rating filter
    const handleRatingFilter = (e) => {
        const value = e.target.value
        setRatingFilter(value)
        setCurrentPage(0)
    }


    // price range filter
    const handlePriceRang = (e) => {
        setPriceRange(e.target.value)
        setCurrentPage(0)
    }


    return (
        <div className="allShoeWrapper">

            <PageBanner sectionName={"All shoes"} routeArr={["Home", "/", "AllShoes"]} />




            <div className="all_show_container">
                <div className="filter">
                    <select value={ratingFilter} onChange={handleRatingFilter}>
                        <option value="5">5 Star</option>
                        <option value="4">4 Star</option>
                        <option value="3">3 Star</option>
                        <option value="2">2 Star</option>
                        <option value="all" >Alll</option>
                        <option value="all" style={{ display: "none" }}>Best Rating</option>
                    </select>

                    <button onClick={handleFindCouponItem} className={isCoupon == "true" ? "couponActive" : ""}>Coupon Available</button>
                    <div className="ratingFilter">
                        <p>Price Range</p>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={priceRange}
                            onChange={handlePriceRang}
                            valueLabelDisplay="auto"
                            getAriaValueText={""}
                            min={0}
                            max={500}
                        />

                    </div>
                </div>

                {
                    isLoading ?
                        <LoadingAnimation />
                        :
                        <div className="all_shoe_card_container">
                            {
                                data?.result?.map(shoe => <ShoeCard key={shoe._id} shoeData={shoe} />)
                            }
                        </div>
                }
            </div>


            <Pagination onChange={handleCurrentPage} count={Math.ceil(totalData / 9)} variant="outlined" shape="rounded" />
        </div>
    );
};

export default AllShoes;