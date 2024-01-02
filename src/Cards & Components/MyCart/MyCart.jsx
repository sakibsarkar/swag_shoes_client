import "./MyCart.css";
import CartItemCard from "../CartItemCard/CartItemCard";
import UseAxios from "../../Hooks & Functions/Axios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const MyCart = () => {
    const token = getItemFromLS("token")
    const axios = UseAxios()
    const { data = [], refetch } = useQuery({
        queryKey: ["myCartItems"],
        queryFn: async () => {
            const { data: cart } = await axios.get(`/myCart?token=${token}`)
            return cart
        }
    })




    return (

        <div className="cartItemWrapper">
            <div className="cartItemContainer">

                {
                    data?.map(cart => <CartItemCard refetch={refetch} key={cart._id} cart={cart}></CartItemCard>)
                }

            </div>
        </div>

    );
};

export default MyCart;