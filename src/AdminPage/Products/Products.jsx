import "./Products.css";
import ProductCard from "../../AdminComponents/ProductCard/ProductCard";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { getItemFromLS } from "../../Hooks & Functions/locaStorage";
import { uploadPhoto } from "../../Hooks & Functions/uploadPhoto";

const Products = () => {


    const [shoeAddProductForm, setshowAddProductForm] = useState(false);
    const [speedDial, setSpeedDial] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState("sneaker")

    // all categoryies 
    const categories = [
        "sneaker",
        "boots",
        "formal",
        "hiking",
        "clog"
    ]


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


    const handleAddProduct = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const price = form.price.value
        let discount = form.discount.value
        let coupon = form.code.value
        const image = form.image.files[0]
        const size = form.sizes.value
        const sizeArray = size.split(",")

        if (discount && !coupon) {
            return Swal.fire({
                icon: "error",
                text: "If you added discount then please add the coupon code"
            })
        }
        if (!discount && coupon) {
            return Swal.fire({
                icon: "error",
                text: "If you added coupon then please add the discout"
            })
        }

        if (!discount) {
            discount = null
        }
        if (!coupon) {
            coupon = null
        }

        const productObject = {
            name: name,
            price: price,
            ratings: 2.00,
            sizes: sizeArray,
            coupon: coupon,
            discountPercentage: parseInt(discount),
            category: selectedCategory,
            newArrival: true,
            image: ""
        }

        const { data } = await uploadPhoto(image)

        productObject.image = data?.display_url


        // add the product to the database
        const { data: insertData } = axios.post(`/add/product?token=${token}`, productObject)

        Swal.fire({
            icon: "success",
            text: "successfully product added",
            title: "Success"
        })

        refetch()


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
                        <form onSubmit={handleAddProduct}>
                            <div>
                                <p>Product Name</p>
                                <input type="text" placeholder="Poduct Name" name="name" required />
                            </div>

                            <div>
                                <p>Product Image</p>
                                <input type="file" accept="image/*" placeholder="Poduct Name" name="image" required />
                            </div>
                            <div className="brother">
                                <div>
                                    <p>Category</p>
                                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                        {categories?.map((category, i) => <option key={i}>{category}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <p>Product Price</p>
                                    <input type="text" placeholder="Poduct Name" name="price" required />
                                </div>
                            </div>

                            <div className="brother">
                                <div>
                                    <p>Discount</p>
                                    <input type="number" placeholder="Discount" name="discount" />
                                </div>
                                <div>
                                    <p>Coupon Code</p>
                                    <input type="text" placeholder="Coupon Code" name="code" />
                                </div>
                            </div>

                            <div>
                                <p>Sizes</p>
                                <input type="text" placeholder="example : 6,9,8,11,12" name="sizes" required />
                            </div>
                            <button>submit</button>
                        </form>
                    </div> : ""
            }


        </div>
    );
};

export default Products;