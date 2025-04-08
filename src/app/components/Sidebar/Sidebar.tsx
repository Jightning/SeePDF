"use client"

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InstanceDetailsPopup from './InstanceDetails';
import { Tooltip } from '@heroui/react';

import { Instances } from '@/types';

import "./sidebar.css";
import { useHeader } from './Header';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const {isMinimized, Header} = useHeader()

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
        {name: "Item 3", id: uuidv4()}
    ];

    if (isMinimized) return (
        <div className="minimized-sidebar-container">
            <Header/>
        </div>
    );

    return (
        <div className={`${isMinimized
                        ? "minimized-sidebar-container"
                        : "sidebar-container"} 
                        ${isSidebarOpen ? "open" : ""}`}>
            <Header/>
            {/* All instances */}
            {!isMinimized && (
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
            )}
        </div>
    );
};

export default Sidebar;
