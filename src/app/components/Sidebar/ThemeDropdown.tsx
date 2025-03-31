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

export default function ThemeDropdown ({className}: {className?: string}) {
    const [selected, setSelected] = useState<React.Key | null>(null);
    const { setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (selected === "system" || selected === "dark" || selected === "light") {
            setTheme(selected);
            setSelected(selected);
        }

    }, [selected, setTheme]);

    // To wait until the component is mounted to avoid a flash of light theme
    useEffect(() => {
        setMounted(true);
    }, []);

    // if (!mounted) return null;
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
                onAction={(key) => setSelected(key)}
            >
                <DropdownItem key="light">
                    <SunIcon className="size-5" />
                    <p>Light</p>
                </DropdownItem>

                <DropdownItem key="dark">
                    <MoonIcon className="size-5" />
                    <p>Dark</p>
                </DropdownItem>

                <DropdownItem key="system">
                    <ComputerDesktopIcon className="size-5" />
                    <p>System</p>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};