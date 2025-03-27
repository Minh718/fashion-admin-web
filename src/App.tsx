import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/homePage/index.tsx";
import Home from "./pages/index.tsx";
import ProductsAdmin from "./pages/products/index.tsx";
import AddProductPage from "./pages/AddProductPage/index.tsx";
import ProductDetailPage from "./pages/detailProduct/index.jsx";
import MessagesPage from "./pages/messagePage/index.tsx";
import LoginPage from "./pages/login/index.tsx";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store/index.tsx";
import { initializeUser } from "./store/user/userSlice.tsx";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state: any) => state.user);

  if (loading) {
    return <div>Loading</div>; // Replace with a spinner or placeholder if needed
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};
function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
