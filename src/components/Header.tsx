import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const headerStyle: React.CSSProperties = {
        backgroundColor: '#1a1a1a',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #333',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    };

    const logoStyle: React.CSSProperties = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#116da2ff',
        textDecoration: 'none'
    };

    return (
        <header style={headerStyle}>
            <Link to="/" style={logoStyle}>
                🍳 Panic at the Bistro
            </Link>
            <nav>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem' }}>
                    Home
                </Link>
            </nav>
        </header>
    );
};

export default Header;