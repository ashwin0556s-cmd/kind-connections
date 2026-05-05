import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerVisitor } from "./lib/device";

registerVisitor();

createRoot(document.getElementById("root")!).render(<App />);
