import { TextField } from '@mui/material';
import { useState } from 'react';
import { SignInUserRequest } from '../../../ApiRequests';
import ShowMessage from '../../ShowMessage';

function LoginDialogForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        SignInUserRequest(formData)
            .then(responseData => {
                setSnackbarMessage(responseData);
                if (responseData.startsWith('Welcome')) {
                    localStorage.setItem("email", formData.email);
                    localStorage.setItem("password", formData.password);
                    // Delay navigation by 2 seconds to allow Snackbar to show
                    setTimeout(() => {
                        window.location.href = '/main_page';
                    }, 3000);
                }
            })
            .catch(error => {
                setSnackbarMessage(error);
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ mb: 2, width: "100%", p: 0 }}
                    label="Email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    sx={{ mb: 2, width: "100%", p: 0 }}
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    style={{
                        background: '#2196f3',
                        padding: '10px',
                        width: '100%',
                        border: 'none',
                        color: '#ffffff',
                        letterSpacing: '2px',
                        fontSize: '18px',
                        borderRadius: '5px'
                    }}
                    type="submit"
                    value="Login"
                    required
                />
            </form>
            {snackbarMessage && <ShowMessage message={snackbarMessage} />}
        </>
    );
}

export default LoginDialogForm;
