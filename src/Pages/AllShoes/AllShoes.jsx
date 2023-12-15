import "./AllShoes.css";
import LoadingAnimation from "../../Cards & Components/LoadingAnimation/LoadingAnimation";
import PageBanner from "../../Shared/PageBanner/PageBanner";
import ShoeCard from "../../Cards & Components/ShoeCard/ShoeCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const AllShoes = () => {
    const [priceRange, setPriceRange] = useState("all")
    const [totalData, setTotalData] = useState(9)
    const [currentPage, setCurrentPage] = useState(0)

    // user token
    const token = getItemFromLS("token")
    const axios = UseAxios()

    const { data, isLoading } = useQuery({
        queryKey: ["shoes", priceRange, currentPage],
        queryFn: async () => {
            const { data: shoeData } = await axios.get(`/all/shoes?range=${priceRange}&&currentPage=${currentPage}&&token=${token}`)
            setTotalData(shoeData?.totalData ? shoeData.totalData : 9)
            return shoeData
        }
    })


    const handlePriceRange = (e) => {

        const price_range = e.target.value
        if (price_range == "") {
            setPriceRange("all")
            return
        }

        setCurrentPage(0)

        setPriceRange(price_range)

    }

    // set CurrentPage
    const handleCurrentPage = (event, value) => {
        setCurrentPage(value - 1)

        // window.scroll(0, 0)
    }


    console.log(data);

    return (
        <div className="allShoeWrapper">

            <PageBanner sectionName={"All shoes"} routeArr={["Home", "/", "AllShoes"]} />


            {
                isLoading ?
                    <LoadingAnimation />
                    :
                    <div className="all_show_container">
                        <div className="filter">
                            <select value={priceRange} onChange={handlePriceRange}>
                                <option value="0,80">$ 0 - 80</option>
                                <option value="81,100">$ 81 - 100</option>
                                <option value="101,200">$ 101 - 200</option>
                                <option value="" >Alll</option>
                                <option value="all" style={{ display: "none" }}>Filter By price</option>
                            </select>
                        </div>

                        <div className="all_shoe_card_container">
                            {
                                data?.result?.map(shoe => <ShoeCard key={shoe._id} shoeData={shoe} />)
                            }
                        </div>
                    </div>
            }

            <Pagination onChange={handleCurrentPage} count={Math.ceil(totalData / 9)} variant="outlined" shape="rounded" />
        </div>
    );
};

export default AllShoes;