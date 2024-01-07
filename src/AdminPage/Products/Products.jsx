import "./Products.css";
import ProductCard from "../../AdminComponents/ProductCard/ProductCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const Products = () => {
    const token = getItemFromLS("token")
    const axios = UseAxios()

    const [currentPage, setCurrentPage] = useState(0);
    const [totalData, setTotalData] = useState(18)

    const { data = {} } = useQuery({
        queryKey: ["myProducts", currentPage],
        queryFn: async () => {
            const { data: productData } = await axios.get(`/all/shoes?token=${token}&&currentPage=${currentPage}&&limit=${18}`)
            setTotalData(productData?.totalData ? productData.totalData : 0)
            return productData
        }
    })

    const handleCurrentPage = (event, value) => {
        setCurrentPage(value - 1)

        // window.scroll(0, 0)
    }

    return (
        <div className="productWrapper">
            <h1>All products</h1>
            <div className="products_container">
                {
                    data?.result?.map(product => <ProductCard key={product._id} product={product} />)
                }
            </div>

            <div className="admin_pagination">
                <Pagination count={Math.ceil(totalData / 18)} variant="outlined" shape="rounded" onChange={handleCurrentPage} />
            </div>

        </div>
    );
};

export default Products;