"use client"

import React, { useState } from 'react';
import "./sidebar.css";
import DarkModeSelector from './DarkModeSelect';
import { Tooltip } from '@heroui/react';
import { Instances } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import InstanceDetailsPopup from './InstanceDetails';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
    const [openInstanceDetails, setOpenInstanceDetails] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const instances: Instances[] = [
        {name: "First Item", id: uuidv4()}, 
        {name: "Item 2222222222222222222222222222222222222222222222", id: uuidv4()}, 
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()},
        {name: "Item 3", id: uuidv4()}];

    if (!isSidebarOpen) return (
        <div className="minimized-sidebar-container">
            <div className="sidebar-header-container-minimized">
                <div className="sidebar-title-container-minimized"><h2 className='playwrite-hu'>SeePDF</h2></div>
                <div className="sidebar-header-content-minimized">
                    <div className={"open-sidebar-button"}
                        onClick={() => setIsSidebarOpen((prevOpen) => !prevOpen)}>
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
                    <DarkModeSelector/>
                </div>
            </div>
        </div>
    );

    return (
        <div className='sidebar-container'>
            <div className="sidebar-header-container">
                <div className="sidebar-title-container"><h2 className='playwrite-hu'>SeePDF</h2></div>
                <div className="sidebar-header-content">
                    <Button className='header-import-button'>
                        <DocumentArrowUpIcon/>
                        <p>Import</p>
                    </Button>
                    <DarkModeSelector className=""/>
                    <div className={"close-sidebar-button"}
                        onClick={() => setIsSidebarOpen((prevOpen) => !prevOpen)}>
                        <Image 
                            src={"/sidebar-hide-svgrepo-com.svg"} 
                            alt="Close Sidebar" 
                            className="dark:invert"
                            height={20}
                            width={20}/>
                    </div>
                </div>
            </div>
            {/* All instances */}
            <div className="sidebar-instances-container">
                <h1 className="border-b-2 text-lg items-center w-fit pr-12">Instances</h1>
                <ul className='instances-list-container'>
                    {instances.map((instance) => (
                        <Tooltip 
                            content={instance.name}
                            className="instance-tooltip" 
                            delay={500} 
                            closeDelay={100} 
                            showArrow={true} 
                            offset={-2}
                            key={instance.id}
                        >
                            <li>
                                <p>{instance.name}</p>
                                <InstanceDetailsPopup />
                            </li>
                        </Tooltip>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
