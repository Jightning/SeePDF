import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react"
import {TrashIcon, PencilSquareIcon, EllipsisVerticalIcon} from "@heroicons/react/24/outline";


interface InstanceDetailsPopupProps {
    instanceName: string;
    onEdit: (newName: string) => void;
    onDelete: () => void;
    onClose: () => void;
}

const InstanceDetailsPopup= () => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Popover 
            placement="bottom-start" 
            onOpenChange={(open) => setIsOpen(open)}
        > 
            <PopoverTrigger>
                <Button className={"size-6 instance-choice-button dark:fill-[#fff] " + (isOpen && " active")}>
                    <EllipsisVerticalIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="instance-popup-container">
                    <Button className="">
                        <PencilSquareIcon className="icon"/>
                        <p>Rename</p>
                    </Button>
                    <Button className='delete-icon text-red-600'>
                        <TrashIcon className="icon"/>
                        <p>Delete</p>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default InstanceDetailsPopup;