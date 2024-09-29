import { createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import Home from "./pages/Home";
import FetchRq from "./pages/FetchRq";
import Fetchold from "./pages/Fetchold";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const router = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout />,
    children:[
      {
        path:"/",
        element:<Home/>    
      },
      {
        path:"/trad",
        element:<Fetchold/>
      },
      {
        path:"/rq",
        element:<FetchRq/>,
      }
    ]
  }

])
function App() {
   const queryClient = new QueryClient();


  return (
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router}></RouterProvider>
  </QueryClientProvider>
  )
}

export default App;
