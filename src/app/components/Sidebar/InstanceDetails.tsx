import React, { useContext, useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react"
import {TrashIcon, PencilSquareIcon, EllipsisVerticalIcon} from "@heroicons/react/24/outline";
import { SeePDFContext } from '@/providers/Provider';
import { Instance } from '@/types';



const InstanceDetailsPopup = ({instance, setEditing}: {instance: Instance, setEditing: any}) => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const { adjustInstances, deleteInstance } = useContext(SeePDFContext)

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
                    <Button className="" onPress={() => setEditing(instance)}>
                        <PencilSquareIcon className="icon"/>
                        <p>Rename</p>
                    </Button>
                    <Button className='delete-icon text-red-600' onPress={() => deleteInstance(instance.id)}>
                        <TrashIcon className="icon"/>
                        <p>Delete</p>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default InstanceDetailsPopup;