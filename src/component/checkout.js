import {
    Card,
    Box,
    Grid,
    Stack,
    TextField,
    Container,
    Paper,
    Button,
    Typography,
} from "@mui/material";
// import * as React from "react";
import React, { useEffect, useState } from "react";
import { currencyFormat, currencyFormat2 } from "../utils/functions";
import axios from 'axios';
import { headerAxios } from "../utils/headerAxios";
import { useNavigate } from "react-router-dom";

export default function CheckoutComponent() {
    const [dataCart, setDataCarts] = useState([]);
    const [totalBayar, setTotalBayar] = useState([]);
    const getName = JSON.parse(localStorage.getItem('name'));
    const getEmail = JSON.parse(localStorage.getItem('email'));

    const [Firstname, setFirstNama] = useState("");
    const [Lastname, setLastNama] = useState("");
    const [Address1, setAddress1] = useState("");
    const [Address2, setAddress2] = useState("");
    const [City, setCity] = useState("");
    const [State, setState] = useState("");
    const [Zip, setZip] = useState("");
    const [Country, setCountry] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getCart();
    }, [])

    const Cart = () => {
        navigate("/cart");
    };

    const getCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        let total = 0;
        if (cart) {
            setDataCarts(cart);
            cart.map((val) => {
                total = total + val.price * val.qty;
            });
            setTotalBayar(total);
        }
    };

    const prosesSimpan = async (e) => {
        e.preventDefault();
        console.log("Tombol Simpan Ditekan");
        try {
            const url_api = "http://localhost:3000"
            const param = {
                // kodebeli: "BL2",
                firstname: Firstname,
                lastname: Lastname,
                address1: Address1,
                address2: Address2,
                city: City,
                state: State,
                postalcode: Zip,
                country: Country
                // dataDet: {
                //     kodebelidet: "BL2",
                //     name: dataCart.val.name,
                //     qty: dataCart.val.qty,
                //     price: dataCart.val.price
                // }
            };

            const response = await axios.post(
                url_api + "/checkouts/create",
                param,
                { headers: headerAxios },
            );

            if (response) {
                console.log("Berhasil simpan");
                navigate('/home');
            } else {
                console.log("Gagal simpan");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container sx={{ mb: 4 }}>
            {"Selamat datang, " + getName + " (" + getEmail + ")"}
            <Box component="form" method='POST' onSubmit={prosesSimpan} noValidate sx={{ mt: 1 }}>
                <Paper sx={{ mt: 3 }}>
                    {dataCart.map((val, i) => (
                        <Card key={i} elevation={2} sx={{ my: 1 }}>
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
                                    <Typography variant="h8">{"Qty : " + val.qty}</Typography>
                                    <Typography variant="h6" fontWeight={"bold"} sx={{ mt: 10 }}>
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
                                    <Typography
                                        sx={{
                                            borderBottom: 1,
                                            mx: 1,
                                            textAlign: "center",
                                            fontSize: 20,
                                        }}
                                        variant="subtittle2"
                                    >
                                        {currencyFormat(val.qty * val.price)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                    <Stack direction="row" sx={{ p: 1 }} justifyContent="space-between">
                        <Typography variant="h5">TOTAL BAYAR : </Typography>
                        <Typography variant="h5">
                            {currencyFormat2(totalBayar)}
                        </Typography>
                    </Stack>
                </Paper>
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    <Typography component="h1" variant="h4" align="center">Checkout</Typography>
                    <Typography component="h6" variant="h4" gutterBottom>Shipping Address</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstname"
                                name="firstname"
                                label="First Name"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={(e) => setFirstNama(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastname"
                                name="lastname"
                                label="Last Name"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                                onChange={(e) => setLastNama(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Address Line 1"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                                onChange={(e) => setAddress1(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="address2"
                                name="address2"
                                label="Address Line 2"
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="standard"
                                onChange={(e) => setAddress2(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                                variant="standard"
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="state"
                                name="state"
                                label="State / Province / Region"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setState(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip / Postal Code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="standard"
                                onChange={(e) => setZip(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="country"
                                name="country"
                                label="Country"
                                fullWidth
                                autoComplete="shipping country"
                                variant="standard"
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                    <Stack direction="row" alignItems={"flex-end"}>
                        <Button
                            type="submit" variant="contained" sx={{ width: 100 }}>
                            Simpan
                        </Button>
                        <Button variant="contained" onClick={Cart}>
                            Back
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
};