import { DocumentArrowUpIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { Button } from "@heroui/react"
import ThemeDropdown from './ThemeDropdown';
import Image from 'next/image';
import { useContext, useRef, useState } from 'react';
import { SeePDFContext } from '@/providers/Provider';
import { v4 as uuidv4 } from 'uuid';

export function useHeader() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { PDF, setPDFInstance, adjustInstances } = useContext(SeePDFContext)

    const handlePDFImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const inst = {
                name: file.name,
                id: uuidv4(),
                file: file
            }
            setPDFInstance(inst);
            adjustInstances(inst)
        }
    }

    let Header = () => (
        <div className="sidebar-header-container">
            <div className="sidebar-title-container"><h2 className='playwrite-hu'>SeePDF</h2></div>
            <div className="sidebar-header-content">
                <Button 
                    className='header-import-button'
                    onPress={() => fileInputRef.current?.click()}>
                    <DocumentArrowUpIcon/>
                    <p>Import</p>
                </Button>
                <input
                    type="file"
                    accept="application/pdf"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handlePDFImport}
                />
                <ThemeDropdown />
                <div className={"close-sidebar-button"}
                    onClick={() => setIsSidebarClosed((prevClosed) => !prevClosed)}>
                    <Image 
                        src={"/sidebar-hide-svgrepo-com.svg"} 
                        alt="Close Sidebar" 
                        className="invertible"
                        height={20}
                        width={20} />
                </div>
            </div>
        </div>
    )

    if (isSidebarClosed) {
        Header = () => <div className="sidebar-header-container-minimized">
            <div className="sidebar-title-container-minimized"><h2 className='playwrite-hu'>SeePDF</h2></div>
            <div className="sidebar-header-content-minimized">
                <div className={"open-sidebar-button"}
                    onClick={() => setIsSidebarClosed((prevClosed) => !prevClosed)}>
                    <Image 
                        src={"/sidebar-open-svgrepo-com.svg"} 
                        alt="Open Sidebar" 
                        className="invertible"
                        height={20}
                        width={20}/>
                </div>
                <Button 
                    className='header-import-button-minimized'
                    onPress={() => fileInputRef.current?.click()}>
                    <DocumentArrowUpIcon/>
                </Button>
                <input
                    type="file"
                    accept="application/pdf"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handlePDFImport}
                />
                <ThemeDropdown className='minimized-theme-container' />
            </div>
        </div>
    }
    
    return {isMinimized: isSidebarClosed, Header}

}