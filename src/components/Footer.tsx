import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            backgroundColor: '#1a1a1a',
            color: '#888',
            padding: '40px 20px',
            marginTop: '60px',
            borderTop: '1px solid rgba(251, 250, 250, 0.34)',
            textAlign: 'center'
        }}>
            <div style={{ marginBottom: '10px' }}>
                <span style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold', 
                    color: '#3498db',
                    display: 'block',
                    marginBottom: '5px'
                }}>
                     Panic at the Bistro
                </span>
                <p style={{ fontSize: '0.85rem', margin: 0 }}>
                    I chime in with a: Haven't you people ever heard of... cooking a decent meal?
                </p>
            </div>

            <div style={{ fontSize: '0.75rem', marginTop: '20px', opacity: 0.7 }}>
                <p style={{ margin: '5px 0' }}>
                    © 2026 Panic at the Bistro. All rights reserved.
                </p>
                <p style={{ margin: '5px 0' }}>
                    Data provided by <a 
                    href="https://www.themealdb.com/api.php" 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ color: '#888', textDecoration: 'underline' }}>TheMealDB API</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;