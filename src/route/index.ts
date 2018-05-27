import * as React from 'react'
import Index from '../components/Index/Index'
import OAuth from '../components/OAuth/OAuth'
import Dashboard from '../components/Dashboard/Dashboard'

const routes = [
  {
    path: '/',
    exact: true,
    component: Index,
    name: 'Index'
  },
  {
    path: '/:canvasHash',
    exact: true,
    component: Index,
    name: 'Canvas'
  },
  {
    path: '/u/dashboard',
    exact: true,
    component: Dashboard,
    name: 'Dashboard'
  },
  {
    path: '/oauth/:source',
    exact: true,
    component: OAuth,
    name: 'OAuth'
  }
]

export default routes