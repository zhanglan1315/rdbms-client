export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('./login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./register')
  },
  {
    path: '/',
    component: () => import('./home'),
    children: [
      {
        path: '',
        name: 'connections',
        component: () => import('./connections'),
        props: true,
        children: [
          {
            path: 'connections/create',
            name: 'connection create',
            component: () => import('./connections/Create')
          },
          {
            path: 'connections/:connectionId',
            name: 'connection manage',
            component: () => import('./connections/Manage'),
            props: true
          },
          {
            path: 'connections/:connectionId/destroy',
            name: 'connection destroy',
            component: () => import('./connections/Destroy'),
            props: true
          }
        ]
      },
      {
        path: 'connection/:connectionId',
        name: 'postgres',
        component: () => import('./postgres'),
        props: true,
        children: [
          {
            path: 'table',
            component: () => import('./postgres/Table'),
            name: 'postgres table',
            props: true
          }
        ]
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('./test')
      }
    ]
  }
]
