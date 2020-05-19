import React,{useState,useEffect} from "react"
import "../styles.css";
// eslint-disable-next-line no-use-before-define
//import {API} from "../backend"
import Base from "./Base"
import Card from "./Card";
import { getProducts } from "../admin/helper/adminapicall";


export default function Home(){

    const [products,setProducts] = useState([])
    const [setError] = useState(false)

    const loadAllProduct = () => {
        getProducts().then(data => {
            if(data.err){
                setError(data.err)
            }
            else{
                setProducts(data)
            }
        })
    }


    useEffect(() => {
        loadAllProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Base title="Home Page" description="welcome to the t-shirt store">
            <div className="row text-center">
                <h1 className="text-white">All of Tess</h1>
                <div className="row">
                    {products.map((product,index) => {
                        return (
                            <div key={index} className="col-4 mb-4">
                                <Card product={product}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )
}