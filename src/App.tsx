import GlobalStyle from "./GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
