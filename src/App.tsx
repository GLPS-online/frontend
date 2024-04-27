import GlobalStyle from "./GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./contexts/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Router />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
