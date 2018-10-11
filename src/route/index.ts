import Index from '../components/Index/Index'
import OAuth from '../components/OAuth/OAuth'
import Dashboard from '../components/Dashboard/Dashboard'
import Embed from '../components/Embed/Embed'

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
    path: '/embed/:canvasHash',
    exact: true,
    component: Embed,
    name: 'EmbedCanvas'
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
  },
  {
    path: '/list/:listHash',
    exact: true,
    component: Index,
    name: 'List'
  }
]

export default routes