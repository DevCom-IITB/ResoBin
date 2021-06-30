import { lazy } from 'react'

// Lazy load the pages when called
const Courses = lazy(() => import('pages/Courses'))
const Contribute = lazy(() => import('pages/Contribute'))
const Contact = lazy(() => import('pages/Contact'))
const Favourites = lazy(() => import('pages/Favourites'))

const routes = [
  {
    name: 'Default',
    slug: '/',
    exact: true,
    component: Courses,
  },
  {
    name: 'Courses',
    slug: '/courses',
    exact: true,
    component: Courses,
  },
  {
    name: 'Contribute',
    slug: '/contribute',
    exact: true,
    component: Contribute,
  },
  {
    name: 'Favourites',
    slug: '/favourites',
    exact: true,
    component: Favourites,
  },
  {
    name: 'Contact Us',
    slug: '/contact',
    exact: true,
    component: Contact,
  },
]

export default routes
