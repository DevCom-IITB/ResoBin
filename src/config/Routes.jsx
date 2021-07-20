import {
  BookOpen,
  ChartPie,
  CloudUpload,
  Cog,
  Logout,
} from '@styled-icons/heroicons-outline'
import { ContactSupport } from '@styled-icons/material-outlined'
import { BookmarkOutline } from '@styled-icons/zondicons'
import { lazy } from 'react'

// lazy load the pages when called
const Courses = lazy(() => import('pages/Courses'))
const Contribute = lazy(() => import('pages/Contribute'))
const Contact = lazy(() => import('pages/Contact'))
const Favourites = lazy(() => import('pages/Favourites'))
const Settings = lazy(() => import('pages/Settings'))

const routes = [
  // {
  //   name: 'Login',
  //   // path: '/',
  //   slug: '/login',
  //   exact: true,
  //   component: Login,
  //   icon: <BookOpen size="1.5rem" />,
  // },
  {
    name: 'Home',
    // path: '/',
    slug: '/',
    exact: true,
    component: Courses,
    navbar: {
      // use null to hide this route from the navbar
      horizontal: {
        icon: <BookOpen size="1.5rem" />,
      },
      vertical: {
        icon: <BookOpen size="1.5rem" />,
      },
    },
  },
  {
    name: 'Courses',
    slug: '/courses',
    exact: true,
    component: Courses,
    icon: <ContactSupport size="20" />,
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
  {
    name: 'Settings',
    slug: '/settings',
    exact: true,
    component: Settings,
  },
]

export default routes
