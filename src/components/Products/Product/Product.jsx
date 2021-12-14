import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from '../styles';

import defaultImage from "../../../assets/default_image.png";

export const Product = ({product, onAddToCart}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia component="img" className={classes.media} image={product.imagem || defaultImage} title={product.nome}/>
             <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.preco}
                    </Typography>
                    </div>
                    <Typography dangerouslySetInnerHTML={{__html: product.nome}} variant="body2" color="textSecondary"/>
                    <CardActions className={classes.cardActions} disableSpacing >
                        <IconButton aria-label="Adicionar ao carrinho" onClick={() => onAddToCart(product, 1)}>
                            <AddShoppingCart />
                        </IconButton>
                    </CardActions>
                
            </CardContent>
        </Card>
    )
}
