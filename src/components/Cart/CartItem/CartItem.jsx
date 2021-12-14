import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import useStyles from "./styles";
import defaultImage from "../../../assets/default_image.png"

const CartItem = ({item, handleUpdateCartQtd, handleRemoveFromCart}) => {
    const classes = useStyles();

    return (
        <Card>
            <CardMedia className={classes.media}image={item.imagem || defaultImage} alt={item.nome} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.nome}</Typography>
                <Typography variant="h5">{item.preco}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQtd(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQtd(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remover</Button>
            </CardActions>  
        </Card>

)
}

export default CartItem
