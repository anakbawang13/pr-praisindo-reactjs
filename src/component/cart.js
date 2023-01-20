import {
    Card,
    Grid,
    Container,
    Typography,
    Stack,
    Button,
    Checkbox,
    getCardUtilityClass,
    alertTitleClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/functions";
import { type } from "@testing-library/user-event/dist/type";
//import axios from "axios";
//import { headerAxios } from "../utils/headerAxios";
//import { useNavigate } from "react-router-dom";

export default function CartComponent() {
    const navigate = useNavigate();
    const [dataCart, setDataCarts] = useState([]);
    const getName = JSON.parse(localStorage.getItem('name'));
    const getEmail = JSON.parse(localStorage.getItem('email'));

    useEffect(() => {
        getCart();
    }, []);

    const getCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            setDataCarts(cart);
        }
    };

    const gotoCheckout = () => {
        navigate("/checkout");
    };

    const Home = () => {
        navigate("/home");
    };

    const updateCart = (id, type) => {
        let cart = dataCart;
        for (var i in cart) {
            if (cart[i].id == id) {
                let newQty = cart[i].qty;
                if (type == "min") {
                    newQty--;
                } else {
                    newQty++;
                }

                if (newQty < 0) {
                    newQty = 0;
                } else if (newQty > 2) {
                    newQty = 2
                }
                cart[i].qty = newQty;
                console.log("cart[]", cart);
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        getCart();
        alert("Car berhasil diupdate");
    };

    return (
        <Container sx={{ mt: 2 }}>
            {"Selamat datang, " + getName + " (" + getEmail + ")"}
            {dataCart.map((val, i) => (
                <card key={i} elevation={2} sx={{ my: 1 }}>
                    <Grid container>
                        <Grid item xs={2}>
                            <img
                                src={val.image}
                                srcSet={val.image}
                                alt={val.name}
                                loading="lazy"
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={7} sx={{ p: 1 }}>
                            <Typography variant="h5">{val.name}</Typography>
                            <Typography variant="h6" fontWeight={"bold"} sx={{ mt: 3 }}>
                                {currencyFormat(val.price)}
                            </Typography>
                        </Grid>
                        <Grid
                            item xs={2}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                padding: 1,
                            }}
                        >
                            <Stack direction={"row"} alignItems="center">
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="success"
                                    onClick={() => updateCart(val.id, "min")}
                                >
                                    <RemoveIcon />
                                </Button>

                                <Typography
                                    sx={{
                                        borderBottom: 1,
                                        width: 50,
                                        mx: 1,
                                        textAlign: "center",
                                        fontSize: 20,
                                    }}
                                    variant="subtitle2"
                                >
                                    {val.qty}
                                </Typography>

                                <Button
                                    size="small"
                                    variant="contained"
                                    color="success"
                                    onClick={() => updateCart(val.id, "plus")}
                                >
                                    <AddIcon />
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </card>
            ))}

            <Stack direction="row" alignContent={"flex-end"} sx={{ mb: 3 }}>
                <Button variant="contained" color="error" onClick={gotoCheckout}>
                    Checkout
                </Button>

                <Button variant="contained" onClick={Home}>
                    Back
                </Button>
            </Stack>
        </Container>
    );
};