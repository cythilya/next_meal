export const menu = {
  fav: {
    id: 'fav',
    title: '我的最愛',
    icon: 'heart',
    link: '/fav',
    modalType: null,
    needLogin: true,
  },
  register: {
    id: 'register',
    title: '註冊',
    icon: 'star',
    link: '#',
    modalType: null,
    needLogin: false,
  },
  login: {
    id: 'login',
    title: '登入',
    icon: 'star',
    link: '#',
    modalType: 'login',
    needLogin: false,
  },
  logout: {
    id: 'logout',
    title: '登出',
    icon: 'star',
    link: '/',
    modalType: null,
    needLogin: true,
  },
}

export default {
  // ...menu,
  index: {
    id: 'index',
    title: '首頁',
    icon: 'star',
    link: '/',
    modalType: null,
    needLogin: true,
  },
  store: {
    id: 'store',
    title: '商店頁',
    icon: 'star',
    link: '/',
    modalType: null,
    needLogin: false,
  },
  tag: {
    id: 'tag',
    title: '標籤頁',
    icon: 'star',
    link: '/',
    modalType: null,
    needLogin: false,
  },
};
