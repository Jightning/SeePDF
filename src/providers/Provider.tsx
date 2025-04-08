import { ThemeProvider } from "next-themes";

export default function Provider({children}: {children: React.ReactNode}) {
    return (
        <ThemeProvider 
            attribute='class'
            themes={["light", "dark", "system", "lord"]}
        >
            {children}
        </ThemeProvider>
    );
}