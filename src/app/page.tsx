import InfoView from "./components/InfoView/InfoView";
import PDFView from "./components/PDFView/PDFView";
import Sidebar from "./components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="home-container min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Sidebar />
      <PDFView />
      <InfoView />
    </div>
  );
}

//  grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]