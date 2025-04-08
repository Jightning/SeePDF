"use client"

import { PDFFile } from '@/types';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useCallback, useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { FixedSizeList as List } from 'react-window';

import { useInView } from 'react-intersection-observer';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './PDFView.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 700;

export default function PDFVirtualScroll (
    { 
        file,
        initialPageNumber 
    }: { file: PDFFile, initialPageNumber: number}) {

    const [numPages, setNumPages] = useState<number>(0);
    const [startPage, setStartPage] = useState<number>(1)
    const [endPage, setEndPage] = useState<number>(1)

    const [pageHeight, setPageHeight] = useState<number>(0)


    const [availablePages, setAvailablePages] = useState<any>(updatePages)
    const [containerWidth, setContainerWidth] = useState<number>();
    // const { ref, inView } = useInView()

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
        setEndPage(Math.min(250, nextNumPages))
    }

    // Returns an array of the correct length
    function updatePages() {
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    }

    useEffect(() => {
        setAvailablePages(updatePages)
    }, [endPage, startPage])

    useEffect(() => {
        function handleResize() {
            setContainerWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    // useEffect(() => {
    //     if (inView) {
    //         setEndPage((prev: number) => (prev + 5))
    //     }
    // }, [inView])

    return (
        <div className='pdf-virtual-scroll-container'>
            <Document 
                file={file} 
                onLoadSuccess={onDocumentLoadSuccess} 
                options={options}
                >
                <header className='pdf-header'>
                    <h1>react-pdf sample page</h1>
                </header>
                <List
                    itemCount={numPages}
                    itemSize={1075}
                    width={750}
                    height={525}
                    className='pdf-virtual-scroll-list'>
                        {PDFPage}
                </List>
                {/* {(startPage + endPage <= numPages) && <span ref={ref}>Loading More...</span>} */}
            </Document>
        </div>
    )
}

const PDFPage = ({ index, style }: any) => (
    <div className="page-wrapper" style={{
        ...style,
        padding: "10px"
    }}>
        <Page
            pageNumber={index + 1}
            renderMode='canvas'
            width={Math.min(700, maxWidth)}
        />
    </div>
);