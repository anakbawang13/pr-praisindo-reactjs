import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { headerAxios } from "../utils/headerAxios";
import { useNavigate } from "react-router-dom";

// import { dataProducts } from "../utils/static";
import { currencyFormat } from "../utils/functions";

export default function DetailProductComponent() {
    const navigate = useNavigate();
    const params = useParams();
    const [qty, setQty] = useState(1);
    const [dataDetail, setDataDetail] = useState([])
    const getName = JSON.parse(localStorage.getItem('name'));
    const getEmail = JSON.parse(localStorage.getItem('email'));

    useEffect(() => {
        getDataProductDet();
    }, []);

    const updateState = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            let newCart = cart.filter((val) => val.id == dataDetail.id);
            if (newCart.length > 0) {
                setQty(newCart.qty);
            }
        }
    };

    const qtyChange = (type) => {
        let newQty = qty;
        if (type === "min") {
            newQty--;
        } else {
            newQty++;
        }

        if (newQty < 0) {
            newQty = 0;
        } else if (newQty > dataDetail.qty) {
            newQty = dataDetail.qty
        }

        setQty(newQty);
    };

    const Home = () => {
        navigate("/home");
    };

    const updateCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let newDataDetail = {};
        if (!cart) {
            cart = [];
            newDataDetail = dataDetail;
        } else {
            let newCart = cart.filter((val) => val.id == dataDetail.id);
            if (newCart.length > 0) {
                newDataDetail = newCart;
            } else {
                newDataDetail = dataDetail;
            }
        }
        newDataDetail.qty = qty;
        let allCart = cart.filter((val) => val.id != dataDetail.id);
        allCart.push(newDataDetail);

        localStorage.setItem("cart", JSON.stringify(allCart));
        navigate("/cart");
    };

    const getDataProductDet = async () => {
        const url_api = "http://localhost:3000";
        const response = await axios.get(url_api + "/products/" + params.id, { headers: headerAxios });
        if (response) {
            console.log("response", response);
            setDataDetail(response.data.data);
        }
    }

    return (
        <Container sx={{ mt: 2 }}>
            {"Selamat datang, " + getName + " (" + getEmail + ")"}
            {dataDetail &&
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <img
                            src={dataDetail.image}
                            srcSet={dataDetail.image}
                            alt={dataDetail.name}
                            loading="lazy"
                            style={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title={dataDetail.name} />
                            <CardContent>
                                <Typography variant="subtitle2">{dataDetail.desc}</Typography>
                                <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                                    {currencyFormat(dataDetail.price)}
                                </Typography>
                                <Stack direction={"row"} alignItems="center" sx={{ mt: 3 }}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="success"
                                        onClick={() => qtyChange("min")}
                                    >
                                        <RemoveIcon fontSize="small" />
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
                                        {qty}
                                    </Typography>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="success"
                                        onClick={() => qtyChange("plus")}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </Stack>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "flex-end" }}>
                                <Button variant="contained" color="error" onClick={updateCart}>
                                    + Cart
                                </Button>
                                <Button variant="contained" onClick={Home}>
                                    Back
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            }
        </Container>
    );
}