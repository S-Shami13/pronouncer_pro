import { Typography } from "@mui/material"

function Logo() {
    return (
        <Typography
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
                fontSize: {md:'30px', xs:'20px'},
                fontWeight: 200,
                fontFamily: "Charm",
                letterSpacing:'.1rem',
                color: "white",
                textDecoration: "none",
/*                borderBottom: { md: '2px solid #e4effb', xs: 'none' }*/
            }}
        >
            <span style={{ fontFamily: 'great vibes', fontSize: '40px' }}>P</span>ronouncer<span style={{ fontFamily: 'great vibes', fontSize: '40px' }}>P</span>ro
        </Typography>
    );
}

export default Logo;