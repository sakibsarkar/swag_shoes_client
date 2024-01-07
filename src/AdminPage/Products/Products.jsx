import "./Products.css";
import ProductCard from "../../AdminComponents/ProductCard/ProductCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const Products = () => {
    const token = getItemFromLS("token")
    const axios = UseAxios()

    const { data = {} } = useQuery({
        queryKey: ["myProducts"],
        queryFn: async () => {
            const { data: productData } = await axios.get(`/all/shoes?token=${token}&&currentPage=${0}&&limit=${18}`)
            return productData
        }
    })


    return (
        <div>
            <h1>All products</h1>
            <div className="products_container">
                {
                    data?.result?.map(product => <ProductCard key={product._id} product={product} />)
                }
            </div>

        </div>
    );
};

export default Products;