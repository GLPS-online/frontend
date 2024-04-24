import GlobalStyle from "./GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./contexts/AuthProvider";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Router />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
