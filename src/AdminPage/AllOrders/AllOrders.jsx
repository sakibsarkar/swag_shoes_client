import "./AllOrders.css";
import OrderCard from "../../AdminComponents/OrderCard/OrderCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const AllOrders = () => {


    const token = getItemFromLS("token")
    const axios = UseAxios()



    const [totalEarning, setTotalEarning] = useState(0)

    const { data = [], refetch, } = useQuery({
        queryKey: ["allOrders"],
        queryFn: async () => {
            const { data: orderData = [] } = await axios.get(`/order/statistics?token=${token}`)
            // const { data: price } = await axios.get(`/shipped/price?token=${token}`)

            return orderData
        }
    })



    useEffect(() => {
        if (data && data.length > 0) {
            // Calculate total earnings only when data changes
            const newTotalEarning = data.reduce((total, order) => {
                if (order.status === "shipped") {
                    return total + order.price;
                }
                return total;
            }, 0);

            setTotalEarning(newTotalEarning);
        }
    }, [data]);

    return (
        <div className="ordersCardWrapper">

            <h1>All Orders</h1>


            <p>Total Earning : ${totalEarning}</p>





            <div className="ordersCardCon">
                {
                    data?.map(order => <OrderCard setTotalEarning={setTotalEarning} totalEarning={totalEarning} key={order._id} refetch={refetch} order={order} />)
                }
            </div>

        </div>
    );
};

export default AllOrders;