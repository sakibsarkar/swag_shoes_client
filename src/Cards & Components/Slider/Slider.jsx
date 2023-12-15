import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slider.css";
import { Carousel } from "react-responsive-carousel";

const Slider = () => {
    return (
        <div className="bannerSlider">
            <Carousel autoPlay={false} interval={2500} emulateTouch={true} infiniteLoop={true}>
                <div className="sliderBOX">
                    <img className="bannerImg" src="https://i.ibb.co/ZhKXzdF/shoe9.jpg" />
                    <div id="firstBannerContent">
                        <h1>Hello <br />Summer Sale !</h1>
                        <p> Welcome to the Hello Summer Sale – where scorching savings meet cool deals! Dive into discounts on gadgets, fashion, and essentials. Don't miss out on the hottest steals of the season!</p>
                        <button>Code HELLO SUMMER</button>
                    </div>
                </div>



                <div className="sliderBOX">
                    <img className="bannerImg" src="https://i.ibb.co/jGw8mdP/2021-10-16-768x940.jpg" />

                    <div id="secondBannerContent">
                        <h1>Find Yor Swag! starting at $180</h1>
                        <button>View</button>
                    </div>

                </div>
                <div className="sliderBOX">
                    <img className="bannerImg" src="https://i.ibb.co/52JG3Rn/shoe7-768x940.jpg" />

                    <div id="thirdBannerContent">
                        <h1>Gen Z swag</h1>
                        <p>starting at $199.00</p>
                        <button>BUY</button>
                    </div>

                </div>
            </Carousel>
        </div>
    );
};

export default Slider;