import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header style={{
            backgroundColor: 'rgba(25, 24, 24, 0.9)',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: '1px solid rgba(251, 250, 250, 0.34)',
            position: 'sticky',
            top: 0,
            }}
        >
            <Link 
                to="/" 
                style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#3498db',
                    WebkitTextStroke: '0.13px white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    position: 'relative'
                }}
            >
                🍳 Panic at the Bistro 🥪

            </Link>
        </header>
    );
};

export default Header;