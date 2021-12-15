import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation} from "react-router-dom";
import logo from "../../assets/logo.png";
import useStyles from "./styles";

const NavBar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <AppBar className={classes.appBar} position="fixed" color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" className={classes.title} variant="h7" color="inherit">
                        <img className={classes.image} src={logo} height="25px" alt="Comida caseira"/>
                        Lanchonete
                    </Typography>
                    <div className={classes.grow}/>

                    {location.pathname == "/" &&
                    <div className={classes.button}>
                        <IconButton component={Link} to="/carrinho" aria-label="Mostrar itens do carrinho" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>}

                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar;