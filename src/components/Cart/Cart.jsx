import React from 'react';
import {Container, Typography, Button, Grid} from "@material-ui/core";
import CartItem from './CartItem/CartItem';
import {Link} from "react-router-dom";

import useStyles from "./styles";


const Cart = ({carrinho, handleUpdateCartQtd, handleRemoveFromCart, handleEmptyCart}) => {
    const classes = useStyles();

    const EmptyCart = () => {
        return (
            <Typography variant="subtitle1">
                Você não possui itens no carrinho, adicione algo!
            </Typography>
            )
        }
    const FilledCart = () => {
        let total = 0;
        let items = []
        for (var key in carrinho){
            total += carrinho[key].preco * carrinho[key].quantity;
            items.push(carrinho[key])
        }
        
        return (
            <>
            <Grid container spacing={3}>
                
                {items.map((item) => (
                    
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} handleUpdateCartQtd={handleUpdateCartQtd} handleRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h6">Total: {total}</Typography>
                <div>
{/*                
                    <Button onClick={() => {handleEmptyCart()}}className={classes.EmptyCart} size="small" type="button" variant="contained" color="secondary">
                        Limpar carrinho
                    </Button>                     */}
                    <Button component={Link} to="/checkout" className={classes.checkout} size="large" type="button" variant="contained" color="primary">
                        Fazer pedido
                    </Button>
                </div>
            </div>
        </>
        )
    }

    // // if( !cart.line_items) return "Carregando...";
    const isEmpty = !Object.keys(carrinho).length;
    console.log("error", carrinho)

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Seu carrinho</Typography>
            { isEmpty? <EmptyCart/> : <FilledCart/>}
        </Container>
    )
}

export default Cart