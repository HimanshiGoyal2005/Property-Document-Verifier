import { useState } from "react";
import { TOKEN } from "./constants/tokens.js";
import { UploadPage } from "./components/UploadPage.jsx";
import { ResultsPage } from "./components/ResultsPage.jsx";
import "./styles/main.css";

export default function App() {
  const [report, setReport] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: TOKEN.bg }}>
      {!report ? (
        <UploadPage onAnalyse={setReport} />
      ) : (
        <ResultsPage report={report} onBack={() => setReport(null)} />
      )}
    </div>
  );
}
