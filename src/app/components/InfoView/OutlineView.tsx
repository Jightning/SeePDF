import { setScrollPage } from '@/lib/features/SeePDFSlice';
import { useAppDispatch } from '@/lib/hooks';
import { SeePDFContext } from '@/providers/Provider';
import React, { useContext } from 'react';
import { Outline } from 'react-pdf';

const OutlineView = () => {
    const dispatch = useAppDispatch()
    const { PDF } = useContext(SeePDFContext)
    
    const onClick = ({ dest, pageIndex, pageNumber }: any) => {
        dispatch(setScrollPage(Number(pageNumber)));
    }

    return (
        <div className="outline-view">
            {PDF.document ?
                <Outline 
                    pdf={PDF.document} 
                    onItemClick={onClick} 
                    className="chapter-view-outline"
                    onLoadError={() => console.log("Error Loading Outline")} />
            : "No PDF Loaded"}
        </div>
    );
};

export default OutlineView;