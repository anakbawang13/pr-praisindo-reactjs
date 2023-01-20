import { React, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from 'axios';
const theme = createTheme();

function LoginComponent() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const prosesLogin = async (e) => {
        e.preventDefault();
        console.log("Tombol Login Ditekan");
        try {
            // const url_api = "https://rich-teal-bear-garb.cyclic.app/users/login";
            // const response = await axios.post(url_api, {
            //     email: email,
            //     password: password
            // });

            const url_api = "http://localhost:3000"
            const param = {
                email: email,
                password: password
            };

            const response = await axios.post(
                url_api + "/users/login",
                param,
            );

            if (response) {
                // console.log("Berhasil register");
                // const userData = {
                //     email: response.data.data.email,
                //     password: response.data.data.password,
                // };
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("id", JSON.stringify(response.data.data.id));
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <Box component="form" method='POST' onSubmit={prosesLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LoginComponent;