import "./MyCart.css";
import CartItemCard from "../CartItemCard/CartItemCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const MyCart = () => {
    const token = getItemFromLS("token")
    const axios = UseAxios()
    const { data = [] } = useQuery({
        queryKey: ["myCartItems"],
        queryFn: async () => {
            const { data: cart } = await axios.get(`/myCart?token=${token}`)
            return cart
        }
    })




    return (
        <div className="cartItemContainer">

            {
                data?.map(cart => <CartItemCard key={cart._id} cart={cart}></CartItemCard>)
            }

        </div>
    );
};

export default MyCart;