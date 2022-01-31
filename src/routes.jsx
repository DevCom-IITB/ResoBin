import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AnimatedRoutes, PrivateRoute } from 'hoc'

// ? lazy load the pages when called
const Dashboard = lazy(() => import('hoc/DashboardLayout'))
const Login = lazy(() => import('pages/Login'))
const NotFound = lazy(() => import('pages/NotFound'))
const Home = lazy(() => import('pages/Home'))
const CourseFinder = lazy(() => import('pages/CourseFinder'))
const CoursePage = lazy(() => import('pages/CoursePage'))
const Contribute = lazy(() => import('pages/Contribute'))
const Contact = lazy(() => import('pages/Contact'))
const Favourites = lazy(() => import('pages/Favourites'))
const Logout = lazy(() => import('pages/Logout'))
const Settings = lazy(() => import('pages/Settings'))
const Timetable = lazy(() => import('pages/Timetable'))
const TimetableCustom = lazy(() => import('pages/TimetableCustom'))
const Privacy = lazy(() => import('pages/Privacy'))
const Terms = lazy(() => import('pages/Terms'))

// ? authentication necessary for all dashboard routes
export const DashboardRoutes = () => (
  <AnimatedRoutes>
    <Route path="/" element={<Home />} />
    <Route path="/courses">
      <Route path="" element={<CourseFinder />} />
      <Route path=":code">
        <Route path="" element={<CoursePage />} />
        <Route path=":titleSlug" element={<CoursePage />} />
      </Route>
    </Route>
    <Route path="/contribute" element={<Contribute />} />
    <Route path="/favourites" element={<Favourites />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/timetable">
      <Route path="" element={<Timetable />} />
      <Route path="custom" element={<TimetableCustom />} />
    </Route>
    <Route path="/logout" element={<Logout />} />
    <Route path="/404" element={<NotFound />} />
    <Route path="/privacy-policy" element={<Privacy />} />
    <Route path="/terms-and-conditions" element={<Terms />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </AnimatedRoutes>
)

// ! IMPORTANT: Remember to update any route changes on the sitemap
export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="*"
      element={<PrivateRoute component={Dashboard} redirectTo="/login" />}
    />
  </Routes>
)
