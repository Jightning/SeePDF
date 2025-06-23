export type PDFFile = string | File | null;

export type Instance = {
    name: string,
    id: string,
    file: PDFFile
}

export type ThemeOption = {
    id: string; // name of the theme (when used in class and in storage)
    name: string; // name of the theme (for display purposes)
    mode: "light" | "dark" | "system", // mode of the theme (has )
    icon?: React.ReactNode; // icon of the theme (for display purposes)
};