export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('./login')
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
            path: 'create',
            name: 'connection create',
            component: () => import('./connections/Create')
          },
          {
            path: ':connectionId',
            name: 'connection manage',
            component: () => import('./connections/Manage'),
            props: true
          },
          {
            path: ':connectionId/destroy',
            name: 'connection destroy',
            component: () => import('./connections/Destroy'),
            props: true
          }
        ]
      },
      {
        path: 'postgres/:connectionId',
        name: 'postgres',
        component: () => import('./postgres'),
        props: true,
        children: [

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
