import { createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import Home from "./pages/Home";
import FetchRq from "./pages/FetchRq";
import Fetchold from "./pages/Fetchold";

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
  return <RouterProvider router={router}></RouterProvider>
}

export default App;
