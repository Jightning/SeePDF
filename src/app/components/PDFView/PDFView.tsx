import dynamic from 'next/dynamic'

const PDFWindow = dynamic(() => import('./PDFWindow'))

export default function PDFView () {
    return (
        <div className="pdf-view-container overflow-auto">
            <PDFWindow/>
        </div>
    )
}