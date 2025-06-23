import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Button } from "@heroui/react"
import Image from 'next/image';
import { useState } from 'react';

export function useHeader() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);    
    
    let Header = () => (
        <div className="info-view-header-container">
            <div className={"close-info-view-button"}
                onClick={() => setIsSidebarClosed((prevClosed) => !prevClosed)}>
                <Image 
                    src={"/sidebar-open-svgrepo-com.svg"} 
                    alt="Close Info View" 
                    className={"invertible"}
                    height={20}
                    width={20}/>
            </div>
            <Button className='info-view-settings-button'>
                <Cog6ToothIcon/>
                <p>Settings</p>
            </Button>
        </div>
    )

    if (isSidebarClosed) {
        Header = () => (
            <div className="info-view-header-container-minimized">
                <div className={"open-info-view-button"}
                    onClick={() => setIsSidebarClosed((prevClosed) => !prevClosed)}>
                    <Image 
                        src={"/sidebar-hide-svgrepo-com.svg"} 
                        alt="Open Info View" 
                        className="invertible"
                        height={20}
                        width={20}/>
                </div>
                <Button className='info-view-settings-button-minimized'>
                    <Cog6ToothIcon/>
                </Button>
            </div>
        )
    }
    
    return {isMinimized: isSidebarClosed, Header}

}