import "./SearchProduct.css";
import LoadingAnimation from "../../Cards & Components/LoadingAnimation/LoadingAnimation";
import ShoeCard from "../../Cards & Components/ShoeCard/ShoeCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const SearchProduct = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const queryValue = query.get('search')

    const axios = UseAxios()

    const { data = [], isloading } = useQuery({
        queryKey: ["searchData", queryValue],
        queryFn: async () => {
            const { data: searchData } = await axios.get(`/search/shoes?searchValue=${queryValue}`)
            return searchData
        }

    })





    return (
        <div className="searchItemContainer">
            <h1>Found {data.length} result for &quot;{queryValue}&quot;</h1>

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