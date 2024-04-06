import { Menu, MenuItem, IconButton } from "@mui/material";
import SpeedIcon from '@mui/icons-material/Speed';
import { useState } from "react";

const PlaybackSpeedSelectionMenu = () => {
    const [anchorEI, setAnchorEI] = useState(null);
    const open = Boolean(anchorEI);
    const handleClick = (event) => {
        setAnchorEI(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEI(null);
    };
    return (
        <>
            <IconButton
                id="AccentButton"
                variant="outlined"
                sx={{ mr: 2, color: "#f02e4e" }}
                onClick={handleClick}
                aria-controls={open ? "AccentMenu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <SpeedIcon fontSize="large"/>
            </IconButton>
            <Menu
                id="AccentMenu"
                anchorEl={anchorEI}
                open={open}
                MenuListProps={{
                    "aria-labelledby": "AccentButton",
                }}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>1x</MenuItem>
                <MenuItem onClick={handleClose}>1.5x</MenuItem>
                <MenuItem onClick={handleClose}>1.75x</MenuItem>
                <MenuItem onClick={handleClose}>2x</MenuItem>
            </Menu>
        </>
    );
};

export default PlaybackSpeedSelectionMenu;
