import { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

function ShowMessage({ message }) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={3000}
        >
            <SnackbarContent
                style={{
                    backgroundColor: '#f02e4e', // Change the background color here
                }}
                message={
                    <Typography variant="h6">
                        {message}
                    </Typography>
                }
            />
        </Snackbar>
    );
}

ShowMessage.propTypes = {
    message: PropTypes.string.isRequired,
}

export default ShowMessage;
