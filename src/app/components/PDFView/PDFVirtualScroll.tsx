"use client"

import { PDFFile } from '@/types';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useCallback, useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './PDFView.css';
import { useInView } from 'react-intersection-observer';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 800;

export default function PDFVirtualScroll (
    { 
        file,
        initialPageNumber 
    }: { file: PDFFile, initialPageNumber: number}) {

    const [numPages, setNumPages] = useState<number>(0);
    const [startPage, setStartPage] = useState<number>(1)
    const [endPage, setEndPage] = useState<number>(1)
    const [availablePages, setAvailablePages] = useState<any>(updatePages)
    const [containerWidth, setContainerWidth] = useState<number>();
    const { ref, inView } = useInView()

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
        if (inView) {
            setEndPage((prev: number) => (prev + 5))
        }
    }, [inView])
    // console.log(startPage, endPage, numPages)
    return (
        <div className='pdf-virtual-scroll-container'>
            <Document 
                file={file} 
                onLoadSuccess={onDocumentLoadSuccess} 
                options={options}
                >
                {availablePages.map((_: any, index: number) => (
                    <div key={`page_${index + startPage}`}>
                    <Page
                        pageNumber={index + startPage}
                        renderMode='canvas'
                        width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                    />
                    {index + startPage === endPage - 4 && (<span ref={ref} />)}
                    </div> 
                ))}
                {(startPage + endPage <= numPages) && <div ref={ref}>Loading More...</div>}
            </Document>
        </div>
    )
}