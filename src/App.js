import React, { useEffect, useState } from 'react';

const StickyHeader = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(150); // Initial height

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;

            // Adjust header height and stickiness
            const newHeight = Math.max(70, 150 - currentScrollY);
            setHeaderHeight(newHeight);
            setIsSticky(currentScrollY > 80);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Precompute header styles based on state
    const headerStyle = {
        position: isSticky ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        right: 0,
        height: isSticky ? '70px' : `${headerHeight}px`, // Fixed height when sticky
        backgroundColor: isSticky ? '#841584' : 'red',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        transition: 'background-color 0.3s', // Remove height transition
    };

    const titleStyle = {
        fontSize: isSticky ? '24px' : '32px',
        transition: 'font-size 0.3s',
    };

    return (
        <div style={headerStyle}>
            <h1 style={titleStyle}>Sticky Header</h1>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <StickyHeader />
            <div style={{ paddingTop: '160px' }}> {/* Padding to prevent content overlap */}
                {[...Array(100)].map((_, index) => (
                    <div key={index} style={{
                        height: '100px',
                        borderBottom: '1px solid #ddd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <h2>Item {index + 1}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
