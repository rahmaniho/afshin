import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/vazirmatn";
import "@fontsource-variable/noto-naskh-arabic";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "remixicon/fonts/remixicon.css";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
