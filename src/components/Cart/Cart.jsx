import React from 'react';
import {Container, Typography, Button, Grid} from "@material-ui/core";
import CartItem from './CartItem/CartItem';
import {Link} from "react-router-dom";

import useStyles from "./styles";


const Cart = ({cart}) => {
    const classes = useStyles();

    const EmptyCart = () => {
        return (
            <Typography variant="subtitle1">
                Você não possui itens no carrinho, 
                <Link className={classes.link}>adicione algo!</Link>    
            </Typography>
            )
        }
    const FilledCart = () => {
        const total = cart.subtotal.formatted_with_symbol;
        return (
            <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Total: {total}</Typography>
                <div>
                    <Button className={classes.empty} size="large" type="button" variant="contained" color="secondary">
                        Limpar carrinho
                    </Button>
                
                    <Button className={classes.checkout} size="large" type="button" variant="contained" color="primary">
                        Fazer pedido
                    </Button>
                </div>
            </div>
        </>
        )
    }

    if( !cart.line_items) return "Carregando...";
    const isEmpty = !cart.line_items.length;

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Seu carrinho</Typography>
            { isEmpty? <EmptyCart/> : <FilledCart/>}
        </Container>
    )
}

export default Cart