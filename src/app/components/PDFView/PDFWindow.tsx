"use client"

import { PDFFile } from '@/types';
import { useMemo, useEffect, useRef, useState, useContext } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { FixedSizeList as List, VariableSizeList } from 'react-window';
import { Virtuoso } from 'react-virtuoso'

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './PDFView.css';
import { useAppSelector } from '@/lib/hooks';
import { selectScrollToPageNumber, setScrollPage } from '@/lib/features/SeePDFSlice';
import { SeePDFContext } from '@/providers/Provider';
import { useDispatch } from 'react-redux';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const maxWidth = 700;


export default function PDFWindow () {
    const scrollToPageNumber = useAppSelector(selectScrollToPageNumber);
    const dispatch = useDispatch();

    const listRef = useRef<any>(null)
    const virtuosoRef = useRef<any>(null);

    const { PDF, setPDFDocument, instances  } = useContext(SeePDFContext)

    const [numPages, setNumPages] = useState<number>(0);
    const [isScrolling, setIsScrolling] = useState(false)

    const options = useMemo(() => ({
        cMapUrl: '/cmaps/',
        standardFontDataUrl: '/standard_fonts/',
    }), []);

    const [scale, setScale] = useState<number>(1.5)
    const [pageHeight, setPageHeight] = useState<number>(750)
    const [innerHeight, setInnerHeight] = useState<number>(1000)
    const [pageWidth, setPageWidth] = useState<number>(525);


    async function onDocumentLoadSuccess(pdf: any) {
        setNumPages(pdf.numPages);
        setPDFDocument(pdf)

        const page = await pdf.getPage(1);
        setPageWidth(page.view[2]);
        setPageHeight(page.view[3]);
    }

    useEffect(() => {
        // if (listRef.current && scrollToPageNumber) {
        //     listRef.current.scrollToItem(scrollToPageNumber - 1, 'start')
        // }
        if (virtuosoRef.current && scrollToPageNumber) {
            virtuosoRef.current.scrollToIndex({index: scrollToPageNumber - 1, align: 'start'});
            dispatch(setScrollPage(null));
        }
    }, [scrollToPageNumber])

    useEffect(() => {
        function handleResize() {
            console.log(window.innerWidth, window.innerHeight)
        }
        setInnerHeight(window.innerHeight)

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    function getPageSize(index: number) {
        return innerHeight;
    }

    return (
        <div className='pdf-virtual-scroll-container'>
            <Document 
                file={PDF.instance.file} 
                onLoadSuccess={onDocumentLoadSuccess} 
                options={options}
                onPassword={(callback) => callback('s3cr3t_p4ssw0rd')}
            >
                <header className='pdf-header'>
                    <h1>{PDF.instance.name}</h1>
                </header>

                <Virtuoso
                    ref={virtuosoRef}
                    style={{ height: innerHeight - 8, width: '100%' }}
                    totalCount={numPages}
                    // context={{ isScrolling }}
                    // isScrolling={setIsScrolling}
                    itemContent={(index) => (
                        <PDFPage index={index} />
                    )}
                    className='pdf-virtual-scroll-list'
                    // increaseViewportBy={500}
                />
                {/* <List
                    ref={listRef}
                    width={"100%"}
                    itemCount={numPages}
                    itemSize={innerHeight}
                    height={innerHeight}
                    className='pdf-virtual-scroll-list'>
                        {PDFPage}
                </List> */}
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
            onGetTextError={() => (console.log('Temporary TextLayer Error'))}
        />
    </div>
);

