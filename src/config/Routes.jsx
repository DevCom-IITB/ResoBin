import { lazy } from 'react'

// lazy load the pages when called
const Courses = lazy(() => import('pages/Courses'))
const Contribute = lazy(() => import('pages/Contribute'))
const Contact = lazy(() => import('pages/Contact'))
const Favourites = lazy(() => import('pages/Favourites'))
const Settings = lazy(() => import('pages/Settings'))
const Home = lazy(() => import('pages/Home'))

const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: Home,
  },

  {
    name: 'Courses',
    path: '/courses/:courseCode?/:slug?',
    exact: false,
    component: Courses,
  },

  {
    name: 'Contribute',
    path: '/contribute',
    exact: true,
    component: Contribute,
  },

  {
    name: 'Favourites',
    path: '/favourites',
    exact: true,
    component: Favourites,
  },

  {
    name: 'Settings',
    path: '/settings',
    exact: true,
    component: Settings,
  },

  {
    name: 'Contact Us',
    path: '/contact',
    exact: true,
    component: Contact,
  },
]

export default routes
