import "./Home.css";
import React from "react";
import Slider from "../../Cards & Components/Slider/Slider";
import Swipper from "../../Cards & Components/Swipper/Swipper";

const Home = () => {
    return (
        <div>

            {/* slider component */}
            <div className="sliderCon">
                <Slider />
            </div>
            <Swipper />
        </div>
    );
};

export default Home;