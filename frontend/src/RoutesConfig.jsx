import { lazy } from 'react'
import { Login, NotFound } from 'pages'

// Lazy load the pages when called
const Courses = lazy(() => import('pages/Courses'))
const Contribute = lazy(() => import('pages/Contribute'))
const Contact = lazy(() => import('pages/Contact'))

const routes = [
  {
    path: '/dashboard',
    exact: true,
    name: 'Default',
    component: Courses,
  },
  {
    path: '/dashboard/courses',
    exact: true,
    name: 'Courses',
    component: Courses,
  },
  {
    path: '/dashboard/contribute',
    exact: true,
    name: 'Contribute',
    component: Contribute,
  },
  {
    path: '/dashboard/contact',
    exact: true,
    name: 'Contact Us',
    component: Contact,
  },
  {
    path: '/dashboard/404',
    exact: true,
    name: 'Not Found',
    component: NotFound,
  },
  {
    path: '/login',
    exact: true,
    name: 'Logout',
    component: Login,
  },
]

export default routes
