"use client";

import InfoView from "./components/InfoView/InfoView";
import PDFView from "./components/PDFView/PDFView";
import Sidebar from "./components/Sidebar/Sidebar";
import CoverImage from "./components/CoverImage";
import { useState } from "react";
import { PDFFile } from "@/types";
import { PDFDocumentProxy } from "pdfjs-dist";

export default function Home() {
	// file used (not the processed version from PDF react)
	const [file, setFile] = useState<PDFFile>("/Lord_of_Mysteries.pdf");
	// pdf document from react-pdf Document component
	const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);

	function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const { files } = event.target;

		const nextFile = files?.[0];

		if (nextFile) {
			setFile(nextFile);
		}
	}
	
	return (
		<div className="home-container relative overflow-hidden min-h-screen font-[family-name:var(--font-geist-sans)]">
			<CoverImage />
			<Sidebar />
			<PDFView />
			<InfoView />
		</div>
	);
}

//  grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]