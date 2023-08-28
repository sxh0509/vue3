//页面权限
//当用户在未登陆的情况，如果访问的不是登录页或者注册页，或者在404页面，跳转登录
import router from './router'
import { useUserStore } from './stores/user'
//白名单
const whiteList = ['/login', 'register', '/404', '/401']

router.beforeEach((to, from) => {
  const store = useUserStore()
  document.title = '医疗问诊 - ' + to.meta.title
  const token = localStorage.getItem('token')

  if (!token && !whiteList.includes(to.path)) return '/login'
})
