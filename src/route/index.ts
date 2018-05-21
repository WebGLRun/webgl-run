import * as React from 'react'
import Index from '../components/Index/Index'
import OAuth from '../components/OAuth/OAuth'

const routes = [
  {
    path: '/',
    exact: true,
    component: Index,
    name: 'Index'
  },
  {
    path: '/oauth/:source',
    exact: true,
    component: OAuth,
    name: 'OAuth'
  }
]

export default routes