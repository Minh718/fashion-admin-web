
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/homePage/index.tsx";
import Home from './pages/index.tsx';
import ProductsAdmin from "./pages/products/index.tsx";
import AddProductPage from "./pages/AddProductPage/index.tsx";
import ProductDetailPage from "./pages/detailProduct/index.jsx";
import MessagesPage from "./pages/messagePage/index.tsx";
import LoginPage from "./pages/login/index.tsx";
function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/",
      element: <Home />,
      // loader: () => getAllCategories(),
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/products",
          element: <ProductsAdmin />,
        },
        {
          path: "/product/add",
          element: <AddProductPage />,
        },
        {
          path: "/product/detail/:id",
          element: <ProductDetailPage />,
        },
        {
          path: "/messages",
          element: <MessagesPage />,
        },
      ]
    }]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
