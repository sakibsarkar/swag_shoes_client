import "./Heading.css";

const Heading = ({ heading, title, width }) => {
    return (
        <div className="newTitle" style={{ width: width }} >
            <h1>{heading}</h1>
            <p>{title}</p>
        </div >
    );
};

export default Heading;