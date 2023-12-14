import "./Statistics.css";
import Chart from "react-google-charts";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const Statistics = () => {


    const token = getItemFromLS("token")
    const axios = UseAxios()


    const [chartDataObj, setChartDataObj] = useState({})
    const [chartDataKeys, setChartDataKeys] = useState([])

    // total pending Orders
    const [pendingorders, setPendingOrders] = useState(0)
    // total shippedorder
    const [totalShipped, setShipped] = useState(0)

    const { data = [] } = useQuery({
        queryKey: ["statistics", chartDataKeys],
        queryFn: async () => {

            setChartDataObj({})
            const { data: statistics } = await axios.get(`/order/statistics?token=${token}`)
            const { data: pending } = await axios.get(`/order/pending?token=${token}`)
            const { data: shipped } = await axios.get(`/order/shipped?token=${token}`)
            setPendingOrders(pending.pending)
            setShipped(shipped.shipped)
            // _id,user_email,user_name,price,date,month,isCouponUsed,discount,status,product_id,product_name,product_img,quantity
            const clone = [...statistics]
            const dataObj = {}


            clone.map(state => {


                if (dataObj[state.date] === undefined) {

                    dataObj[state.date] = state.price

                    setChartDataObj(dataObj)


                    if (chartDataKeys.includes(state.date)) {

                        return
                    }
                    setChartDataKeys([state.date, ...chartDataKeys])
                    return

                }

                dataObj[state.date] += state.price

                setChartDataObj(dataObj)
                return

            })
            return statistics
        }
    })


 

    const everyDayChart = [
        [
            "Day",
            "Total price",


        ],
        ...data.reverse().map((value) => [value.date, value.price],)

    ];

    const barChart = [
        ["Day", "Total Sale"],
        ...chartDataKeys.map((value, index) => [value, chartDataObj[value]],)
    ];



    const pireChartData = [
        ["Section", "state",],
        // [data.length, pendingorders, totalShipped]
        ["Pending", (pendingorders / data.length) * 100],
        ["Shipped", (totalShipped / data.length) * 100]
    ]


    return (
        <div className="statisticContainer">


            <div className="stateCards">
                <div>
                    <div className="totalOrderCard">
                        <FaBoxOpen className="stateIcon" />
                        <h1>Total Order {data.length}</h1>
                    </div>

                    <div className="totalPending">
                        <MdPendingActions className="stateIcon" />
                        <h1>Total Pending {pendingorders}</h1>
                    </div>
                    <div className="totalShipped">
                        <MdLocalShipping className="stateIcon" />
                        <h1>Total Shipped {totalShipped}</h1>
                    </div>
                </div>

                <div className="pieChart">
                    <Chart
                        chartType="PieChart"
                        data={pireChartData}

                        width={"100%"}
                        height={"200px"}
                    />
                </div>


            </div>

            <div className="statisticChart">
                <div className="everyOrderChart">
                    <Chart
                        chartType="Line"
                        width="100%"
                        height="400px"
                        data={everyDayChart}
                    />
                </div>

                <div className="totalOrderChart">
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={barChart}

                    />
                </div>
            </div>

        </div>
    );
};

export default Statistics;