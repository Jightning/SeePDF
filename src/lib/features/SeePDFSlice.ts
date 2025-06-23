import { ThemeOption } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PDFDocumentProxy } from 'pdfjs-dist'

export interface ISeePDFState {
	// Page theme
	theme: ThemeOption,
	// Page number to scroll to (not always current page number)
	scrollToPageNumber: number | null,
}

const initialState: ISeePDFState = {
	theme: {
        id: "system",
        name: "System",
        mode: "system",
    },
	scrollToPageNumber: null,
}

export const SeePDFSlice = createSlice({
	name: 'SeePDF',
	initialState,
	reducers: {
		newTheme: (state, action: PayloadAction<ThemeOption>) => {
			state.theme = action.payload
		},
		setScrollPage(state, action: PayloadAction<ISeePDFState["scrollToPageNumber"]>) {
            state.scrollToPageNumber = action.payload;
        },
	},
})

// Export the Reducers
export const { newTheme, setScrollPage } = SeePDFSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTheme = (state: { SeePDF: { theme: ThemeOption; }; }) => state.SeePDF.theme
export const selectScrollToPageNumber = (state: { SeePDF: { scrollToPageNumber: number | null; }; }) => state.SeePDF.scrollToPageNumber

export default SeePDFSlice.reducer