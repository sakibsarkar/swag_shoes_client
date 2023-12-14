import "./CancelRequest.css";
import CancelRequestCard from "../../AdminComponents/CancelRequestCard/CancelRequestCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const CancelRequest = () => {


    const token = getItemFromLS("token")
    const axios = UseAxios()

    const { data = [] } = useQuery({
        queryKey: ["cancel request"],
        queryFn: async () => {
            const { data: request } = await axios.get(`/cancel/request?token=${token}`)
            return request
        }
    })
    return (
        <div>

            {
                data?.map(request => <CancelRequestCard key={request._id} request={request} />)
            }

        </div>
    );
};

export default CancelRequest;