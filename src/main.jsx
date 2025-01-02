import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";

// Example: Log a page view
logEvent(analytics, "page_view", { page_path: "/" });

console.log("Analytics initialized:", analytics);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
