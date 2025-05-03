import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/homePage/index.tsx";
import Home from "./pages/index.tsx";
import ProductsAdmin from "./pages/products/index.tsx";
import AddProductPage from "./pages/AddProductPage/index.jsx";
import ProductDetailPage from "./pages/detailProduct/index.jsx";
import MessagesPage from "./pages/messagePage/index.tsx";
import LoginPage from "./pages/login/index.tsx";
import React, { ReactNode, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/index.tsx";
import { initializeUser } from "./store/user/userSlice.tsx";
import Loading from "./components/Loading.tsx";
import CategoryDetail from "./pages/CategoryDetail/index.jsx";
import Vouchers from "./pages/Vouchers/index.jsx";
import Users from "./pages/users/index.jsx";
import Slides from "./pages/slides/index.jsx";
import Categories from "./pages/categories/index.jsx";
import Orders from "./pages/orders/index.jsx";
import DetailOrderPage from "./pages/orderDetail/index.jsx";
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state: any) => state.user);

  if (loading) {
    return <Loading />; // Replace with a spinner or placeholder if needed
  }

  return isAuthenticated ? children : <Navigate to="/signin" />;
};
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user
  );

  const memoizedInitializeUser = useCallback(() => {
    initializeUser(dispatch);
  }, [dispatch]);

  useEffect(() => {
    memoizedInitializeUser();
  }, [memoizedInitializeUser]);
  const router = createBrowserRouter([
    {
      path: "/signin",
      element: isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />,
    },
    {
      path: "/ss",
      element: <CategoryDetail />,
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
          path: "/vouchers",
          element: <Vouchers />,
        },

        {
          path: "/users",
          element: <Users />,
        },

        {
          path: "/slides",
          element: <Slides />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/categories",
          element: <Categories />,
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
          path: "/order/detail/:id",
          element: <DetailOrderPage />,
        },
        {
          path: "/category/detail/:id",
          element: <CategoryDetail />,
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
