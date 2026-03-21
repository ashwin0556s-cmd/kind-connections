import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { seedSampleData } from "./lib/seed";

seedSampleData();

createRoot(document.getElementById("root")!).render(<App />);
