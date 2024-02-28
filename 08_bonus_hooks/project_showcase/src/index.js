import { createRoot } from "react-dom/client";
import { router } from "./routes";

import "./index.css"
import { RouterProvider } from "react-router-dom";
import ProjectsProvider from "./context/ProjectsProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

console.log("🚀 ~ router:", router)
root.render(
  <ProjectsProvider>
    <RouterProvider router={router} />
  </ProjectsProvider>
);