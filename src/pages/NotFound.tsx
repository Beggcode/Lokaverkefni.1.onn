import React from 'react';
import { useNavigate } from 'react-router-dom';
import gordonImage from '../assets/MadGordon.webp'; 

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '70vh', 
            textAlign: 'center', 
            width: '100%' }}>
            <h1 style={{ 
                fontSize: 'clamp(4rem, 20vw, 8rem)', 
                color: '#3498db' }}>
                    
                    404
                    
            </h1>
            <h2 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '20px', 
                textTransform: 'uppercase' }}>
                    
                    Kitchen Emergency!

            </h2>
            
            <div style={{ 
                margin: '20px 0', 
                width: '100%', 
                maxWidth: '400px' }}>
                <img 
                    src={gordonImage} 
                    alt="Angry Gordon Ramsay" 
                    style={{ 
                        width: '100%', 
                        height: 'auto', 
                    }}
                />
            </div>

            <p style={{ 
                fontSize: '1rem', 
                color: '#888', 
                maxWidth: '90%', 
                marginBottom: '30px' }}>

                "IT'S RAW! WHERE IS THE LAMB SAUCE?!" <br />
                This page is so undercooked it's still running across the field!
                
            </p>

            <button 
                onClick={() => navigate('/')}
                style={{ 
                    padding: '12px 30px', 
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    backgroundColor: '#3498db', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '30px', 
                    cursor: 'pointer' }}
            >

                Back to the Bistro

            </button>
        </div>
    );
};

export default NotFound;