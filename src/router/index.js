import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/user',
      name: 'start',
      component: () => import('../view/user/user.vue'),
    },
    {
      path: '/user',
      name: 'user',
      redirect: '/user/home',
      component: () => import('../view/user/user.vue'),
      children : [
        {
          path: 'home',
          name: 'home',
          component: () => import('../view/user/components/home.vue')
        },
        {
          path: 'learningResource',
          name: 'learningResource',
          component: () => import('../view/user/components/learningResource.vue')
        },
        {
          path: 'teachingVideo',
          name: 'teachingVideo',
          component: () => import('../view/user/components/teachingVideo.vue')
        },
        {
          path: 'dataStatistics',
          name: 'dataStatistics',
          component: () => import('../view/user/components/dataStatistics.vue')
        },
        {
          path: 'chatRoom',
          name: 'chatRoom',
          component: () => import('../view/user/components/chatRoom.vue')
        },
        {
          path: 'post',
          name: 'post',
          component: () => import('../view/user/components/post.vue')
        },
      ]
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      component: () => import('../view/user/components/userLogin.vue')
    },
    {
      path: '/userRegister',
      name: 'userRegister',
      component: () => import('../view/user/components/userRegister.vue')
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: () => import('../view/user/components/personalInfo.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/dataStatistics',
      component: () => import('../view/admin/admin.vue'),
      children: [
        {
          path: 'dataStatistics',
          name: 'adminDataStatistics',
          component: () => import('../view/admin/components/dataStatistics.vue')
        },
        {
          path: 'postManage',
          name: 'postManage',
          component: () => import('../view/admin/components/postManage.vue')
        },
        {
          path: 'postReview',
          name: 'postReview',
          component: () => import('../view/admin/components/postReview.vue')
        },
        {
          path: 'userManage',
          name: 'userManage',
          component: () => import('../view/admin/components/userManage.vue')
        },
        {
          path: 'moderatorsReview',
          name: 'moderatorsReview',
          component: () => import('../view/admin/components/moderatorsReview.vue')
        },
        {
          path: 'makeAnnouncement',
          name: 'makeAnnouncement',
          component: () => import('../view/admin/components/makeAnnouncement.vue')
        },
        {
          path: 'updateLog',
          name: 'updateLog',
          component: () => import('../view/admin/components/updateLog.vue')
        },
        {
          path: 'postDetail',
          name: 'postDetail',
          component: () => import('../view/admin/components/postDetail.vue')
        },
      ]
    },
    {
      path: '*',
      redirect: '/user',
      name: 'notFound',
      component: () => import('../view/user/user.vue'),
    },
  ]
})
