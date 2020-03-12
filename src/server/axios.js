import axios from 'axios'
import router from "../router";
import store from "../store";
const baseURL = '';
const instance = axios.create();
instance.defaults.timeout = 30000; // 所有接口30s超时

router.beforeEach((to, from, next) => {
  next()
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


