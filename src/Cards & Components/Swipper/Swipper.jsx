import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Swipper.css";
import Heading from "../Heading/Heading";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Swipper = () => {
    return (

        <div className="bro_wrapper">
            <Heading heading={"Category"} title={"Find your category"} />
            <div className="swipperCardCon">


                <div className="categoryCards">

                    <div className="categoryCard">
                        <img src="https://i.ibb.co/mzqkb61/collection4-1d1d931a-3265-4eae-ac45-7e8a9cb3702e-large.jpg" alt="" />

                        <h1>Chukkas</h1>
                    </div>
                    <div className="categoryCard">
                        <img src="https://i.ibb.co/mXh2QxS/collection3-large.jpg" alt="" />

                        <h1>GYM SNEACKERS</h1>
                    </div>
                    <div className="categoryCard">
                        <img src="https://i.ibb.co/ssZrVDr/collection2-6fd1e403-7021-427d-8be1-8bf857c8aacf-768x940.jpg" alt="" />

                        <h1>WORKING BOOTS</h1>
                    </div>
                    <div className="categoryCard">
                        <img src="https://i.ibb.co/Zd4NyjQ/collection5-47277ffa-efcf-413d-a764-b4b5be9e4e99-large.jpg" alt="" />

                        <h1>HIKING BOOTS</h1>
                    </div>

                </div>
                <div className="swipperCard">
                    <Swiper
                        spaceBetween={30}
                        effect={'fade'}
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[EffectFade, Navigation, Pagination]}
                        className="mySwiper"
                        height={"100%"}
                    >
                        <SwiperSlide>
                            <img className="swipperIMG" src="https://i.ibb.co/qr3mpnJ/Shoe-3.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className="swipperIMG" src="https://sc04.alicdn.com/kf/Hc090bf8078d64ae2a36374596990232ag.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className="swipperIMG" src="https://www.saucony.com/on/demandware.static/-/Sites-saucony_us-Library/default/dwdfac5a91/content/seasonal-content/homepage/2023/10/17/hp-gift-trail-d.jpg" />
                        </SwiperSlide>
                    </Swiper>
                </div>


            </div></div>
    );
};

export default Swipper;