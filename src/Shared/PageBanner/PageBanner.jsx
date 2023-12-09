import "./PageBanner.css";

const PageBanner = ({ sectionName, routeArr = [] }) => {
    return (
        <div className="pageBannerCon">
            <h2>{sectionName}</h2>
            <div className="pageRoute">

                {
                    routeArr.map((item, index) => <p key={index}>{item}</p>)
                }
            </div>
        </div>
    );
};

export default PageBanner;