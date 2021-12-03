import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { PrivateRoute } from 'hoc'

// ? lazy load the pages when called
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
const TimeTable = lazy(() => import('pages/Timetable'))

const DashboardLayout = lazy(() => import('hoc/DashboardLayout'))

// ? authentication necessary for all dashboard routes
export const DashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route path="" element={<Home />} />
      <Route path="courses">
        <Route path="" element={<CourseFinder />} />
        <Route path=":code" element={<CoursePage />}>
          <Route path="" />
          <Route path=":titleSlug" />
        </Route>
      </Route>
      <Route path="contribute" element={<Contribute />} />
      <Route path="favourites" element={<Favourites />} />
      <Route path="settings" element={<Settings />} />
      <Route path="contact" element={<Contact />} />
      <Route path="timetable" element={<TimeTable />} />
      <Route path="logout" element={<Logout />} />
      {/* 404 page */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>
  </Routes>
)

// ! IMPORTANT: Remember to update any route changes on the sitemap
export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/404" element={<NotFound />} />
    <Route
      path="*"
      element={<PrivateRoute component={DashboardRoutes} redirectTo="/login" />}
    />
  </Routes>
)
