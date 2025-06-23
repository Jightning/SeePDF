"use client"

import { ThemeProvider } from "next-themes";
import { createContext, useRef, useState } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/store'
import { PDFDocumentProxy } from "pdfjs-dist";
import { Instance } from "@/types";

type PDFType = {instance: Instance, document: PDFDocumentProxy | null}

export const SeePDFContext = createContext<any>(null)

export default function Provider({children}: {children: React.ReactNode}) {
    const storeRef = useRef<AppStore>(null)

    if (!storeRef.current) {
      // Create the store instance the first time this renders
      // To prevent rerendering store every time
      storeRef.current = makeStore()
    }
    const initialInst = {name: "Lord of the Mysteries", id: "111", file: "/Lord_of_Mysteries.pdf"}
    const [PDF, setPDF] = useState<PDFType>({instance: initialInst, document: null})

    const setPDFInstance = (instance: PDFType["instance"]) => setPDF((prev) => ({...prev, instance}))
    const setPDFDocument = (document: PDFType["document"]) => setPDF((prev) => ({...prev, document}))

    const [instances, setInstances] = useState<Instance[]>([initialInst])
    const adjustInstances = (inst: Instance) => {
        setInstances((prev): any => 
            {
                console.log(inst)
                let index = prev.findIndex(i => i.id === inst.id)
                if (index !== -1) {
                    return [...prev.slice(0, index), inst, ...prev.slice(index + 1)]
                }
                return [...prev, inst]
            }
        )
    }
    const deleteInstance = (id: string) => {
        setInstances((prev) => prev.filter((inst) => inst.id !== id))
    }
  
    return (
        <SeePDFContext.Provider value={{ 
            PDF, 
            setPDF, 
            setPDFInstance,
            setPDFDocument, 
            instances,
            adjustInstances, 
            deleteInstance 
        }}>
            <ReduxProvider store={storeRef.current}>
                <ThemeProvider 
                    attribute='class'
                    themes={["light", "dark", "system", "lord"]}
                >
                    {children}
                </ThemeProvider>
            </ReduxProvider>
        </SeePDFContext.Provider>
    );
}