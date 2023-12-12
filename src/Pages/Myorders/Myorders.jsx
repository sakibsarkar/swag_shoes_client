import "./Myorders.css";
import MyOrderCard from "../../Cards & Components/MyOrderCard/MyOrderCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const Myorders = () => {
    const token = getItemFromLS("token")
    const axios = UseAxios()

    const [isSearching, setIsSearching] = useState(false)

    const [searchValue, setSearchValue] = useState("")

    const { data, refetch } = useQuery({
        queryKey: ["myOrders"],
        queryFn: async () => {
            const { data: history } = await axios.get(`/myOrders?token=${token}`)

            return history.reverse()
        }
    })

    const handleSearch = (e) => {

        const search = e.target.value
        if (search == "") {
            setIsSearching(false)
            return
        }

        setIsSearching(true)
        setSearchValue(search.toLowerCase())

    }

    return (
        <div className="historyWrapper">

            <div className="searchHistory">

                <input type="text" onKeyUp={handleSearch} placeholder="serach id/month/name" />
                <div className="searchIcon">
                    <IoSearchSharp />
                </div>
            </div>

            <div className="orderHistoryContainer">
                {
                    data?.map(order => <MyOrderCard key={order._id} isSearching={isSearching} searchValue={searchValue} refetch={refetch} order={order}></MyOrderCard>)
                }
            </div>
        </div>
    );
};

export default Myorders;