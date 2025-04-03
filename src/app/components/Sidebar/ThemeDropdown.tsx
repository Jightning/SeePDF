"use client"

import { 
    Button, 
    Dropdown, 
    DropdownItem, 
    DropdownMenu, 
    DropdownTrigger,
} from "@heroui/react";
import {
    SunIcon,
    MoonIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type ThemeOption = {
    id: string;
    name: string;
    icon: React.ReactNode;
};

const themeOptions: ThemeOption[] = [
    {
        id: "light",
        name: "Light",
        icon: <SunIcon className='size-5' />,
    },
    {
        id: "dark",
        name: "Dark",
        icon: <MoonIcon className='size-5' />,
    },
    {
        id: "system",
        name: "System",
        icon: <ComputerDesktopIcon className='size-5' />,
    },
];

export default function ThemeDropdown ({className}: {className?: string}) {
    const [selected, setSelected] = useState<string | null>(null);
    const { setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        selected && setTheme(selected);
        setSelected(selected);  
    }, [selected, setTheme]);

    // To wait until the component is mounted to avoid a flash of light
    useEffect(() => {
        setMounted(true);
        setSelected(localStorage.getItem("theme"));
    }, []);

    if (!mounted) return null;
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button className={'theme-button ' + className}>
                    <MoonIcon
                        className='size-5 text-gray-900 dark:text-gray-50 hidden dark:inline'
                        aria-hidden='true'
                    />
                    <SunIcon
                        className='size-5 text-gray-900 dark:text-gray-50 dark:hidden'
                        aria-hidden='true'
                    />
                </Button>
            </DropdownTrigger>
            
            <DropdownMenu 
                aria-label="Theme" 
                className='theme-dropdown'
                onAction={(key) => setSelected(key.toString())}
            >
                {themeOptions.map((option: any) => (
                    <DropdownItem key={option.id} className={selected===option.id ? "active": ""}>
                        {option.icon}
                        <p>{option.name}</p>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};