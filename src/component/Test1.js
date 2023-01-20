import { React, useState } from 'react';
import { TextField, Box } from '@mui/material';

function Test1Component() {
    const [nama, setNama] = useState("");
    const [angka, setAngka] = useState("");

    return (
        <Box component="form" method='POST' noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => setNama(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="angka"
                label="Angka"
                name="angka"
                autoComplete="angka"
                onChange={(e) => setAngka(e.target.value)}
            />
            {nama} {angka}
        </Box>
    )
}

export default Test1Component;