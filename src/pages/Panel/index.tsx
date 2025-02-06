import React from "react";
import { createRoot } from "react-dom/client";
import Panel from "./Panel";
import "./index.css";

const container = document.getElementById("app-container") as HTMLElement;
const root = createRoot(container);
root.render(<React.StrictMode><Panel /></React.StrictMode>);
