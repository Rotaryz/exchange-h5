export default [
  // 升级成为代理商
  {
    path: '/level-upgrade',
    name: 'level-upgrade',
    component: () => import('@pages/level-upgrade/level-upgrade')
  },

  {
    path: '/',
    redirect: '/404',
  },
  {
    path: '/404',
    name: '404',
    component: require('@pages/_404/_404').default,
    props: true
  },
  {
    path: '*',
    redirect: '404'
  }
]
