"use client"

import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InstanceDetailsPopup from './InstanceDetails';
import { Tooltip } from '@heroui/react';

import { Instance } from '@/types';

import "./sidebar.css";
import { useHeader } from './Header';

import { SeePDFContext } from '@/providers/Provider';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [editing, setEditing] = useState<Instance | null>(null);
    const {isMinimized, Header} = useHeader()

    const { instances, adjustInstances, setPDFInstance } = useContext(SeePDFContext)

    const openInstance = (instance: Instance) => {
        setPDFInstance(instance);
    }

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
                        {instances.map((instance: Instance) => (
                            <Tooltip 
                                content={instance.name}
                                className="instance-tooltip" 
                                delay={500} 
                                closeDelay={100} 
                                showArrow={true} 
                                offset={-2}
                                key={instance.id}
                            >
                                {editing && editing.id === instance.id ? (
                                        <form
                                            onSubmit={e => {
                                                e.preventDefault();
                                                adjustInstances(editing);
                                                setEditing(null);
                                            }}
                                            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                                        >
                                            <input
                                                value={editing.name}
                                                onChange={e => setEditing((prev: any) => ({...prev, name: e.target.value}))}
                                                autoFocus
                                                onBlur={() => {
                                                    adjustInstances(editing);
                                                    setEditing(null);
                                                }}
                                            />
                                        </form>
                                    ) : (
                                    <li onClick={() => openInstance(instance)}>
                                        <p>{instance.name}</p>
                                        <InstanceDetailsPopup instance={instance} setEditing={setEditing} />
                                    </li> 
                                )}
                            </Tooltip>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
