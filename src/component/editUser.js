import { React, useState } from 'react';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { headerAxios } from "../utils/headerAxios";
const theme = createTheme();

function EditUserComponent() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    let getId = JSON.parse(localStorage.getItem('id'));
    const getName = JSON.parse(localStorage.getItem('name'));
    const getEmail = JSON.parse(localStorage.getItem('email'));

    const prosesUpdate = async (e) => {
        e.preventDefault();
        console.log("Tombol Update Ditekan");
        try {
            // const url_api = "https://rich-teal-bear-garb.cyclic.app/users/login";
            // const response = await axios.post(url_api, {
            //     email: email,
            //     password: password
            // });

            const url_api = "http://localhost:3000"
            const param = {
                name: name,
                email: email
            };

            const response = await axios.put(
                url_api + "/users/edit/" + getId,
                param,
                { headers: headerAxios },
            );

            if (response) {
                // console.log("Berhasil register");
                // const userData = {
                //     user: response.data.data.name,
                //     email: response.data.data.email,
                // };
                localStorage.getItem("token", response.data.token)
                localStorage.getItem("id", JSON.stringify(response.data.data.id));
                localStorage.setItem("name", JSON.stringify(response.data.data.name));
                localStorage.setItem("email", JSON.stringify(response.data.data.email));
                navigate('/home');
            } else {
                // console.log("Gagal register");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container sx={{ mt: 2 }}>
            {"Selamat datang, " + getName + " (" + getEmail + ")"}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Update User
                        </Typography>
                        <Box component="form" method='POST' onSubmit={prosesUpdate} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link component={RouterLink} to="/home" variant="body2">
                                        {"Back to Home"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Container>
    );
}

export default EditUserComponent;