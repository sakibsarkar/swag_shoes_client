import "swiper/css";
import "swiper/css/pagination";
import "./Home.css";
import PromotionBanner from "../../Cards & Components/PromotionBanner/PromotionBanner";
import Slider from "../../Cards & Components/Slider/Slider";
import Swipper from "../../Cards & Components/Swipper/Swipper";
import UseAxios from "../../Hooks & Functions/Axios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Home = () => {

    const axios = UseAxios()
    const [productId, setProductId] = useState("")

    const { data: shoes, isLoading } = useQuery({
        queryKey: ["newArrival"],
        queryFn: async () => {
            const { data } = await axios.get("newArrival")
            return data
        }
    })


    const hanldeShowDetails = (id) => {
        setProductId(id)
        console.log(productId);
    }

    const handleHideDetails = () => {
        setProductId("")
    }

    // _id, name, price, sizes, coupon, discountPercentage, category, newArrival,image

    return (
        <div>

            {/* slider component */}
            <div className="sliderCon">
                <Slider />
            </div>
            <Swipper />

            <div className="newArrivalWrapper">
                <div className="newTitle">
                    <h1>New Arrival</h1>
                    <p>Just new</p>
                </div>


                {/* swiper js swiper */}
                <Swiper
                    slidesPerView={3.2}
                    spaceBetween={25}
                    pagination={false}
                    modules={[Pagination]}
                    className="mySwiper arrivalSlider"
                >
                    {
                        shoes?.map(shoe => <SwiperSlide onMouseEnter={() => hanldeShowDetails(shoe._id)} onMouseLeave={handleHideDetails} className="productCard" key={shoe._id}>
                            <div className="newArrivalImg">
                                <img src={shoe?.image} alt="" />
                            </div>

                            {
                                productId == shoe._id ?
                                    < div className="arrivalDetails">
                                        <h3>{shoe.name}</h3>
                                        <p>$ {shoe.price}</p>
                                        <Link className="arrivalBuy" to={`/shoeDetail/${shoe._id}`}>BUY</Link>
                                    </div>
                                    : ""
                            }

                        </SwiperSlide>)
                    }

                </Swiper>

            </div>

            <div className="newArrivalWrapper newArrivalWrapperV2">
                <div className="newTitle">
                    <h1>New Arrival</h1>
                    <p>Just new</p>
                </div>


                {/* swiper js swiper */}
                <Swiper
                    slidesPerView={2}
                    spaceBetween={25}
                    pagination={false}
                    modules={[Pagination]}
                    className="mySwiper arrivalSlider"
                >
                    {
                        shoes?.map(shoe => <SwiperSlide onMouseEnter={() => hanldeShowDetails(shoe._id)} onMouseLeave={handleHideDetails} className="productCard" key={shoe._id}>
                            <div className="newArrivalImg">
                                <img src={shoe?.image} alt="" />
                            </div>

                            {
                                productId == shoe._id ?
                                    < div className="arrivalDetails">
                                        <h3>{shoe.name}</h3>
                                        <p>$ {shoe.price}</p>
                                        <Link className="arrivalBuy" to={`/shoeDetail/${shoe._id}`}>BUY</Link>
                                    </div>
                                    : ""
                            }

                        </SwiperSlide>)
                    }

                </Swiper>

            </div>

            <PromotionBanner />

        </div >
    );
};

export default Home;