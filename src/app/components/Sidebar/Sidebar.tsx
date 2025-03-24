import React from 'react';
import "./sidebar.css";

const Sidebar = () => {
    return (
        <div className='sidebar-container'>
            <div className="sidebar-header-container">
                <div className="sidebar-title-container"><h2 className='playwrite-hu'>SeePDF</h2></div>
                <div className='header-import-button'>Import</div>
            </div>
            <div className="sidebar-instances-container">
                <h2 className="">Instances</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;