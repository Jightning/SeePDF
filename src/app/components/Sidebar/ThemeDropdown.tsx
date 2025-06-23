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
    BellIcon
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemeOption } from "@/types";

const themeOptions: ThemeOption[] = [
    {
        id: "light",
        name: "Light",
        mode: "light",
        icon: <SunIcon className='size-5' />,
    },
    {
        id: "dark",
        name: "Dark",
        mode: "dark",
        icon: <MoonIcon className='size-5' />,
    },
    {
        id: "system",
        name: "System",
        mode: "system",
        icon: <ComputerDesktopIcon className='size-5' />,
    },
    {
        id: "lord",
        name: "Lord",
        mode: "dark",
        icon: <BellIcon className='size-5' />,
    }
];

export default function ThemeDropdown ({className}: {className?: string}) {
    const [selected, setSelected] = useState<ThemeOption | null>(null);
    const [mounted, setMounted] = useState(false);

    const { setTheme } = useTheme();

    useEffect(() => {
        selected && setTheme(selected.id); 
        setSelected(selected);
    }, [selected, setTheme]);

    // To handle theme changes from other tabs
    useEffect(() => {
        function handleStorage(event: StorageEvent) {
            if (event.key === "theme") {
                const newTheme = event.newValue;
                setSelected(themeOptions.find((option) => option.id === newTheme) ?? null);
                setTheme(newTheme || "system");
            }
        }

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [setTheme]);

    // To wait until the component is mounted to avoid a flash of light
    useEffect(() => {
        setMounted(true);
        setSelected(themeOptions.find((option) => option.id === localStorage.getItem("theme")) ?? null);

        document.documentElement.setAttribute('data-theme', 'light');
    }, []);

    if (!mounted) return null;
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button className={'theme-button ' + className}>
                    <MoonIcon
                        className={'size-5 text-gray-900 ' + 
                            (selected?.mode === "dark" ? "inline" : "hidden dark:inline")
                        }
                        aria-hidden='true'
                    />
                    <SunIcon
                        className={'size-5 text-gray-900 ' +
                            (selected?.mode === "dark" ? "hidden" : "inline dark:hidden")
                        }
                        aria-hidden='true'
                    />
                </Button>
            </DropdownTrigger>
            
            <DropdownMenu 
                aria-label="Theme" 
                className='theme-dropdown'
                onAction={(key) => setSelected(themeOptions.find((option) => option.id === key) ?? null)}
            >
                {themeOptions.map((option: any) => (
                    <DropdownItem key={option.id} className={selected?.id===option.id ? "active": ""}>
                        {option.icon}
                        <p>{option.name}</p>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};