'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic'

import './PDFView.css';

const PDFVirtualScroll = dynamic(() => import('./PDFVirtualScroll'))
import { PDFFile } from '@/types';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export default function PDFView() {
    const [file, setFile] = useState<PDFFile>("/Lord_of_Mysteries.pdf");
    // const [PDFBlob, setPDFBlob] = useState<any>(null)

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { files } = event.target;

        const nextFile = files?.[0];

        if (nextFile) {
            setFile(nextFile);
        }
    }

    return (
        <div className="pdf-view-container overflow-auto">
            <header className='pdf-header'>
                <h1>react-pdf sample page</h1>
            </header>
                {/* <div className="Example__container__load">
                    <label htmlFor="file">Load from file:</label>{' '}
                    <input onChange={onFileChange} type="file" />
                </div> */}

            <PDFVirtualScroll file={file} initialPageNumber={100} />
        </div>
    );
}