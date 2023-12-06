import "./Home.css";
import React from "react";
import Slider from "../../Cards & Components/Slider/Slider";

const Home = () => {
    return (
        <div>

            {/* slider component */}
            <div className="sliderCon">
                <Slider />

            </div>
        </div>
    );
};

export default Home;