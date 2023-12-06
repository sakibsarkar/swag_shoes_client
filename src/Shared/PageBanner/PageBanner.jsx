import "./PageBanner.css";

const PageBanner = ({ sectionName, routeArr }) => {
    return (
        <div className="pageBannerCon">
            <h2>{sectionName}</h2>
            <div className="pageRoute">
                <p>{routeArr[0]}</p>
                <p>{routeArr[1]}</p>
                <p>{routeArr[2]}</p>
            </div>
        </div>
    );
};

export default PageBanner;