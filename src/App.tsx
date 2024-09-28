import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./components/auth-provider";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import Employee from "./pages/admin/employee";
import AdminLayout from "./pages/admin/layout";
import Performance from "./pages/admin/performance";
import ReviewTemplate from "./pages/admin/review-template";
import EmployeeLayout from "./pages/employee";
import Answers from "./pages/employee/Answers";
import AnswersForm from "./pages/employee/AnswersForm";
import MyReview from "./pages/employee/MyReview";
import ToReview from "./pages/employee/ToReview";
import ForgotPassword from "./pages/forgot-password";
import Login from "./pages/login";
import Register from "./pages/register";
import ResetPassword from "./pages/reset-password";

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
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
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
          {
            path: "/admin/review-template",
            element: <ReviewTemplate />,
          },
        ],
      },
      {
        path: "/employee",
        element: <EmployeeLayout />,
        children: [
          {
            index: true,
            element: <MyReview />,
          },
          {
            path: "/employee/to-review",
            element: <ToReview />,
          },
          {
            path: "/employee/my-review",
            element: <MyReview />,
          },
          {
            path: "/employee/my-review/:id",
            element: <AnswersForm />,
          },
          {
            path: "/employee/to-review/:id",
            element: <Answers />,
          },
        ],
      },
      {
        index: true,
        element: <Navigate to={"/login"} />,
      },
      {
        path: "*",
        element: <Navigate to={"/login"} />,
      },
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
