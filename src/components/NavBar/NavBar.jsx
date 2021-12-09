import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';
import logo from "../../assets/logo.png";
import useStyles from "./styles";

const NavBar = ({totalItems}) => {
    const classes = useStyles();

    return (
        <>
            <AppBar className={classes.appBar} position="fixed" color="inherit">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" color="inherit">
                        <img className={classes.image} src={logo} height="25px" alt="A lojinha"/>
                        A Lojinha
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                        <IconButton aria-label="Mostrar itens do carrinho" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar;