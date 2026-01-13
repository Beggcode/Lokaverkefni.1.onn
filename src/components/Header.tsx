import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const headerStyle: React.CSSProperties = {
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'center', // Changed to center to make the logo the hero
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 2000,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
    };

    const logoStyle: React.CSSProperties = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#3498db',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 2001,
        letterSpacing: '1px'
    };

    return (
        <header style={headerStyle}>
            <Link to="/" style={logoStyle}>
                🍳 Panic at the Bistro
            </Link>
        </header>
    );
};

export default Header;