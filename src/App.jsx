import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/signIn";
import SignUpPage from "./pages/signUp";
import DashboardPage from "./pages/dashboard";
import ReportPage from "./pages/report";
import DonationPage from "./pages/Donation";
import MapPage from "./pages/Map";
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import HistoryPage from "./pages/HistoryPage"; 

const App = () => {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <DashboardPage />,
    },
    {
      path: "/dashboard", 
      element: <DashboardPage />,
    },
    {
      path: "/login",
      element: <SignInPage />,
    },
    {
      path: "/register",
      element: <SignUpPage />,
    },
    {
      path: "/report",
      element: <ReportPage />,
    },
    { 
      path: "/donation", 
      element: <DonationPage /> 
    },
    { 
      path: "/map", 
      element: <MapPage /> 
    },
    { 
      path: "/profile", 
      element: <ProfilePage /> 
    },
    { 
      path: "/settings", 
      element: <SettingsPage /> 
    },
    { 
      path: "/history", 
      element: <HistoryPage /> 
    },
  ]);

  return <RouterProvider router={myRouter} />;
};

export default App;