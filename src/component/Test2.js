import { React, useState } from 'react';
import { TextField, Box, Input } from '@mui/material';

function Test2Component() {
    const [state, setstate] = useState(
        {
            nama: "nama",
            angka: "angka",
            desc: "desc"
        }
    );

    const handleChange = (fieldName, value) => {
        let newstate = { ...state }
        newstate[fieldName] = value
        setstate(newstate)
    }

    return (
        <Box component="form" method='POST' noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="nama"
                label="Nama"
                name="nama"
                autoComplete="nama"
                onChange={(e) => handleChange("nama", e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="angka"
                label="Angka"
                name="angka"
                autoComplete="angka"
                onChange={(e) => handleChange("angka", e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="desc"
                label="Description"
                name="desc"
                autoComplete="desc"
                onChange={(e) => handleChange("desc", e.target.value)}
            />
            {state.nama +" " + state.angka +" " + state.desc}
        </Box>
    )
}

export default Test2Component;