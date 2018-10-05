export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('./login')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('./home'),
    children: [
      {
        path: 'test',
        name: 'test',
        component: () => import('./test')
      }
    ]
  }
]
