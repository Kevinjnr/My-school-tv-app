import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const client = new QueryClient();
import Aos from "aos";
import "aos/dist/aos.css";
function App() {
  React.useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
