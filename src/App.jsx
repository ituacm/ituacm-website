import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import EventsPage from "./pages/EventsPage/EventsPage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import { eventsLoader } from "./loaders/eventsLoader";
import Layout from "./pages/layouts/Layout.jsx";
import CoursesPage from "./pages/CoursesPage/CoursesPage.jsx";
import CalendarPage from "./pages/CalendarPage/CalendarPage.jsx";
import { boardMembersLoader } from "./loaders/boardMembersLoader";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import { coursesLoader } from "./loaders/coursesLoader";
import { calendarLoader } from "./loaders/calendarLoader";
import { homeLoader } from "./loaders/homeLoader";
import NotFoundPage from "./pages/404Page/NotFoundPage.jsx";
import AdminRedirect from "./pages/AdminRedirect/AdminRedirect.jsx";
import AdminLogin from "./components/AdminLogin/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import BoardMembersDashboard from "./components/BoardMembersDashboard/BoardMembersDashboard.jsx";
import CoursesDashboard from "./components/CoursesDashboard/CoursesDashboard.jsx";
import EventsDashboard from "./components/EventsDashboard/EventsDashboard.jsx";
import EventDashboard from "./components/EventDashboard/EventDashboard.jsx";
import CourseDashboard from "./components/CourseDashboard/CourseDashboard.jsx";
import BoardMemberDashboard from "./components/BoardMemberDashboard/BoardMemberDashboard.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <HomePage />, loader: homeLoader },
        { path: "events", element: <EventsPage />, loader: eventsLoader },
        { path: "contact", element: <ContactPage /> },
        { path: "about", element: <AboutPage />, loader: boardMembersLoader },
        { path: "courses", element: <CoursesPage />, loader: coursesLoader },
        { path: "calendar", element: <CalendarPage />, loader: calendarLoader },
        {
          path: "admin",
          element: <AdminRedirect />,
          children: [
            {
              path: "dashboard",
              element: <AdminDashboard />,
            },
            {
              path: "dashboard/events",
              element: <EventsDashboard />,
              loader: eventsLoader,
            },
            {
              path: "dashboard/events/:eventId",
              element: <EventDashboard />,
            },
            {
              path: "dashboard/courses",
              element: <CoursesDashboard />,
              loader: coursesLoader,
            },
            {
              path: "dashboard/courses/:courseId",
              element: <CourseDashboard />,
            },
            {
              path: "dashboard/board-members",
              element: <BoardMembersDashboard />,
              loader: boardMembersLoader,
            },
            {
              path: "dashboard/board-members/:boardMemberId",
              element: <BoardMemberDashboard />,
            },
            { path: "login", element: <AdminLogin /> },
          ],
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
