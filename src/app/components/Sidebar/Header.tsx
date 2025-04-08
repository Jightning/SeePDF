import { DocumentArrowUpIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { Button } from "@heroui/react"
import ThemeDropdown from './ThemeDropdown';
import Image from 'next/image';
import { useState } from 'react';

export function useHeader() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    let Header = () => (
        <div className="sidebar-header-container">
            <div className="sidebar-title-container"><h2 className='playwrite-hu'>SeePDF</h2></div>
            <div className="sidebar-header-content">
                <Button className='header-import-button'>
                    <DocumentArrowUpIcon/>
                    <p>Import</p>
                </Button>
                <ThemeDropdown />
                <div className={"close-sidebar-button"}
                    onClick={() => setIsSidebarClosed((prevClosed) => !prevClosed)}>
                    <Image 
                        src={"/sidebar-hide-svgrepo-com.svg"} 
                        alt="Close Sidebar" 
                        className="dark:invert"
                        height={20}
                        width={20}/>
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
                        className="dark:invert"
                        height={20}
                        width={20}/>
                </div>
                <Button className='header-import-button-minimized'>
                    <DocumentArrowUpIcon/>
                </Button>
                <ThemeDropdown className='minimized-theme-container' />
            </div>
        </div>
    }
    
    return {isMinimized: isSidebarClosed, Header}

}