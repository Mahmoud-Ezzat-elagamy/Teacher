import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Main from "./pages/Main";
import Courses from "./pages/Courses";
import AppLayout from "./components/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseDetails from "./pages/CourseDetails";
import PaymentPage from "./pages/PaymentPage";
import Lessonage from "./pages/Lessonpage";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import AdminCourses from "./pages/AdminCourses";
// import ProtectedRouter from "./pages/ProtectedRouter";
import Modal from "./components/Modal";
import Students from "./pages/Studentspage";
// import ProtectedAdminRouter from "./pages/ProtectedAdminRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 0,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Modal>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                // <ProtectedRouter>
                <AppLayout />
                // </ProtectedRouter>
              }
            >
              <Route index element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<Main />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/courses/:id/:lessonId" element={<Lessonage />} />
              <Route path="/courses/:id/enroll" element={<PaymentPage />} />

              <Route
                path="/dashboard"
                // element={
                //   <ProtectedAdminRouter>
                //     <DashboardLayout />
                //   </ProtectedAdminRouter>
                // }
                element={<DashboardLayout />}
              >
                <Route index element={<Dashboard />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="students" element={<Students />} />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </Modal>
    </QueryClientProvider>
  );
}

export default App;
