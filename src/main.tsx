import { createRoot } from "react-dom/client";
import App from "@/app/App";
import { branding } from "@/core/branding";
import "leaflet/dist/leaflet.css";
import "./index.css";

document.title = branding.name;

const favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
if (favicon) {
  favicon.href = branding.favicon;
  favicon.type = branding.faviconType;
} else {
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = branding.favicon;
  link.type = branding.faviconType;
  document.head.appendChild(link);
}

createRoot(document.getElementById("root")!).render(<App />);
