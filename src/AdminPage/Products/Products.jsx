import "./Products.css";
import ProductCard from "../../AdminComponents/ProductCard/ProductCard";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";

const Products = () => {


    const [shoeAddProductForm, setshowAddProductForm] = useState(false);
    const [speedDial, setSpeedDial] = useState(false)



    const token = getItemFromLS("token")
    const axios = UseAxios()

    const [currentPage, setCurrentPage] = useState(0);
    const [totalData, setTotalData] = useState(18)

    const { data = {}, refetch } = useQuery({
        queryKey: ["myProducts", currentPage],
        queryFn: async () => {
            const { data: productData } = await axios.get(`/all/shoes?token=${token}&&currentPage=${currentPage}&&limit=${18}`)
            setTotalData(productData?.totalData ? productData.totalData : 0)
            return productData
        }
    })


    const handleCurrentPage = (event, value) => {
        setCurrentPage(value - 1)

    }

    return (
        <div className="productWrapper">
            <h1>All products</h1>
            <div className="products_container">
                {
                    data?.result?.map(product => <ProductCard refetch={refetch} key={product._id} product={product} />)
                }
            </div>

            <div className="admin_pagination">
                <Pagination count={Math.ceil(totalData / 18)} variant="outlined" shape="rounded" onChange={handleCurrentPage} />
            </div>


            <div className="addProduct">

                <div className="speedAction" style={speedDial ? { height: "50px" } : { height: "0px", top: "0px" }}>
                    <p>Add Product</p>
                    <button className="speedActionButton" onClick={() => setshowAddProductForm(!shoeAddProductForm)}><AiFillFileAdd /></button>
                </div>

                <button className="addProductBtn" style={speedDial ? { transform: "rotate(45deg)" } : {}} onClick={() => setSpeedDial(!speedDial)}>
                    <BsPlusLg />
                </button>
            </div>

            {
                shoeAddProductForm ?

                    <div className="add_product_form">
                        <form>
                            <div>
                                <p>Product Name</p>
                                <input type="text" placeholder="Poduct Name" name="name" required />
                            </div>
                            <div>
                                <p>Product Price</p>
                                <input type="text" placeholder="Poduct Name" name="price" required />
                            </div>
                            <div>
                                <p>Product Image</p>
                                <input type="file" accept="image/*" placeholder="Poduct Name" name="price" required />
                            </div>
                        </form>
                    </div> : ""
            }


        </div>
    );
};

export default Products;