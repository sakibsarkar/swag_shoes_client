const CancelRequestCard = ({ request }) => {
    const { _id, user_name, user_email, product_id, product_img, req_status } = request || {}
    return (
        <div>

            <div className="cancelReqImg">
                <img src={product_img} alt="" />

            </div>

        </div>
    );
};

export default CancelRequestCard;