# Docs

## General
### Working with Theme:
- Use the `invertible` (modified in `global.css`) class to invert based on dark/light mode
[Go to Sidebar for more on adding new themes](#sidebar)


## InfoView

| **File**               | **Description**                                                                 |
|-|-|
| `InfoView.tsx`| Provides more actionable utilities for the PDF and in general |
| `Header.tsx`| Header of the Info View. Contains `Settings` and the Minimize Info View Button. |
| `InfoView.css`| Replicated styling from `Sidebar`. |
---

## PDFView

| **File**                 | **Description**                                                                 |
|-|-|
| `PDFView.tsx`| Contains the principle view of the PDF |
| `PDFWindow.tsx`| Contains the PDF. Uses `react-window` to ensure that only the pages in/near the viewport are rendered so as to not not crash website with massive documents. |
| `PDFView.css`| Styling |


---

## Sidebar

| **File** | **Description** |
|-|-|
|`Header.tsx`| Header containing the title, Import PDF Button, and Theme Dropdown alongside the minimize PDF. |
|`InstanceDetails.tsx`| Button in each PDF instance in the *Instances* portion of the Sidebar. When clicked allows the user to either change the instance name or erase the instance entirely.  |
|`Sidebar.tsx`| Sidebar containing theme changer, pdf import, and different instances |
|`ThemeDropdown.tsx`| Allows the user to switch between various themes using `next-themes` (provider in `~/src/providers/`)   |
|`sidebar.css`| Styling |

**How To Add A New Theme:**
1. First add the theme's object to `themeOptions` in `ThemeDropdown.tsx`.
2. Add the theme as a class into `~/app/global.css`.
    - If you want to theme to inherit dark mode attributes, add in `color-scheme: dark;` to the class.
3. In the `ThemeProvider` in `~\src\providers\Provider.tsx`, add the theme's id to the array in `themes`.

---

## Notes