//@ts-nocheck

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./auth/Signup";

import ResetPassword from "./auth/ResetPassword";
import HereSection from "./components/HereSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetail from "./components/RestaurantDetail";

import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Success from "./components/Success";
import { useUserStore } from "./store/useUserStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "./components/Loading";
import { useThemeStore } from "./store/useThemeStore";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import Cart from "./components/Cart";
import DeliveryManOrders from "./deliveryMan/DeliveryManOrders";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // if (!user?.isVerified) {
  //   return <Navigate to="/verify-email" replace />;
  // }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />
  }

  return children;
}

const DeliveryManRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user?.deliveryUser) {
    return <Navigate to="/" replace />
  }

  return children;
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HereSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <Success />,
      },
      // admin services start from here
      {
        path: "/admin/restaurant",
        element: <AdminRoute><Restaurant /></AdminRoute>,
      },
      {
        path: "/admin/menu",
        element: <AdminRoute><AddMenu /></AdminRoute>,
      },
      {
        path: "/admin/orders",
        element: <AdminRoute><Orders /></AdminRoute>,
      },
      {
        path: "/delivery/orders",
        element: <DeliveryManRoute><DeliveryManOrders /></DeliveryManRoute>,
      }
    ],
  },
  {
    path: "/login",
    element: <AuthenticatedUser><Login /></AuthenticatedUser>,
  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser>,
  },
  {
    path: "/forgot-password",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  // {
  //   path: "/verify-email",
  //   element: <VerifyEmail />,
  // },
]);

function App() {
  const initializeTheme = useThemeStore((state: any) => state.initializeTheme);
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication])

  console.log('test')

  if (isCheckingAuth) return <Loading />
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <RouterProvider router={appRouter}></RouterProvider>
      </main>
    </QueryClientProvider>
  );
}

export default App;