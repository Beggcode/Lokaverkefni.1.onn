import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const headerStyle: React.CSSProperties = {
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1px solid rgba(251, 250, 250, 0.34)',
        position: 'sticky',
        top: 0,
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
    };

    return (
        <header style={headerStyle}>
            <Link to="/" style={logoStyle}>
                🍳 Panic at the Bistro 🌿
            </Link>
        </header>
    );
};

export default Header;