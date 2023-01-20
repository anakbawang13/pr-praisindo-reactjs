import {
    Button,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Container,
    Grid
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { dataProducts } from "../utils/static";
import { headerAxios } from "../utils/headerAxios";

export default function HomeComponent() {
    const navigate = useNavigate();
    const [dataProducts, setdataproduct] = useState([]);
    let getId = JSON.parse(localStorage.getItem('id'));
    const getName = JSON.parse(localStorage.getItem('name'));
    const getEmail = JSON.parse(localStorage.getItem('email'));

    useEffect(() => {
        getDataProduct();
    }, []);

    const editUser = (id) => {
        navigate("/editUser/" + id);
    };

    const Cart = () => {
        navigate("/cart");
    };

    const LogOut = () => {
        navigate("/");
        localStorage.clear();
    };

    const gotoDetail = (id) => {
        navigate("/product/" + id);
    };

    const getDataProduct = async () => {
        const url_api = "http://localhost:3000";
        const response = await axios.get(url_api + "/products", { headers: headerAxios });
        if (response) {
            console.log("response", response);
            setdataproduct(response.data.data);
        }
    }

    return (
        <Container sx={{ mt: 2 }}>
            {"Selamat datang, " + getName + " (" + getEmail + ")"}
            <Grid container>
                <Grid item>
                    <CardActions>
                        <Button fullWidth variant="contained" onClick={() => editUser(getId)}>
                            Edit
                        </Button>
                        <Button fullWidth variant="contained" onClick={Cart}>
                            Cart
                        </Button>
                        <Button fullWidth variant="contained" onClick={LogOut}>
                            Logout
                        </Button>
                    </CardActions>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {dataProducts.map((data, i) => (
                    <Grid key={i} item xs={3}>
                        <Card>
                            <CardHeader title={data.name} />
                            <CardMedia
                                component="img"
                                height="200"
                                image={data.image}
                            />
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => gotoDetail(data.id)}
                                >
                                    Detail
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}