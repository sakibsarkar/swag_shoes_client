import "./Myorders.css";
import MyOrderCard from "../../Cards & Components/MyOrderCard/MyOrderCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const Myorders = () => {
    const token = getItemFromLS("token")
    const axios = UseAxios()

    const { data, refetch } = useQuery({
        queryKey: ["myOrders"],
        queryFn: async () => {
            const { data: history } = await axios.get(`/myOrders?token=${token}`)

            return history.reverse()
        }
    })


    return (
        <div className="historyWrapper">
            <div className="orderHistoryContainer">
                {
                    data?.map(order => <MyOrderCard key={order._id} refetch={refetch} order={order}></MyOrderCard>)
                }
            </div>
        </div>
    );
};

export default Myorders;