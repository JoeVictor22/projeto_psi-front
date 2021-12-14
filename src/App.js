import React, {useState, useEffect, useReducer} from 'react'
import { commerce } from './lib/commerce';
import {
    Products,
    NavBar,
    Cart,
    Checkout
} from "./components";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AxiosUnsecureService from './services/AxiosUnsecureService';
import Cookies from 'js-cookie';

const rest = new AxiosUnsecureService();

//1:01:25
//https://dashboard.chec.io/products/
//https://www.youtube.com/watch?v=377AQ0y6LPA&ab_channel=JavaScriptMastery
//https://github.com/adrianhajdin/project_e_commerce/blob/main/src/components/Navbar/Navbar.jsx
//https://gist.github.com/adrianhajdin/9867aefce5318f27c95990553f428c6e
const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const {data} = await rest.get("produto/list");
        console.log("produtos", data.items)
        setProducts(data.items);
    }

    const fetchCart = async () => {
        let carrinho = Cookies.get("carrinho");

        if (carrinho === undefined){
            carrinho = {}
        }
        setCart(carrinho);
    }


    const handleAddToCart = async (produto, quantity) => {
        let carrinho = {
            ...cart
        };
        
        if (carrinho[produto.id]){
            carrinho[produto.id].quantity += quantity;
        }else{
            let novoProduto = {
                ...produto,
                quantity: quantity
            }
    
            carrinho = {
                [produto.id]: novoProduto,
                ...cart
            }

        }
        setCart(carrinho);
        console.log("carrinho", cart);

    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    const handleUpdateCartQtd = async(productId, quantity) => {
        
        let carrinho = {
            ...cart
        };

        if (carrinho[productId]){
            if (quantity <= 0){
                delete carrinho[productId];
            }else{
                carrinho[productId].quantity = quantity;            
            }
            setCart(carrinho);
        }
        console.log(carrinho);

    }

    const handleRemoveFromCart = async(productId) => {
        let carrinho = {
            ...cart
        };
        delete carrinho[productId];
        setCart(carrinho);
        console.log(cart);

    }

    const handleEmptyCart = async() => {
        let carrinho = {};
        setCart(carrinho);
        console.log(cart);

    }

  
    return (
        <Router>
            <div>
                <NavBar totalItems={Object.keys(cart).length || 0} />
                <Routes>
                    <Route exact path="/"element={
                        <Products products={products} onAddToCart={handleAddToCart} />                    
                    }/>
                    <Route exact path="/carrinho" element={
                        <Cart 
                            carrinho={cart} 
                            handleUpdateCartQtd={handleUpdateCartQtd} 
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    }/>
                    <Route exact path="/checkout" element={
                        <Checkout 
                            carrinho={cart} 
                        />
                    }/>
                </Routes>
            </div>
        </Router>

    )
}

export default App;