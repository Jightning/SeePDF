"use client"

import React from 'react';
import './InfoView.css';
import { useHeader } from './Header';
import OutlineView from './OutlineView';
import { PDFDocumentProxy } from 'pdfjs-dist';

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
            <h1 className="border-b-2 text-lg items-center w-fit pr-12">Chapters</h1>
            <OutlineView/>
        </div>
    );
};

export default InfoView;