import React,{useState,useEffect} from "react"
//import "../style.css"
import Base from "../Base";
import Card from "../Card";
//import { getProducts } from "../admin/helper/adminapicall";
import { loadCart } from "./cartHelper";
//import { API } from "../../backend";



const Cart = () => { 
    
    const [products,setProducts] = useState([]);

    const [reload,setReload] = useState(false)


    useEffect(() => {
        setProducts(loadCart())
    },[reload])

    const loadAllProducts = () => {
        return (
            <div>
                <h2>This Section for checkout</h2>
                {products.map((product,index) => (
                    <Card key={index} product={product} removeFromCart={true} addtoCart={false}
                    setReload={setReload} reload={reload}></Card>
                ))}
            </div>
        )
    }
    
    const laodCheckout = () => {
        return (
            <div>
                <h2>ThisSection for checkout</h2>
            </div>
        )
    }

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{laodCheckout()}</div>
                <div className="col-6">Check out Section</div>
            </div>
        </Base>
    )
}

export default Cart