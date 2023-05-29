import Vue from "vue";
import VueRouter from "vue-router";
import { Message } from "element-ui";
import NProgress from "nprogress"; //引入nprogress
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import Index from "@/pages/profile/Index.vue";
import { getToken } from "@/util/token";
import "@/assets/base.css";

Vue.use(VueRouter);

// Resolve the redirect error
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//     if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//     return originalPush.call(this, location).catch(err => err)
// }

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "User login ",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "User registration",
    },
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/pages/search/Index.vue"),
    children: [
      {
        path: "doctor",
        name: "Doctor",
        component: () => import("@/pages/search/Doctor.vue"),
        meta: {
          title: "Search Doctor",
        },
      },
      {
        path: "article",
        name: "Article",
        component: () => import("@/pages/search/Article.vue"),
        meta: {
          title: "Search Article",
        },
      },
    ],
  },
  {
    path: "/profile",
    name: "Index",
    component: Index,
    meta: {
      title: "Profile",
    },
    children: [
      {
        path: "pay",
        name: "Pay",
        component: () => import("@/pages/profile/Pay.vue"),
        meta: {
          title: "Pay Record",
        },
      },
      {
        path: "chat",
        name: "Chat",
        component: () => import("@/pages/profile/Chat.vue"),
        meta: {
          title: "Chat Record",
        },
      },
    ],
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/post",
    name: "Post",
    component: () => import("@/pages/post/Index.vue"),
  },
  {
    path: "/new-post",
    name: "NewPost",
    component: () => import("@/pages/post/New.vue"),
  },
  {
    path: "/post/detail/:pid",
    name: "PostDetail",
    component: () => import("@/pages/post/Detail.vue"),
  },
];

const notLoginPage = ["Login", "Register"];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  let token = getToken("Access-Token");
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  } else document.title = "Online Hospital";
  if (notLoginPage.indexOf(to.name) == -1 && !token) {
    next({ name: "Login" });
    Message({
      message: "Please login first！",
      type: "warning",
    });
  } else next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
