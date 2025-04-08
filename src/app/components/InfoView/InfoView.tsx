"use client"

import React from 'react';
import './InfoView.css';
import { useHeader } from './Header';

const InfoView = () => {
    const {isMinimized, Header} = useHeader()
    
    if (isMinimized) return (
        <div className="minimized-info-view-container">
            <Header/>
        </div>
    );

    return (
        <div className="info-view-container">
            <Header/>
        </div>
    );
};

export default InfoView;