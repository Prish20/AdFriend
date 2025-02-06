import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Newtab from "./Newtab";

const container = document.getElementById("app-container") as HTMLElement;
const root = createRoot(container);
root.render(<React.StrictMode><Newtab /></React.StrictMode>);
