import React, {useState, useEffect} from 'react'
import { commerce } from './lib/commerce';
import {
    Products,
    NavBar,
    Cart
} from "./components";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//1:01:25
//https://dashboard.chec.io/products/
//https://www.youtube.com/watch?v=377AQ0y6LPA&ab_channel=JavaScriptMastery
//https://github.com/adrianhajdin/project_e_commerce/blob/main/src/components/Navbar/Navbar.jsx
//https://gist.github.com/adrianhajdin/9867aefce5318f27c95990553f428c6e
const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }


    const handleAddToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId,quantity);
        setCart(response.cart)
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log("produtos", products);
    console.log("carrinho", cart)
    return (
        <Router>
            <div>
                <NavBar totalItems={cart.total_items} />
                <Routes>
                    <Route exact path="/"element={
                        <Products products={products} onAddToCart={handleAddToCart} />                    
                    }/>
                    <Route exact path="/carrinho" element={
                        <Cart cart={cart} />
                    }/>
                    
                </Routes>
            </div>
        </Router>

    )
}

export default App;