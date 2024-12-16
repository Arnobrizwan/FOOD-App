import './App.css';
import Login from './auth/login'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import MainLayout from './layout/MainLayout';
import Signup from './auth/Signup';
import ForgetPassword from "./auth/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HereSection from './components/HereSection';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,//use mainlayout or navbar  
    children: [
      {
        path:"/",
        element:<HereSection/>
      }
    ],
  },  
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup /> 
      },
      {
        path: "/forget-password",
        element: <ForgetPassword /> 
      },
      {
        path: "/reset-password",
        element: <ResetPassword /> 
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
    
  
]);

function App() {
  return (
    <main className="min-h-screen">
      <RouterProvider router={appRouter} />
    </main>
  );
}


export default App;