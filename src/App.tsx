import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./components/auth-provider";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import Employee from "./pages/admin/employee";
import AdminLayout from "./pages/admin/layout";
import Performance from "./pages/admin/performance";
import Login from "./pages/login";
import Register from "./pages/register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Employee />,
          },
          {
            path: "/admin/employee",
            element: <Employee />,
          },
          {
            path: "/admin/performance",
            element: <Performance />,
          },
        ],
      },
      // {
      //   path: "/user",
      //   element: <Home />,
      // },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider delayDuration={200}>
          <Toaster position="top-center" />
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
