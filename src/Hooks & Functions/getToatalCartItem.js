import UseAxios from "./Axios/UseAxios";
import { getItemFromLS } from "./locaStorage";

const getCartItem = async () => {
    const token = getItemFromLS("token")
    const axios = UseAxios()
    if (token) {
        const {data} = await axios.get(`/myCart`)
        
    }
}