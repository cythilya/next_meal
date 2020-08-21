export default [
  {
    id: 'fav',
    title: '我的最愛',
    icon: 'heart',
    link: '/fav',
    modalType: null,
    needLogin: true,
  },
  {
    id: 'register',
    title: '註冊',
    icon: 'star',
    link: '#',
    modalType: null,
    needLogin: false,
  },
  {
    id: 'login',
    title: '登入',
    icon: 'star',
    link: '#',
    modalType: 'login',
    needLogin: false,
  },
  {
    id: 'logout',
    title: '登出',
    icon: 'star',
    link: '/',
    modalType: '/',
    needLogin: true,
  },
];
