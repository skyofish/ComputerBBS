import axios from 'axios'
import router from "../router";
import store from "../store";
import ViewUI from 'view-design';
// const baseURL = 'localhost:8080/#/';
const instance = axios.create();
instance.defaults.timeout = 30000; // 所有接口30s超时

router.beforeEach((to, from, next) => {
  let username
  if (sessionStorage.store) {
    username = JSON.parse(sessionStorage.store).userInfo.username
  }
  if (!username) {
    if (to.path == '/user/chatRoom' || to.path == '/user/post' || to.path == '/user/learningResource' || to.path == '/user/teachingVideo' || to.path == '/user/dataStatistics' || to.path == '/personalInfo' || to.path == '/user/chat') {
      ViewUI.Message.error('请先登录')
      next({
        name: 'userLogin',
      })
    } else {
      next()
    }
  } else {
    let type = JSON.parse(sessionStorage.store).userInfo.type
    if (type == 'user' && to.path == '/admin/dataStatistics') {
      ViewUI.Message.error('没有权限')
      next({
        name: 'user',
      })
    } else {
      next()
    }
  }
})

// // 请求统一处理
// instance.interceptors.request.use(async config => {
//
// }, error => Promise.reject(error));
//
// // 对返回的内容做统一处理
// instance.interceptors.response.use(response => {
//   if (response.status === 200) {
//     return response;
//   }
//   return Promise.reject(response);
// }, error => {
//   if (error) {
//     if(error.response){
//       switch(error.response.status){
//         case 401:
//           localStorage.removeItem('token');
//           router.replace({
//             path: '/login',
//             query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//           })
//       }
//     }
//   } else {
//     console.log('出了点问题，暂时加载不出来，请稍后再来吧');
//   }
//   return Promise.reject(error);
// });

export default instance;


